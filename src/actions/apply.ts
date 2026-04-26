"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { submit_application } from "@/services/applicant.service";

export type ApplyFormState = {
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    cvFile?: string;
  };
  serverError?: string;
  success?: boolean;
};

export async function submit_apply(
  _prevState: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || undefined;
  const cvFile = formData.get("cvFile") as File | null;
  const skills = (formData.get("skills") as string)?.trim() || undefined;
  const experienceYearsRaw = formData.get("experienceYears") as string;
  const experienceYears = experienceYearsRaw
    ? Number(experienceYearsRaw)
    : undefined;
  const location = (formData.get("location") as string)?.trim() || undefined;

  const errors: ApplyFormState["errors"] = {};
  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Email is required.";
  if (!cvFile || cvFile.size === 0) errors.cvFile = "CV file is required.";

  if (Object.keys(errors).length > 0) return { errors };

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return { errors: {}, serverError: "You must be logged in to apply." };
  }

  let submitError: string | undefined;

  try {
    await submit_application(
      {
        firstName,
        lastName,
        email,
        phone,
        cvFile: cvFile!,
        skills,
        experienceYears,
        location,
      },
      jwt,
    );
  } catch (err) {
    submitError =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
  }

  if (submitError) return { errors: {}, serverError: submitError };

  redirect("/dashboard");
}
