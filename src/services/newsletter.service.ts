import { api_client } from "@/lib/api-client";

export async function subscribe_newsletter(email: string) {
    const res = await api_client("/api/newsletter-subscribers", {
        method: "POST",
        body: { data: { email } },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message ?? "Failed to subscribe.");
    }

    return res.json();
}
