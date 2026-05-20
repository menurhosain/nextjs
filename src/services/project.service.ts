import { BASE_URL } from "@/lib/constant";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type ProjectDetail = {
    title: string;
    slug: string;
    excerpt: string;
    year: number | null;
    startDate: string | null;
    endDate: string | null;
    clientName: string;
    featuredImage: string | null;
    imageGallery: string[];
    imageGallerySecond: string[];
    scopes: string[];
    industries: string[];
    locations: string[];
    content: BlocksContent;
};

export type Project = {
    scope: string[];
    industry: string[];
    title: string;
    slug: string;
    image: string;
    year: string;
    location: string[];
    link: string;
    excerpt: string;
};

export type ProjectTag = {
    key: string;
    label: string;
    options: string[];
};

type StrapiRelationItem = { name: string };

type StrapiProjectItem = {
    documentId: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    year?: number;
    featuredImage?: { url: string } | null;
    scopes?: StrapiRelationItem[];
    industries?: StrapiRelationItem[];
    locations?: StrapiRelationItem[];
};

async function fetch_raw_projects(locale = "en", count = 2000): Promise<Project[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/projects?populate=*&locale=${locale}&pagination[pageSize]=${count}`);
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data ?? []).map((item: StrapiProjectItem) => {
            const imageUrl = item.featuredImage?.url ?? "";
            return {
                title: item.title ?? "",
                slug: item.title ?? "",
                excerpt: item.excerpt ?? "",
                year: String(item.year ?? ""),
                link: `/projects/${item.slug}`,
                image: imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`,
                scope: (item.scopes ?? []).map((s) => s.name),
                industry: (item.industries ?? []).map((i) => i.name),
                location: (item.locations ?? []).map((l) => l.name),
            };
        });
    } catch {
        return [];
    }
}

export async function get_projects(locale = "en", count = 2000): Promise<Project[]> {
    return fetch_raw_projects(locale, count);
}

export async function get_project_by_slug(slug: string, locale = "en"): Promise<ProjectDetail | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&locale=${locale}`);
        if (!res.ok) return null;
        const json = await res.json();
        const item: StrapiProjectItem & {
            startDate?: string;
            endDate?: string;
            clientName?: string;
            imageGallery?: { url: string }[];
            imageGallerySecond?: { url: string }[];
            content?: BlocksContent;
        } = json.data?.[0];
        if (!item) return null;

        const resolveUrl = (url: string) => (url.startsWith("http") ? url : `${BASE_URL}${url}`);

        return {
            title: item.title ?? "",
            slug: item.slug ?? slug,
            excerpt: item.excerpt ?? "",
            year: item.year ?? null,
            startDate: item.startDate ?? null,
            endDate: item.endDate ?? null,
            clientName: item.clientName ?? "",
            featuredImage: item.featuredImage?.url ? resolveUrl(item.featuredImage.url) : null,
            imageGallery: (item.imageGallery ?? []).map((m) => resolveUrl(m.url)),
            imageGallerySecond: (item.imageGallerySecond ?? []).map((m) => resolveUrl(m.url)),
            scopes: (item.scopes ?? []).map((s) => s.name),
            industries: (item.industries ?? []).map((i) => i.name),
            locations: (item.locations ?? []).map((l) => l.name),
            content: item.content ?? [],
        };
    } catch {
        return null;
    }
}

export async function get_project_tags(locale = "en"): Promise<ProjectTag[]> {
    const projects = await fetch_raw_projects(locale);

    const unique = (key: keyof Pick<Project, "scope" | "industry" | "location">) => [...new Set(projects.flatMap((p) => p[key]))].filter(Boolean).sort();

    return [
        { key: "location", label: "BY LOCATION", options: unique("location") },
        { key: "scope", label: "BY SCOPE OF WORK", options: unique("scope") },
        { key: "industry", label: "BY INDUSTRY", options: unique("industry") },
    ];
}
