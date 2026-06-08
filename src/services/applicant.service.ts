import { BASE_URL } from "@/lib/constant";
import { upload_file } from "@/services/upload.service";

type ApplicantPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    cvFile: File;
    skills?: string;
    experienceYears?: number;
    location?: string;
    jobSlug?: string;
};

export type StrapiFile = {
    id: number;
    url: string;
    name: string;
    size: number;
    mime: string;
};

export type Application = {
    id: number;
    documentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    skills?: string;
    experienceYears?: number;
    location?: string;
    label?: string;
    appliedAt: string;
    cvFile?: StrapiFile | null;
    applied_job?: { id: number; title: string } | null;
};

export async function submit_application(payload: ApplicantPayload, jwt: string) {
    const cvFileId = await upload_file(payload.cvFile, jwt);

    const res = await fetch(`${BASE_URL}/api/applicants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            data: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phone: payload.phone ?? null,
                cvFile: cvFileId,
                skills: payload.skills ?? null,
                experienceYears: payload.experienceYears ?? null,
                location: payload.location ?? null,
                appliedAt: new Date().toISOString(),
                ...(payload.jobSlug && { jobSlug: payload.jobSlug }),
            },
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message ?? "Failed to submit application.");
    }

    return res.json();
}

export async function get_user_applications(_userId: number, jwt: string): Promise<Application[]> {
    const res = await fetch(
        `${BASE_URL}/api/applicants?sort=appliedAt:desc&populate[cvFile][fields][0]=url&populate[cvFile][fields][1]=name&populate[cvFile][fields][2]=size&populate[cvFile][fields][3]=mime&populate[applied_job][fields][0]=title&populate[applied_job][fields][1]=slug`,
        {
            headers: { Authorization: `Bearer ${jwt}` },
        },
    );

    if (!res.ok) return [];

    const json = await res.json();
    return (json.data ?? []).map((item: { id: number; documentId: string; attributes?: Application } & Application) => ({
        ...(item.attributes ?? item),
        id: item.id,
        documentId: item.documentId,
    }));
}

export async function get_application_by_document_id(documentId: string, jwt: string): Promise<Application | null> {
    const res = await fetch(
        `${BASE_URL}/api/applicants/${documentId}?populate[cvFile][fields][0]=url&populate[cvFile][fields][1]=name&populate[cvFile][fields][2]=size&populate[cvFile][fields][3]=mime&populate[applied_job][fields][0]=title&populate[applied_job][fields][1]=slug`,
        {
            headers: { Authorization: `Bearer ${jwt}` },
        },
    );
    if (!res.ok) return null;
    const json = await res.json();
    const item = json.data;
    if (!item) return null;
    return { id: item.id, documentId: item.documentId, ...(item.attributes ?? item) };
}
