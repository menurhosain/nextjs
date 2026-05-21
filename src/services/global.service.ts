import { BASE_URL } from "@/lib/constant";

export type GlobalSettings = {
    siteName: string | null;
    siteDescription: string | null;
    favicon: { url: string } | null;
    light_logo: { url: string } | null;
    dark_logo: { url: string } | null;
    recaptcha_site_key: string | null;
    recaptcha_secret_key: string | null;
};

export async function get_global_settings(locale = "en"): Promise<GlobalSettings | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/global?locale=${locale}&populate[favicon][populate]=*&populate[light_logo][populate]=*&populate[dark_logo][populate]=*`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
