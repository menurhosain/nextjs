import { BASE_URL } from "@/lib/constant";

export type GlobalSettings = {
    recaptcha_site_key: string | null;
    recaptcha_secret_key: string | null;
};

export async function get_global_settings(): Promise<GlobalSettings | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/global?fields[0]=recaptcha_site_key&fields[1]=recaptcha_secret_key`,
            { next: { revalidate: 3600 } },
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}
