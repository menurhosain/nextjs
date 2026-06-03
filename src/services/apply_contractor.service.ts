import { BASE_URL } from "@/lib/constant";
import type { StrapiMedia } from "@/services/page_content.service";

export type ApplyContractorContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    } | null;
    form_title: string;
    form_subtitle: string;
    label_company_name: string;
    label_email: string;
    label_phone: string;
    label_experience_years: string;
    label_location: string;
    label_documents: string;
    placeholder_company_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_experience_years: string;
    placeholder_location: string;
    documents_hint: string;
    submit_label: string;
    submitting_label: string;
};

export async function get_apply_contractor_content(locale = "en"): Promise<ApplyContractorContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/apply-contractor?populate[banner][populate]=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
