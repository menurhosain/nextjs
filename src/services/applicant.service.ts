const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  // First upload the CV file via Strapi upload endpoint
  const fileForm = new FormData();
  fileForm.append("files", payload.cvFile);

  const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: fileForm,
  });

  if (!uploadRes.ok) {
    throw new Error("CV upload failed.");
  }

  const [uploadedFile] = await uploadRes.json();

  // Then create the applicant record
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
        cvFile: uploadedFile.id,
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
