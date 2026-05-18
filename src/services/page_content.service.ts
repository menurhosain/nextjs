import { BASE_URL } from "@/lib/constant";

export type StrapiMediaFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
};
export type StrapiMedia = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    focalPoint: string | null;

    width: number;
    height: number;

    formats: {
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
    } | null;

    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;

    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown | null;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

// Home page
export type HomePageContent = {
    banner_background: StrapiMedia[];
    banner_title_normal: string;
    banner_title_fancy: string;
    banner_scroll_now_label: string;
    banner_counter_label: string;
    banner_counter_number: number;
    banner_button_label: string;
    banner_button_link: string;

    service_section_sub_title: string;
    service_section_title_normal: string;
    service_section_title_animated: string;
    service_group_button_label_one: string;
    service_group_button_link_one: string;
    service_group_button_label_two: string;
    service_group_button_link_two: string;

    about_section_sub_title: string;
    about_section_title_normal: string;
    about_section_title_animated: string;
    about_image_top_text: string;
    about_group_button_label_one: string;
    about_group_button_link_one: string;
    about_group_button_label_two: string;
    about_group_button_link_two: string;
    about_left_image: StrapiMedia[];
    about_partner_logo_title: string;
    partner_logos: [any];

    project_section_sub_title: string;
    project_section_title: string;
    project_section_button_label: string;
    project_section_button_link: string;

    blog_section_sub_title: string;
    blog_section_title: string;
    blog_section_button_label: string;
    blog_section_button_link: string;
};
export async function get_home_page_content(locale = "en"): Promise<HomePageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/home?populate=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        // console.log(json);
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Project Page
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