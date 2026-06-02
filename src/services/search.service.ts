import { BASE_URL } from "@/lib/constant";
import { getStrapiMediaUrl } from "@/lib/utils";

export type SearchResult = {
    type: "project" | "news";
    title: string;
    excerpt: string;
    slug: string;
    link: string;
    image: string | null;
};

type StrapiProjectItem = {
    title?: string;
    slug?: string;
    excerpt?: string;
    featuredImage?: { url: string } | null;
};

type StrapiNewsItem = {
    title?: string;
    slug?: string;
    documentId?: string;
    excerpt?: string;
    featured_image?: { url: string } | null;
};

async function fetch_projects(query: string, locale: string): Promise<SearchResult[]> {
    const q = encodeURIComponent(query);
    const url =
        `${BASE_URL}/api/projects` +
        `?filters[$or][0][title][$containsi]=${q}` +
        `&filters[$or][1][excerpt][$containsi]=${q}` +
        `&locale=${locale}` +
        `&populate=featuredImage` +
        `&pagination[pageSize]=100`;

    const res = await fetch(url);
    if (!res.ok) return [];

    const json = await res.json();
    return (json.data ?? []).map((item: StrapiProjectItem) => ({
        type: "project" as const,
        title: item.title ?? "",
        excerpt: item.excerpt ?? "",
        slug: item.slug ?? "",
        link: `/projects/${item.slug}`,
        image: getStrapiMediaUrl(item.featuredImage) || null,
    }));
}

async function fetch_news(query: string, locale: string): Promise<SearchResult[]> {
    const q = encodeURIComponent(query);
    const url = `${BASE_URL}/api/news-items` + `?filters[title][$containsi]=${q}` + `&locale=${locale}` + `&populate=featured_image` + `&pagination[pageSize]=100`;

    const res = await fetch(url);
    if (!res.ok) return [];

    const json = await res.json();
    return (json.data ?? []).map((item: StrapiNewsItem) => ({
        type: "news" as const,
        title: item.title ?? "",
        excerpt: item.excerpt ?? "",
        slug: item.slug ?? item.documentId ?? "",
        link: `/news/${item.slug ?? item.documentId}`,
        image: getStrapiMediaUrl(item.featured_image) || null,
    }));
}

export async function search(query: string, locale = "en"): Promise<SearchResult[]> {
    try {
        const [projects, news] = await Promise.all([fetch_projects(query, locale), fetch_news(query, locale)]);
        return [...projects, ...news];
    } catch {
        return [];
    }
}
