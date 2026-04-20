"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api_client } from "@/lib/api-client";
import { verify_jwt } from "@/services/auth.service";

export type UpdateProfileFormState = {
  errors: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    location?: string;
  };
  serverError?: string;
  success?: boolean;
};

export async function update_profile(
  _prevState: UpdateProfileFormState,
  formData: FormData,
): Promise<UpdateProfileFormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();

  const errors: UpdateProfileFormState["errors"] = {};
  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";

  if (Object.keys(errors).length > 0) return { errors };

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) redirect("/login");

  const user = await verify_jwt(jwt);
  if (!user) redirect("/login");

  const userId = user.id;

  const res = await api_client(`/api/users/${userId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${jwt}` },
    body: { first_name: firstName, last_name: lastName, phone, location },
  });

  if (!res.ok) {
    return {
      errors: {},
      serverError: "Failed to update profile. Please try again.",
    };
  }

  redirect("/profile");
}
