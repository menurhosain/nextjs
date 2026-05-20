import { BASE_URL } from "@/lib/constant";

export type OffcanvasButton = {
    id: number;
    button_label: string;
    button_link: string;
};

export type OffcanvasContent = {
    vertical_text: string;
    email: string;
    search_placeholder: string;
    menu_button: OffcanvasButton | null;
    social_links: OffcanvasButton[];
    contact_us_label: string;
    contact_us_link: string;
    form_title: string;
    placeholder_first_name: string;
    placeholder_last_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_message: string;
    form_submit_label: string;
    view_all_projects_label: string;
    view_all_projects_link: string;
};

export async function get_offcanvas_content(locale = "en"): Promise<OffcanvasContent | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/offcanvas?populate[menu_button][populate]=*&populate[social_links][populate]=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
