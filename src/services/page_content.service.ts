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
    blog_section_description: string;
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

// Footer
export type FooterNavLink = {
    id: number;
    button_label: string;
    button_link: string;
};
export type FooterSocialLink = {
    id: number;
    icon: string;
    url: string;
};
export type FooterContent = {
    logo: StrapiMedia | null;
    nav_links: FooterNavLink[];
    tagline: string;
    social_links: FooterSocialLink[];
    copyright_text: string;
    terms_label: string;
    terms_link: string;
    privacy_label: string;
    privacy_link: string;
    newsletter_placeholder: string;
    newsletter_button_label: string;
};
export async function get_footer_content(locale = "en"): Promise<FooterContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/footer?locale=${locale}&populate=*`);
        if (!res.ok) return null;
        const json = await res.json();
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
    no_project_label: string;
    no_project_description: string;
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

// About Page
export type AboutPageBanner = {
    id: number;
    banner_label: string;
    banner_title: string;
    banner_bg: StrapiMedia | null;
};
export type AboutPageSectionTitle = {
    id: number;
    sub_title: string;
    title: string;
    description: string;
};
export type AboutStatCounter = {
    id: number;
    label: string;
    suffix: string;
    target_count: number;
};
export type WhyChooseCard = {
    id: number;
    icon: string;
    title: string;
    description: string;
};
export type WhyChooseImageCard = {
    id: number;
    image: StrapiMedia | null;
    alt: string;
};
export type AboutPageContent = {
    Banner: AboutPageBanner;
    about_section: AboutPageSectionTitle;
    about_stats_counters: AboutStatCounter[];
    about_award_bg: StrapiMedia | null;
    about_award_title: string;
    about_award_sub_title: string;
    about_award_year: string;
    about_award_logo: StrapiMedia[];
    why_choose_section: AboutPageSectionTitle;
    why_choose_cards: WhyChooseCard[];
    why_choose_image_cards: WhyChooseImageCard[];
};
export async function get_about_page_content(locale = "en"): Promise<AboutPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/about-page?locale=${locale}&populate[Banner][populate]=*&populate[about_section][populate]=*&populate[about_stats_counters][populate]=*&populate[about_award_bg][populate]=*&populate[about_award_logo][populate]=*&populate[why_choose_section][populate]=*&populate[why_choose_cards][populate]=*&populate[why_choose_image_cards][populate]=*`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Career CTA Section
export type CareerCtaSectionContent = {
    career_cta_background: StrapiMedia[];
    career_cta_section_title: {
        sub_title: string;
        title: string;
        description: string;
    };
    career_cta_button: {
        button_label: string;
        button_link: string;
    };
};
export async function get_career_cta_section_content(locale = "en"): Promise<CareerCtaSectionContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/career-cta?populate=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

