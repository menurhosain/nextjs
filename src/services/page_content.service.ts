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
