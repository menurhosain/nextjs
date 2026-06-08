"use server";

import { cookies } from "next/headers";
import { submit_contractor_application } from "@/services/subcontractor.service";

export type ApplyContractorFormState = {
  errors: {
    companyName?: string;
    email?: string;
    phone?: string;
    experienceYears?: string;
    location?: string;
    documents?: string;
  };
  serverError?: string;
  success?: boolean;
};

export async function submit_contractor_apply(
  _prevState: ApplyContractorFormState,
  formData: FormData,
): Promise<ApplyContractorFormState> {
  const companyName = (formData.get("companyName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || undefined;
  const location = (formData.get("location") as string)?.trim() || undefined;
  const experienceYearsRaw = (formData.get("experienceYears") as string)?.trim();
  const experienceYears = experienceYearsRaw ? Number(experienceYearsRaw) : undefined;
  const documents = formData.getAll("documents").filter((v): v is File => v instanceof File && v.size > 0);

  const ALLOWED_DOC_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const errors: ApplyContractorFormState["errors"] = {};

  if (!companyName) errors.companyName = "Company name is required.";

  if (documents.length === 0) {
    errors.documents = "At least one document is required.";
  } else {
    const invalidDoc = documents.find(
      (f) => !ALLOWED_DOC_TYPES.includes(f.type) && !f.type.startsWith("image/"),
    );
    if (invalidDoc) errors.documents = "Only PDF, Word documents, and images are allowed.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (experienceYears !== undefined && (Number.isNaN(experienceYears) || experienceYears < 0 || experienceYears > 100)) {
    errors.experienceYears = "Enter a valid number between 0 and 100.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt) return { errors: {}, serverError: "You must be logged in to apply." };

  try {
    await submit_contractor_application(
      { companyName, email, phone, location, experienceYears, documents },
      jwt,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return { errors: {}, serverError: message };
  }

  return { errors: {}, success: true };
}
