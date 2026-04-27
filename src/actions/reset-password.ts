"use server";

import { reset_password as reset_password_service } from "@/services/auth.service";

export type ResetPasswordFormState = {
  errors: {
    password?: string;
    confirmPassword?: string;
  };
  serverError?: string;
  success?: boolean;
};

export async function reset_password(
  _prevState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const code = (formData.get("code") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const errors: ResetPasswordFormState["errors"] = {};

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  if (!code) {
    return { errors: {}, serverError: "Invalid or missing reset token." };
  }

  const res = await reset_password_service({
    code,
    password,
    passwordConfirmation: confirmPassword,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ?? body?.message ?? "Something went wrong. Please try again.";
    return { errors: {}, serverError: message };
  }

  return { errors: {}, success: true };
}
