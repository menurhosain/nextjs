import { BASE_URL } from "@/lib/constant";

export type GlobalSettings = {
    siteName: string | null;
    siteDescription: string | null;
    favicon: { url: string } | null;
    defaultSeo: {
        metaTitle: string | null;
        metaDescription: string | null;
        shareImage: { url: string } | null;
    } | null;
    recaptcha_site_key: string | null;
    recaptcha_secret_key: string | null;
};

export async function get_global_settings(locale = "en"): Promise<GlobalSettings | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/global?locale=${locale}&populate[favicon][populate]=*&populate[defaultSeo][populate]=*`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
