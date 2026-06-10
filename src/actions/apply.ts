"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { submit_application } from "@/services/applicant.service";

export type ApplyFormState = {
    errors: {
        fullName?: string;
        currentLocation?: string;
        gccExperience?: string;
        email?: string;
        phone?: string;
        experienceYears?: string;
        nationality?: string;
        photo?: string;
        cv?: string;
        coverLetter?: string;
    };
    serverError?: string;
    success?: boolean;
};

const PHOTO_TYPES = ["image/jpeg", "image/png"];
const DOC_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const PHOTO_MAX = 10 * 1024 * 1024;
const CV_MAX = 25 * 1024 * 1024;

export async function submit_apply(_prevState: ApplyFormState, formData: FormData): Promise<ApplyFormState> {
    const fullName = (formData.get("fullName") as string)?.trim();
    const currentLocation = (formData.get("currentLocation") as string)?.trim();
    const gccExperience = (formData.get("gccExperience") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const experienceYearsRaw = formData.get("experienceYears") as string;
    const experienceYears = experienceYearsRaw !== "" ? Number(experienceYearsRaw) : NaN;
    const nationality = (formData.get("nationality") as string)?.trim();
    const photo = formData.get("photo") as File | null;
    const cv = formData.get("cv") as File | null;
    const coverLetter = formData.get("coverLetter") as File | null;
    const jobSlug = (formData.get("jobSlug") as string)?.trim() || undefined;

    const errors: ApplyFormState["errors"] = {};

    if (!fullName) errors.fullName = "Full name is required.";
    if (!currentLocation) errors.currentLocation = "Current location is required.";
    if (!gccExperience || !["yes", "no"].includes(gccExperience)) errors.gccExperience = "Please select your GCC experience.";
    if (!email) errors.email = "Email is required.";
    if (!phone) errors.phone = "Phone is required.";
    if (isNaN(experienceYears) || experienceYears < 0 || experienceYears > 50) {
        errors.experienceYears = "Enter a valid number of years (0–50).";
    }
    if (!nationality) errors.nationality = "Nationality is required.";

    if (!photo || photo.size === 0) {
        errors.photo = "Photo is required.";
    } else if (!PHOTO_TYPES.includes(photo.type)) {
        errors.photo = "Only JPG and PNG images are allowed.";
    } else if (photo.size > PHOTO_MAX) {
        errors.photo = "Photo must be under 10 MB.";
    }

    if (!cv || cv.size === 0) {
        errors.cv = "CV is required.";
    } else if (!DOC_TYPES.includes(cv.type)) {
        errors.cv = "Only PDF, DOC, and DOCX files are allowed.";
    } else if (cv.size > CV_MAX) {
        errors.cv = "CV must be under 25 MB.";
    }

    if (coverLetter && coverLetter.size > 0) {
        if (!DOC_TYPES.includes(coverLetter.type)) {
            errors.coverLetter = "Only PDF, DOC, and DOCX files are allowed.";
        } else if (coverLetter.size > CV_MAX) {
            errors.coverLetter = "Cover letter must be under 25 MB.";
        }
    }

    if (Object.keys(errors).length > 0) return { errors };

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    if (!jwt) return { errors: {}, serverError: "You must be logged in to apply." };

    try {
        await submit_application(
            {
                fullName,
                currentLocation,
                gccExperience: gccExperience as "yes" | "no",
                email,
                phone,
                experienceYears,
                nationality,
                photo: photo!,
                cv: cv!,
                coverLetter: coverLetter && coverLetter.size > 0 ? coverLetter : null,
                jobSlug,
            },
            jwt,
        );
    } catch (err) {
        return { errors: {}, serverError: err instanceof Error ? err.message : "Something went wrong. Please try again." };
    }

    redirect("/dashboard");
}
