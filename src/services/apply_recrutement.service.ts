import { BASE_URL } from "@/lib/constant";
import type { StrapiMedia } from "@/services/page_content.service";

export type ApplyPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    } | null;
    form_title: string;
    form_subtitle: string;
    label_first_name: string;
    label_last_name: string;
    label_email: string;
    label_phone: string;
    label_cv: string;
    label_skills: string;
    label_experience_years: string;
    label_location: string;
    placeholder_first_name: string;
    placeholder_last_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_skills: string;
    placeholder_experience_years: string;
    placeholder_location: string;
    submit_label: string;
    submitting_label: string;
    success_message: string;
};

export async function get_apply_page_content(locale = "en"): Promise<ApplyPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/apply-recrutement?populate[banner][populate]=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
