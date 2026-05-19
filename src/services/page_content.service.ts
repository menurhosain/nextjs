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

// Partner page Section
export type PartnerPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    partner_section_sub_title?: string;
    partner_section_title_normal?: string;
    partner_section_title_animated?: string;
    partner_logos: [any];
    testimonial_bg: StrapiMedia | null;
    testimonial_quote: string;
    testimonial_author_name: string;
    testimonial_author_role: string;
};
export async function get_partner_page_content(locale = "en"): Promise<PartnerPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/partner-page?populate[banner][populate]=*&populate[partner_logos][populate]=*&populate[testimonial_bg][populate]=*&locale=${locale}`);
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
    service_section_title: AboutPageSectionTitle;
};
export async function get_about_page_content(locale = "en"): Promise<AboutPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/about-page?locale=${locale}&populate[Banner][populate]=*&populate[about_section][populate]=*&populate[about_stats_counters][populate]=*&populate[about_award_bg][populate]=*&populate[about_award_logo][populate]=*&populate[why_choose_section][populate]=*&populate[why_choose_cards][populate]=*&populate[why_choose_image_cards][populate]=*&populate[service_section_title][populate]=*`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// CTA Section
export type CtaContent = {
    title: string;
    description: string;
    button_label: string;
    button_link: string;
    map_image: StrapiMedia | null;
    legend_one: string;
    legend_two: string;
};
export async function get_cta_content(locale = "en"): Promise<CtaContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/cta?populate=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Leadership Page
export type ExecutiveLeaderContent = {
    id: number;
    label: string;
    name: string;
    description: string;
    quote: string;
    phone: string;
    email: string;
    image: StrapiMedia | null;
};
export type TeamMember = {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    image: StrapiMedia | null;
};
export type SeniorLeader = {
    id: number;
    name: string;
    role: string;
};
export type LeadershipPageContent = {
    Banner: {
        id: number;
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    executive_leader: ExecutiveLeaderContent;
    senior_leadership: SeniorLeader[];
    senior_leadership_title:string
};
export async function get_leadership_page_content(locale = "en"): Promise<LeadershipPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/leadership-page?locale=${locale}&populate[Banner][populate]=*&populate[executive_leader][populate]=*&populate[senior_leadership][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

export async function get_teams(locale = "en", limit?: number): Promise<TeamMember[]> {
    try {
        const params = new URLSearchParams({ populate: "*", locale });
        if (limit !== undefined) params.set("pagination[limit]", String(limit));
        const res = await fetch(`${BASE_URL}/api/teams?${params}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}


// Career CTA Section
export type CareerCtaSectionContent = {
    career_cta_background?: StrapiMedia | null;
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
const CAREER_CTA_FALLBACK: CareerCtaSectionContent = {
    career_cta_background: null,
    career_cta_section_title: {
        sub_title: "Life at Sah",
        title: "Career with SAH",
        description: "Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has established itself as a trusted name in the construction industry, delivering exceptional projects",
    },
    career_cta_button: {
        button_label: "You Like to Build?",
        button_link: "#",
    },
};
export async function get_career_cta_section_content(locale = "en"): Promise<CareerCtaSectionContent> {
    try {
        const res = await fetch(`${BASE_URL}/api/career-cta?populate=*&locale=${locale}`);
        if (!res.ok) return CAREER_CTA_FALLBACK;
        const json = await res.json();
        return json.data ?? CAREER_CTA_FALLBACK;
    } catch {
        return CAREER_CTA_FALLBACK;
    }
}

