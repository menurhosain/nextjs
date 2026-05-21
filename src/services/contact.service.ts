import { api_client } from "@/lib/api-client";

type ContactPayload = {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    message: string;
};

export async function submit_contact(payload: ContactPayload) {
    const res = await api_client("/api/contacts", {
        method: "POST",
        body: { data: payload },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message ?? "Failed to submit contact form.");
    }

    return res.json();
}
