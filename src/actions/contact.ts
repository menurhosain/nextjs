"use server";

import { submit_contact } from "@/services/contact.service";
import { verify_recaptcha } from "@/lib/recaptcha";
import { get_global_settings } from "@/services/global.service";

export type ContactFormState = {
    errors: {
        firstName?: string;
        lastName?: string;
        message?: string;
    };
    serverError?: string;
    success?: boolean;
};

export async function submit_contact_form(
    _prevState: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    const recaptcha_token = formData.get("recaptcha_token") as string;
    const global = await get_global_settings();
    const secret_key = global?.recaptcha_secret_key ?? process.env.RECAPTCHA_SECRET_KEY ?? "";
    const recaptcha_ok = recaptcha_token && secret_key && (await verify_recaptcha(recaptcha_token, secret_key));
    if (!recaptcha_ok) {
        return { errors: {}, serverError: "reCAPTCHA verification failed. Please try again." };
    }

    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim() || undefined;
    const phone = (formData.get("phone") as string)?.trim() || undefined;
    const message = (formData.get("message") as string)?.trim();

    const errors: ContactFormState["errors"] = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!message) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) return { errors };

    try {
        await submit_contact({ firstName, lastName, email, phone, message });
    } catch (err) {
        return {
            errors: {},
            serverError: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        };
    }

    return { errors: {}, success: true };
}
