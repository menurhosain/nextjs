import { BASE_URL } from "@/lib/constant";
import { upload_files } from "@/services/upload.service";

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
