import { BASE_URL } from "@/lib/constant";
import type { StrapiFile } from "@/services/applicant.service";
import { upload_files } from "@/services/upload.service";

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
};

export async function get_user_subcontractor_applications(
  jwt: string,
): Promise<Subcontractor[]> {
  const query = new URLSearchParams({
    sort: "appliedAt:desc",
  });

  const res = await fetch(`${BASE_URL}/api/subcontractors?${query}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) return [];

  const json = await res.json();
  return (json.data ?? []).map(
    (item: { id: number; documentId: string; attributes?: Subcontractor } & Subcontractor) => ({
      id: item.id,
      documentId: item.documentId,
      ...(item.attributes ?? item),
    }),
  );
}

export async function get_subcontractor_by_document_id(
  documentId: string,
  jwt: string,
): Promise<Subcontractor | null> {
  const query = new URLSearchParams({ populate: "documents" });
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
};

export async function submit_contractor_application(
  payload: SubcontractorPayload,
  jwt: string,
) {
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
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error?.message ?? "Failed to submit application.");
  }

  return res.json();
}
