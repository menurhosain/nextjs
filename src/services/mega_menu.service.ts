import { BASE_URL } from "@/lib/constant";

export type Menu = {
    id: number;
    login_label: string;
    login_link: string;
    signup_label: string;
    signup_link: string;
};

export async function get_mega_menu(locale = "en"): Promise<Menu | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/mega-menu?locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
