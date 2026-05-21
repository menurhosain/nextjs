"use server";

import { subscribe_newsletter } from "@/services/newsletter.service";

export type NewsletterFormState = {
    error?: string;
    success?: boolean;
};

export async function subscribe_to_newsletter(
    _prevState: NewsletterFormState,
    formData: FormData,
): Promise<NewsletterFormState> {
    const email = (formData.get("email") as string)?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: "Please enter a valid email address." };
    }

    try {
        await subscribe_newsletter(email);
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
    }

    return { success: true };
}
