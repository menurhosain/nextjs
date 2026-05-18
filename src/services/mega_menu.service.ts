import { BASE_URL } from "@/lib/constant";
import { StrapiMedia } from "@/services/page_content.service";

export type MegaMenuInfo = {
    id: number;
    label: string;
    excerpt: string;
    action_link_label: string;
    action_link_href: string;
    bg_image: StrapiMedia | null;
};

export type MegaMenuLink = {
    id: number;
    button_label: string;
    button_link: string;
};

export type FeaturedNews = {
    id: number;
    title: string;
    link_label: string;
    link_href: string;
    thumbnail: StrapiMedia | null;
};

export type Menu = {
    id: number;
    nav_label: string;
    is_parent: boolean;
    mega_menu_links: MegaMenuLink[];
    mega_menu_left_info: MegaMenuInfo | null;
    mega_menu_right_info: MegaMenuInfo | null;
    featured_news: FeaturedNews[];
};

export async function get_mega_menu(locale = "en"): Promise<Menu[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/mega-menu?locale=${locale}&populate[menus][populate][mega_menu_left_info][populate]=*&populate[menus][populate][mega_menu_right_info][populate]=*&populate[menus][populate][mega_menu_links][populate]=*&populate[menus][populate][featured_news][populate]=*`,
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.menus ?? [];
    } catch {
        return [];
    }
}
