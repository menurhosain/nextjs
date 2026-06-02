import { BASE_URL } from "@/lib/constant";
import type { StrapiMedia } from "./page_content.service";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

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

export function map_news_item(item: StrapiNewsItemRaw): NewsItem {
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

export type AdjacentNewsItem = { slug: string; title: string; documentId: string } | null;

export type NewsItemDetail = {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    author: string;
    featuredImage: string | null;
    tags: NewsTag[];
    content: BlocksContent;
    prev: AdjacentNewsItem;
    next: AdjacentNewsItem;
};

export async function get_news_item_by_slug(slug: string, locale = "en"): Promise<NewsItemDetail | null> {
    try {
        const [itemRes, adjacentRes] = await Promise.all([
            fetch(`${BASE_URL}/api/news-items?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&locale=${locale}`),
            fetch(`${BASE_URL}/api/news-items/${encodeURIComponent(slug)}/adjacent?locale=${locale}`),
        ]);

        if (!itemRes.ok) return null;
        const json = await itemRes.json();
        const item = json.data?.[0];
        if (!item) return null;

        const adjacent = adjacentRes.ok ? await adjacentRes.json() : { prev: null, next: null };
        const resolveUrl = (url: string) => (url.startsWith("http") ? url : `${BASE_URL}${url}`);

        return {
            title: item.title ?? "",
            slug: item.slug ?? slug,
            excerpt: item.excerpt ?? "",
            date: item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : "",
            author: item.author_name ?? "",
            featuredImage: item.featured_image?.url ? resolveUrl(item.featured_image.url) : null,
            tags: (item.tags ?? []).map(({ documentId, name, slug: tagSlug }: { documentId: string; name: string; slug: string }) => ({
                documentId,
                name,
                slug: tagSlug,
            })),
            content: item.content ?? [],
            prev: adjacent.prev ?? null,
            next: adjacent.next ?? null,
        };
    } catch {
        return null;
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
