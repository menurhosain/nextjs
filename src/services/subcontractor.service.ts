import { BASE_URL } from "@/lib/constant";

export type StrapiFile = {
    id: number;
    url: string;
    name: string;
    size: number;
    mime: string;
};

async function upload_files(files: File[], jwt: string): Promise<number[]> {
    if (files.length === 0) return [];
    const form = new FormData();
    for (const file of files) form.append("files", file);
    const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
        body: form,
    });
    if (!res.ok) throw new Error("File upload failed.");
    const uploaded = await res.json();
    return (uploaded as { id: number }[]).map((f) => f.id);
}

export type Subcontractor = {
    id: number;
    documentId: string;
    companyName: string;
    email: string;
    phone?: string;
    location?: string;
    experienceYears?: number;
    label?: string;
    appliedAt: string;
    documents?: StrapiFile[];
    applied_on_project?: { id: number; title: string; slug: string } | null;
};

export async function get_user_subcontractor_applications(jwt: string): Promise<Subcontractor[]> {
    const query = new URLSearchParams({
        sort: "appliedAt:desc",
    });

    query.set("populate[applied_on_project][fields][0]", "title");
    query.set("populate[applied_on_project][fields][1]", "slug");

    const res = await fetch(`${BASE_URL}/api/subcontractors?${query}`, {
        headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return (json.data ?? []).map((item: { id: number; documentId: string; attributes?: Subcontractor } & Subcontractor) => ({
        ...(item.attributes ?? item),
        id: item.id,
        documentId: item.documentId,
    }));
}

export async function get_subcontractor_by_document_id(documentId: string, jwt: string): Promise<Subcontractor | null> {
    const query = new URLSearchParams();
    query.set("populate[documents][fields][0]", "url");
    query.set("populate[documents][fields][1]", "name");
    query.set("populate[documents][fields][2]", "size");
    query.set("populate[documents][fields][3]", "mime");
    query.set("populate[applied_on_project][fields][0]", "title");
    query.set("populate[applied_on_project][fields][1]", "slug");
    const res = await fetch(`${BASE_URL}/api/subcontractors/${documentId}?${query}`, {
        headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const item = json.data;
    if (!item) return null;
    return { id: item.id, documentId: item.documentId, ...(item.attributes ?? item) };
}

type SubcontractorPayload = {
    companyName: string;
    email: string;
    phone?: string;
    location?: string;
    experienceYears?: number;
    documents: File[];
    subcontractedSlug?: string;
};

export async function submit_contractor_application(payload: SubcontractorPayload, jwt: string) {
    const documentIds = await upload_files(payload.documents, jwt);

    const res = await fetch(`${BASE_URL}/api/subcontractors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            data: {
                companyName: payload.companyName,
                email: payload.email,
                phone: payload.phone ?? null,
                location: payload.location ?? null,
                experienceYears: payload.experienceYears ?? null,
                documents: documentIds,
                ...(payload.subcontractedSlug && { subcontractedSlug: payload.subcontractedSlug }),
            },
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message ?? "Failed to submit application.");
    }

    return res.json();
}
