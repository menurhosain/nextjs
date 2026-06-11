import { BASE_URL } from "@/lib/constant";
import { Service } from "./service.service";
import { type Project, mapProject } from "./project.service";
import { type NewsItem, map_news_item } from "./news.service";
import { type Job } from "./job.service";

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

export type SectionTitle = {
    id: number;
    sub_title: string;
    title: string;
    description: string;
};

// Home page
export type HomePageContent = {
    banner_background: StrapiMedia[];
    banner_title_normal: string;
    banner_typewriter_texts: { id: number; text: string }[];
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
    services: Service[];

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
    projects: Project[];

    blog_section_sub_title: string;
    blog_section_title: string;
    blog_section_description: string;
    blog_section_button_label: string;
    blog_section_button_link: string;
    news_items: NewsItem[];
};
export async function get_home_page_content(locale = "en"): Promise<HomePageContent | null> {
    try {
        const url =
            `${BASE_URL}/api/home?locale=${locale}` +
            `&populate[0]=banner_background` +
            `&populate[1]=banner_typewriter_texts` +
            `&populate[2]=about_left_image` +
            `&populate[3]=partner_logos` +
            `&populate[4]=services.image` +
            `&populate[5]=projects.featuredImage` +
            `&populate[6]=projects.scopes` +
            `&populate[7]=projects.industries` +
            `&populate[8]=projects.locations` +
            `&populate[9]=news_items.featured_image` +
            `&populate[10]=news_items.tags`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        if (!json.data) return null;
        return {
            ...json.data,
            projects: (json.data.projects ?? []).map(mapProject),
            news_items: (json.data.news_items ?? []).map(map_news_item),
        };
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
};
export async function get_partner_page_content(locale = "en"): Promise<PartnerPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/partner-page?populate[banner][populate]=*&populate[partner_logos][populate]=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Project Details Page
export type ProjectDetailsPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    project_info_heading: string;
    client_label: string;
    category_label: string;
    start_date_label: string;
    end_date_label: string;
    discuss_button_label: string;
    discuss_button_link: string;
    previous_project_label: string;
    next_project_label: string;
};
export async function get_project_details_page_content(locale = "en"): Promise<ProjectDetailsPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/project-details-page?populate[banner][populate]=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Subcontractor Page
export type SubcontractorPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    intro_title_normal: string;
    intro_title_animated: string;
    intro_description: string;
    hero_image: StrapiMedia | null;
    icon_box: {
        Icon: string;
        Title: string;
        Link: string;
    }[];
    policies_title: string;
    policies_description: string;
    policy_image: StrapiMedia | null;
    policy_description: string;
    policy_button_1_label: string;
    policy_button_1_link: string;
    policy_button_2_label: string;
    policy_button_2_link: string;
};
export async function get_subcontractor_page_content(locale = "en"): Promise<SubcontractorPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/subcontractor-page?populate[icon_box][populate]=*&populate[banner][populate]=*&populate[hero_image][populate]=*&populate[policy_image][populate]=*&locale=${locale}`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Career Page
export type CareerPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    section_title: string;
    section_description: string;
    section_button_label: string;
    section_button_link: string;
    image_1: StrapiMedia | null;
    image_2: StrapiMedia | null;
    map_image: StrapiMedia | null;
    map_legend_1: string;
    map_legend_2: string;
    job_section_title: string;
    job_section_description: string;
    job_board_image: StrapiMedia | null;
    job_listings: { job_status: string; job_title: string; btn_label: string; btn_link: string }[];
};
export async function get_career_page_content(locale = "en"): Promise<CareerPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/career-page?populate[banner][populate]=*&populate[image_1][populate]=*&populate[image_2][populate]=*&populate[map_image][populate]=*&populate[job_board_image][populate]=*&populate[job_listings][fields][0]=job_status&populate[job_listings][fields][1]=job_title&populate[job_listings][fields][2]=btn_label&populate[job_listings][fields][3]=btn_link&locale=${locale}`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Voices of Experience (global testimonial)
export type VoicesOfExperienceContent = {
    background: StrapiMedia | null;
    quote: string;
    name: string;
    role: string;
};
export async function get_voices_of_experience_content(locale = "en"): Promise<VoicesOfExperienceContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/voices-of-experience?populate=*&locale=${locale}`);
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
    services: Service[];
};
export async function get_about_page_content(locale = "en"): Promise<AboutPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/about-page?locale=${locale}&populate[Banner][populate]=*&populate[about_section][populate]=*&populate[about_stats_counters][populate]=*&populate[about_award_bg][populate]=*&populate[about_award_logo][populate]=*&populate[why_choose_section][populate]=*&populate[why_choose_cards][populate]=*&populate[why_choose_image_cards][populate]=*&populate[service_section_title][populate]=*&populate[services][populate]=*`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Service Details Page
export type ServiceBenefit = {
    id: number;
    code: string;
    label: string;
};
export type ServiceDetailsPageContent = {
    Banner: {
        id: number;
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    service_detail_title: string;
    service_detail_description: string;
    service_detail_benefits_label: string;
    service_detail_benefits: ServiceBenefit[];
    team_section_title: SectionTitle | null;
    our_value_heading: string;
    our_value_bg: StrapiMedia | null;
    our_value_items: { id: number; title: string; description: string }[];
    approach_section_title: SectionTitle | null;
    approach_section_image: StrapiMedia | null;
    service_section_title: SectionTitle | null;
    feature_section_bg: StrapiMedia | null;
    feature_items: { id: number; icon: string; step: string; title: string; description: string }[];
    services: Service[];
    teams: TeamMember[];
};

export async function get_service_details_page_content(locale = "en"): Promise<ServiceDetailsPageContent | null> {
    try {
        const url = `${BASE_URL}/api/service-details?locale=${locale}&populate[Banner][populate]=*&populate[team_section_title][populate]=*&populate[our_value_bg][populate]=*&populate[our_value_items][populate]=*&populate[approach_section_title][populate]=*&populate[approach_section_image][populate]=*&populate[service_section_title][populate]=*&populate[feature_section_bg][populate]=*&populate[feature_items][populate]=*&populate[services][populate]=*&populate[teams][populate]=*`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Services Page
export type ServicesPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    service_section_title: SectionTitle;
    faq_section_title: SectionTitle;
    services: Service[];
};
export async function get_services_page_content(locale = "en"): Promise<ServicesPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/services-page?populate[banner][populate]=*&populate[service_section_title]=*&populate[services][populate]=*&populate[faq_section_title]=*&locale=${locale}`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// FAQ
export type FaqItem = {
    id: number;
    question: string;
    answer: string;
};
export async function get_faq_items(locale = "en"): Promise<FaqItem[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/faq?populate[faq_item]=*&locale=${locale}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.faq_item ?? [];
    } catch {
        return [];
    }
}

// Contact Page
export type ContactPageContent = {
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    form_title: string;
    form_subtitle: string;
    form_submit_label: string;
    contact_image: StrapiMedia | null;
    address_label: string;
    address_value: string;
    email_label: string;
    email_value: string;
    phone_label: string;
    phone_value: string;
    hours_label: string;
    hours_value: string;
    map_embed_url: string;
    placeholder_first_name: string;
    placeholder_last_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_message: string;
};

export async function get_contact_page_content(locale = "en"): Promise<ContactPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/contact-page?populate[banner][populate]=*&populate[contact_image][populate]=*&locale=${locale}`);
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
    senior_leadership_title: string;
    teams: TeamMember[];
};
export async function get_leadership_page_content(locale = "en"): Promise<LeadershipPageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/leadership-page?locale=${locale}&populate[Banner][populate]=*&populate[executive_leader][populate]=*&populate[senior_leadership][populate]=*&populate[teams][populate][image][populate]=*`,
        );
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
        description:
            "Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has established itself as a trusted name in the construction industry, delivering exceptional projects",
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

// News Page
export type NewsPageContent = {
    Banner: {
        id: number;
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    };
    post_per_page: number | null;
};
export async function get_news_page_content(locale = "en"): Promise<NewsPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/news-page?locale=${locale}&populate[Banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// News Details Page
export type NewsDetailsPageContent = {
    related_posts_label: string | null;
    share_label: string | null;
    previous_article_label: string | null;
    next_article_label: string | null;
};

export async function get_news_details_page_content(locale = "en"): Promise<NewsDetailsPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/news-details-page?locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Register Applicant Page
export type RegisterApplicantPageContent = {
    banner: { banner_label: string; banner_title: string; banner_bg: StrapiMedia | null } | null;
    form_title: string | null;
    first_name_label: string | null;
    last_name_label: string | null;
    email_label: string | null;
    username_label: string | null;
    password_label: string | null;
    confirm_password_label: string | null;
    phone_label: string | null;
    location_label: string | null;
    first_name_placeholder: string | null;
    last_name_placeholder: string | null;
    email_placeholder: string | null;
    username_placeholder: string | null;
    phone_placeholder: string | null;
    location_placeholder: string | null;
    submit_button_label: string | null;
    submitting_label: string | null;
};

export async function get_register_applicant_page_content(locale = "en"): Promise<RegisterApplicantPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/register-applicant-page?locale=${locale}&populate[banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Login Page
export type LoginPageContent = {
    banner: { banner_label: string; banner_title: string; banner_bg: StrapiMedia | null } | null;
    form_title: string | null;
    email_label: string | null;
    email_placeholder: string | null;
    password_label: string | null;
    forgot_password_label: string | null;
    forgot_password_link: string | null;
    submit_button_label: string | null;
    submitting_label: string | null;
};

export async function get_login_page_content(locale = "en"): Promise<LoginPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/login-page?locale=${locale}&populate[banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Forget Password Page
export type ForgetPasswordPageContent = {
    banner: { banner_label: string; banner_title: string; banner_bg: StrapiMedia | null } | null;
    form_title: string | null;
    form_description: string | null;
    email_label: string | null;
    email_placeholder: string | null;
    submit_button_label: string | null;
    submitting_label: string | null;
    success_title: string | null;
    success_description: string | null;
    back_to_login_text: string | null;
    back_to_login_link_label: string | null;
    back_to_login_link: string | null;
};

export async function get_forget_password_page_content(locale = "en"): Promise<ForgetPasswordPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/forget-password-page?locale=${locale}&populate[banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Dashboard Page
export type DashboardPageContent = {
    banner: { banner_label: string | null; banner_title: string | null; banner_bg: StrapiMedia | null } | null;
    welcome_greeting: string | null;
    account_summary_text: string | null;
    profile_card_label: string | null;
    profile_card_title: string | null;
    profile_card_description: string | null;
    applicant_section_label: string | null;
    applicant_apply_label: string | null;
    applicant_apply_description: string | null;
    contractor_section_label: string | null;
    contractor_apply_label: string | null;
    contractor_apply_description: string | null;
    account_details_heading: string | null;
    email_field_label: string | null;
    username_field_label: string | null;
    account_type_label: string | null;
    applications_heading: string | null;
    new_application_label: string | null;
    empty_state_text: string | null;
    empty_state_link_label: string | null;
    location_label: string | null;
    experience_label: string | null;
};

export async function get_dashboard_page_content(locale = "en"): Promise<DashboardPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/dashboard-page?locale=${locale}&populate[banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// Register Contractor Page
export type RegisterContractorPageContent = {
    banner: { banner_label: string; banner_title: string; banner_bg: StrapiMedia | null } | null;
    form_title: string | null;
    first_name_label: string | null;
    last_name_label: string | null;
    email_label: string | null;
    username_label: string | null;
    password_label: string | null;
    confirm_password_label: string | null;
    phone_label: string | null;
    location_label: string | null;
    first_name_placeholder: string | null;
    last_name_placeholder: string | null;
    email_placeholder: string | null;
    username_placeholder: string | null;
    phone_placeholder: string | null;
    location_placeholder: string | null;
    submit_button_label: string | null;
    submitting_label: string | null;
};

export async function get_register_contractor_page_content(locale = "en"): Promise<RegisterContractorPageContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/register-contractor-page?locale=${locale}&populate[banner][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
