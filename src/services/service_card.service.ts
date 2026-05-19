import { BASE_URL } from "@/lib/constant";

export type StrapiMedia = {
    id: number;
    url: string;
    alternativeText: string | null;
};

export type ServiceCard = {
    id: number;
    svg: string;
    title: string;
    description: string;
    button_label: string;
    button_link: string;
    image: StrapiMedia | null;
};

export async function get_service_cards(locale = "en"): Promise<ServiceCard[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/service-card?populate[service_card][populate]=*&locale=${locale}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.service_card ?? [];
    } catch {
        return [];
    }
}
