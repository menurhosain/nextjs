"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { login_user as login_user_service } from "@/services/auth.service";

export type LoginFormState = {
  errors: {
    email?: string;
    password?: string;
  };
  serverError?: string;
};

export async function login_user(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const errors: LoginFormState["errors"] = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) errors.password = "Password is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const res = await login_user_service({ identifier: email, password });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ??
      body?.message ??
      "Login failed. Please try again.";
    return { errors: {}, serverError: message };
  }

  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set("jwt", data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/protected");
}
