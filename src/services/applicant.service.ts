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
