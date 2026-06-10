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

const ENV_FALLBACK: Partial<GlobalSettings> = {
    recaptcha_site_key: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? null,
    recaptcha_secret_key: process.env.RECAPTCHA_SECRET_KEY ?? null,
};

export async function get_global_settings(locale = "en"): Promise<GlobalSettings | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/global?locale=${locale}&populate[favicon][populate]=*&populate[light_logo][populate]=*&populate[dark_logo][populate]=*`);
        if (!res.ok) return { ...defaultGlobal(), ...ENV_FALLBACK };
        const json = await res.json();
        const data: GlobalSettings = json.data ?? {};
        return {
            ...data,
            recaptcha_site_key: data.recaptcha_site_key ?? ENV_FALLBACK.recaptcha_site_key ?? null,
            recaptcha_secret_key: data.recaptcha_secret_key ?? ENV_FALLBACK.recaptcha_secret_key ?? null,
        };
    } catch {
        return { ...defaultGlobal(), ...ENV_FALLBACK };
    }
}

function defaultGlobal(): GlobalSettings {
    return { siteName: null, siteDescription: null, favicon: null, light_logo: null, dark_logo: null, recaptcha_site_key: null, recaptcha_secret_key: null };
}
