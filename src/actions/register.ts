"use server";

import { register_user as register_user_service } from "@/services/auth.service";

export type FormState = {
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    phone?: string;
    register_as?: string;
  };
  serverError?: string;
  success?: boolean;
};

export async function register_user(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const phone = (formData.get("phone") as string)?.trim();
  const register_as = (formData.get("register_as") as string)?.trim();

  const errors: FormState["errors"] = {};

  if (!firstName) errors.firstName = "First name is required.";

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length < 4) {
    errors.username = "Username must be at least 4 characters.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!phone) errors.phone = "Phone number is required.";

  if (!register_as || !["applicant", "contractor"].includes(register_as)) {
    errors.register_as = "Please select a role.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const res = await register_user_service({
    first_name: firstName,
    last_name: (formData.get("lastName") as string)?.trim() || undefined,
    email,
    username,
    password,
    phone,
    location: (formData.get("location") as string)?.trim() || undefined,
    type: register_as,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ??
      body?.message ??
      "Registration failed. Please try again.";
    return { errors: {}, serverError: message };
  }

  return { errors: {}, success: true };
}
