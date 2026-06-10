"use server";

import { cookies } from "next/headers";
import { submit_contractor_application } from "@/services/subcontractor.service";
import { verify_recaptcha } from "@/lib/recaptcha";
import { get_global_settings } from "@/services/global.service";

export type ApplySubcontractedFormState = {
    errors: {
        fullName?: string;
        title?: string;
        phone?: string;
        email?: string;
        companyName?: string;
        registrationNumber?: string;
        foundingYear?: string;
        mainTrades?: string;
        country?: string;
        state?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        companyPhone?: string;
        taxId?: string;
        documents?: string;
        description?: string;
    };
    serverError?: string;
    success?: boolean;
};

const ALLOWED_DOC_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function submit_subcontracted_apply(
    _prevState: ApplySubcontractedFormState,
    formData: FormData,
): Promise<ApplySubcontractedFormState> {
    const recaptcha_token = formData.get("recaptcha_token") as string;
    const global = await get_global_settings();
    const secret_key = global?.recaptcha_secret_key ?? process.env.RECAPTCHA_SECRET_KEY ?? "";
    const recaptcha_ok = recaptcha_token && secret_key && (await verify_recaptcha(recaptcha_token, secret_key));
    if (!recaptcha_ok) {
        return { errors: {}, serverError: "reCAPTCHA verification failed. Please try again." };
    }

    const fullName = (formData.get("fullName") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const companyName = (formData.get("companyName") as string)?.trim();
    const registrationNumber = (formData.get("registrationNumber") as string)?.trim();
    const foundingYearRaw = (formData.get("foundingYear") as string)?.trim();
    const foundingYear = foundingYearRaw ? Number(foundingYearRaw) : undefined;
    const mainTrades = (formData.get("mainTrades") as string)?.trim();
    const country = (formData.get("country") as string)?.trim();
    const state = (formData.get("state") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    const postalCode = (formData.get("postalCode") as string)?.trim();
    const companyPhone = (formData.get("companyPhone") as string)?.trim();
    const ext = (formData.get("ext") as string)?.trim() || undefined;
    const taxId = (formData.get("taxId") as string)?.trim();
    const documents = formData.getAll("documents").filter((v): v is File => v instanceof File && v.size > 0);
    const description = (formData.get("description") as string)?.trim();
    const subcontractedSlug = (formData.get("subcontractedSlug") as string)?.trim() || undefined;

    const errors: ApplySubcontractedFormState["errors"] = {};

    if (!fullName) errors.fullName = "Full name is required.";
    if (!title) errors.title = "Title is required.";
    if (!phone) errors.phone = "Phone number is required.";

    if (!email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!companyName) errors.companyName = "Legal name of company is required.";
    if (!registrationNumber) errors.registrationNumber = "Registration number is required.";

    if (!foundingYear) {
        errors.foundingYear = "Founding year is required.";
    } else if (Number.isNaN(foundingYear) || foundingYear < 1800 || foundingYear > 2100) {
        errors.foundingYear = "Enter a valid founding year.";
    }

    if (!mainTrades) errors.mainTrades = "Main trades / activities is required.";
    if (!country) errors.country = "Country is required.";
    if (!state) errors.state = "State / province is required.";
    if (!city) errors.city = "City is required.";
    if (!address) errors.address = "Address is required.";
    if (!postalCode) errors.postalCode = "Postal code is required.";
    if (!companyPhone) errors.companyPhone = "Company phone number is required.";
    if (!taxId) errors.taxId = "Tax ID is required.";
    if (!description) errors.description = "Description is required.";

    if (documents.length === 0) {
        errors.documents = "At least one document is required.";
    } else {
        const invalid = documents.find((f) => !ALLOWED_DOC_TYPES.includes(f.type));
        if (invalid) errors.documents = "Only PDF, DOC, and DOCX files are allowed.";
    }

    if (Object.keys(errors).length > 0) return { errors };

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    if (!jwt) return { errors: {}, serverError: "You must be logged in to apply." };

    try {
        await submit_contractor_application(
            {
                fullName: fullName!,
                title: title!,
                phone: phone!,
                email: email!,
                companyName: companyName!,
                registrationNumber: registrationNumber!,
                foundingYear: foundingYear!,
                mainTrades: mainTrades!,
                country: country!,
                state: state!,
                city: city!,
                address: address!,
                postalCode: postalCode!,
                companyPhone: companyPhone!,
                ext,
                taxId: taxId!,
                documents,
                description: description!,
                subcontractedSlug,
            },
            jwt,
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        return { errors: {}, serverError: message };
    }

    return { errors: {}, success: true };
}
