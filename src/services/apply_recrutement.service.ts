import { BASE_URL } from "@/lib/constant";
import type { StrapiMedia } from "@/services/page_content.service";

export type ApplyPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    } | null;
    form_title: string | null;
    applying_for_label: string | null;
    form_subtitle: string | null;
    label_full_name: string | null;
    placeholder_full_name: string | null;
    label_current_location: string | null;
    placeholder_current_location: string | null;
    label_gcc_experience: string | null;
    gcc_select_default: string | null;
    gcc_option_yes: string | null;
    gcc_option_no: string | null;
    label_email: string | null;
    placeholder_email: string | null;
    label_phone: string | null;
    placeholder_phone: string | null;
    label_experience_years: string | null;
    placeholder_experience_years: string | null;
    label_nationality: string | null;
    placeholder_nationality: string | null;
    label_photo: string | null;
    hint_photo: string | null;
    label_cv: string | null;
    hint_cv: string | null;
    label_cover_letter: string | null;
    hint_cover_letter: string | null;
    submit_label: string | null;
    submitting_label: string | null;
    success_message: string | null;
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
