import { BASE_URL } from "@/lib/constant";
import type { StrapiMedia } from "./page_content.service";

export type NewsTag = {
    documentId: string;
    name: string;
    slug: string;
};

export type NewsItem = {
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    date: string;
    tags: NewsTag[];
    author: string;
};

type StrapiNewsTagRaw = {
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
};

type StrapiNewsItemRaw = {
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: StrapiMedia | null;
    tags: StrapiNewsTagRaw[];
    publishedAt: string;
    author_name: string | null;
};

function map_news_item(item: StrapiNewsItemRaw): NewsItem {
    const imageUrl = item.featured_image?.url ?? "";
    return {
        documentId: item.documentId,
        title: item.title ?? "",
        slug: item.slug ?? item.documentId,
        excerpt: item.excerpt ?? "",
        image: imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`) : "",
        date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "",
        tags: (item.tags ?? []).map(({ documentId, name, slug }) => ({ documentId, name, slug })),
        author: item.author_name ?? "",
    };
}

export async function get_news_items(locale = "en", limit = 1000): Promise<NewsItem[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/news-items?locale=${locale}&populate=*&pagination[pageSize]=${limit}`);
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data ?? []).map(map_news_item);
    } catch {
        return [];
    }
}

export async function get_news_tags(locale = "en"): Promise<NewsTag[]> {
    const items = await get_news_items(locale);
    const seen = new Set<string>();
    return items
        .flatMap((item) => item.tags)
        .filter(({ documentId }) => {
            if (seen.has(documentId)) return false;
            seen.add(documentId);
            return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}
