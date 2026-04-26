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
};

export async function submit_application(
  payload: ApplicantPayload,
  jwt: string,
) {
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
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message ?? "Failed to submit application.");
  }

  return res.json();
}

export async function get_user_applications(
  _userId: number,
  jwt: string,
): Promise<Application[]> {
  const query = new URLSearchParams({
    sort: "appliedAt:desc",
    populate: "cvFile",
  });

  const res = await fetch(`${BASE_URL}/api/applicants?${query}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) return [];

  const json = await res.json();
  return (json.data ?? []).map(
    (item: { id: number; documentId: string; attributes?: Application } & Application) => ({
      id: item.id,
      documentId: item.documentId,
      ...(item.attributes ?? item),
    }),
  );
}

export async function get_application_by_document_id(
  documentId: string,
  jwt: string,
): Promise<Application | null> {
  const query = new URLSearchParams({ populate: "cvFile" });
  const res = await fetch(`${BASE_URL}/api/applicants/${documentId}?${query}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const item = json.data;
  if (!item) return null;
  return { id: item.id, documentId: item.documentId, ...(item.attributes ?? item) };
}
