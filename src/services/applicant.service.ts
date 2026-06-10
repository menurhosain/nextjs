import { BASE_URL } from "@/lib/constant";
import { upload_file } from "@/services/upload.service";

type ApplicantPayload = {
    fullName: string;
    currentLocation: string;
    gccExperience: "yes" | "no";
    email: string;
    phone: string;
    experienceYears: number;
    nationality: string;
    photo: File;
    cv: File;
    coverLetter?: File | null;
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
    fullName: string;
    currentLocation: string;
    gccExperience: "yes" | "no";
    email: string;
    phone: string;
    experienceYears: number;
    nationality: string;
    label?: string;
    appliedAt: string;
    photo?: StrapiFile | null;
    cv?: StrapiFile | null;
    coverLetter?: StrapiFile | null;
    applied_job?: { id: number; title: string; slug: string } | null;
};

export async function submit_application(payload: ApplicantPayload, jwt: string) {
    const [photoId, cvId] = await Promise.all([
        upload_file(payload.photo, jwt),
        upload_file(payload.cv, jwt),
    ]);

    const coverLetterId = payload.coverLetter && payload.coverLetter.size > 0
        ? await upload_file(payload.coverLetter, jwt)
        : null;

    const res = await fetch(`${BASE_URL}/api/applicants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            data: {
                fullName: payload.fullName,
                currentLocation: payload.currentLocation,
                gccExperience: payload.gccExperience,
                email: payload.email,
                phone: payload.phone,
                experienceYears: payload.experienceYears,
                nationality: payload.nationality,
                photo: photoId,
                cv: cvId,
                coverLetter: coverLetterId ?? null,
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
        `${BASE_URL}/api/applicants?sort=appliedAt:desc&populate[cv][fields][0]=url&populate[cv][fields][1]=name&populate[cv][fields][2]=size&populate[cv][fields][3]=mime&populate[applied_job][fields][0]=title&populate[applied_job][fields][1]=slug`,
        { headers: { Authorization: `Bearer ${jwt}` } },
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
        `${BASE_URL}/api/applicants/${documentId}?populate[photo][fields][0]=url&populate[photo][fields][1]=name&populate[cv][fields][0]=url&populate[cv][fields][1]=name&populate[cv][fields][2]=size&populate[coverLetter][fields][0]=url&populate[coverLetter][fields][1]=name&populate[applied_job][fields][0]=title&populate[applied_job][fields][1]=slug`,
        { headers: { Authorization: `Bearer ${jwt}` } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    const item = json.data;
    if (!item) return null;
    return { id: item.id, documentId: item.documentId, ...(item.attributes ?? item) };
}
