import { api_client } from "@/lib/api-client";

type RegisterPayload = {
  username: string;
  email: string;
  first_name: string;
  password: string;
  phone: string;
  type: string;
  last_name?: string;
  location?: string;
};

export async function register_user(payload: RegisterPayload) {
  return api_client("/api/auth/local/register", {
    method: "POST",
    body: payload,
  });
}

type LoginPayload = {
  identifier: string;
  password: string;
};

export async function login_user(payload: LoginPayload) {
  return api_client("/api/auth/local", {
    method: "POST",
    body: payload,
  });
}
