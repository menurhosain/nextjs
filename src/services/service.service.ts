import { BASE_URL } from "@/lib/constant";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { getStrapiMediaUrl } from "@/lib/utils";

export type BenefitListItem = {
    id: number;
    list_number: string;
    list_value: string;
};

export type Service = {
    documentId: string;
    slug: string;
    title: string;
    description: string;
    svg: string;
    button_label: string;
    image: string | null;
};

export type ServiceDetail = {
    documentId: string;
    slug: string;
    title: string;
    description: string;
    svg: string;
    button_label: string;
    image: string | null;
    content: BlocksContent;
    benefits: BenefitListItem[];
};

type StrapiServiceRaw = {
    documentId: string;
    slug: string;
    title: string;
    description: string | null;
    svg: string | null;
    button_label: string | null;
    button_link: string | null;
    image: { url: string } | null;
    content: BlocksContent;
    benefits?: BenefitListItem[];
};

export async function get_services(locale = "en", count = 1000): Promise<Service[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/services?populate=*&locale=${locale}&pagination[pageSize]=${count}`,
        );
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data ?? []).map((item: StrapiServiceRaw) => ({
            documentId: item.documentId,
            slug: item.slug ?? "",
            title: item.title ?? "",
            description: item.description ?? "",
            svg: item.svg ?? "",
            button_label: item.button_label ?? "",
            image: item.image?.url ? getStrapiMediaUrl(item.image.url) : null,
        }));
    } catch {
        return [];
    }
}

export async function get_service_by_slug(slug: string, locale = "en"): Promise<ServiceDetail | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&locale=${locale}`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        const item: StrapiServiceRaw = json.data?.[0];
        if (!item) return null;

        return {
            documentId: item.documentId,
            slug: item.slug ?? slug,
            title: item.title ?? "",
            description: item.description ?? "",
            svg: item.svg ?? "",
            button_label: item.button_label ?? "",
            image: item.image?.url ? getStrapiMediaUrl(item.image.url) : null,
            content: item.content ?? [],
            benefits: (item.benefits ?? []).map(({ id, list_number, list_value }) => ({
                id,
                list_number: list_number ?? "",
                list_value: list_value ?? "",
            })),
        };
    } catch {
        return null;
    }
}
