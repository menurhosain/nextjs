import { BASE_URL } from "@/lib/constant";

export type ServiceCard = {
    id: number;
    svg: string;
    title: string;
    description: string;
    button_label: string;
    button_link: string;
};

export type ServiceCardContent = {
    service_card: ServiceCard[];
};

export async function get_service_cards(locale = "en"): Promise<ServiceCard[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/service-card?populate=*&locale=${locale}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.service_card ?? [];
    } catch {
        return [];
    }
}
