import { BASE_URL } from "@/lib/constant";

export type ProjectPageBanner = {
    id: number;
    banner_label: string;
    banner_title: string;
};

export type ProjectPageContent = {
    search_placeholder: string;
    filter_label: string;
    filter_offcanvas_label: string;
    clear_filter_label: string;
    location_filter_label: string;
    scope_filter_label: string;
    industry_filter_label: string;
    filter_submit_btn_label: string;
    pagination_next_label: string;
    pagination_previous_label: string;
    project_card_year_label: string;
    project_card_location_label: string;
    no_project_label:string;
    no_project_description:string;
    Banner: ProjectPageBanner;
};

export async function get_project_page_content(locale = "en"): Promise<ProjectPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/project-page?populate=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
