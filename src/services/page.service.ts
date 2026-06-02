import { BASE_URL } from "@/lib/constant";
import { getStrapiMediaUrl } from "@/lib/utils";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { StrapiMedia } from "./page_content.service";

export type PageContent = {
    title: string;
    slug: string;
    banner: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    } | null;
    content: BlocksContent;
};

type StrapiPageRaw = {
    title?: string;
    slug?: string;
    banner?: {
        banner_label: string;
        banner_title: string;
        banner_bg: StrapiMedia | null;
    } | null;
    content?: BlocksContent;
};

export async function get_page_by_slug(slug: string, locale = "en"): Promise<PageContent | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate[banner][populate]=*`,
        );
        if (!res.ok) return null;
        const json = await res.json();
        const item: StrapiPageRaw = json.data?.[0];
        if (!item) return null;
        return {
            title: item.title ?? "",
            slug: item.slug ?? slug,
            banner: item.banner ?? null,
            content: item.content ?? [],
        };
    } catch {
        return null;
    }
}
