"use server";

import { forgot_password } from "@/services/auth.service";

export type ForgetPasswordFormState = {
  errors: {
    email?: string;
  };
  serverError?: string;
  success?: boolean;
  email?: string;
};

export async function forget_password(
  _prevState: ForgetPasswordFormState,
  formData: FormData,
): Promise<ForgetPasswordFormState> {
  const email = (formData.get("email") as string)?.trim();

  if (!email) {
    return { errors: { email: "Email is required." } };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { errors: { email: "Enter a valid email address." } };
  }

  const res = await forgot_password(email);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ?? body?.message ?? "Something went wrong. Please try again.";
    return { errors: {}, serverError: message };
  }

  return { errors: {}, success: true, email };
}
