import { BASE_URL } from "@/lib/constant";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type AdjacentProject = { slug: string; title: string; documentId: string } | null;

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
    end_content: BlocksContent;
    highlited_lists: [{ id: number; text: string }];
    prev: AdjacentProject;
    next: AdjacentProject;
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

export function mapProject(item: StrapiProjectItem): Project {
    const imageUrl = item.featuredImage?.url ?? "";
    return {
        title: item.title ?? "",
        slug: item.slug ?? "",
        excerpt: item.excerpt ?? "",
        year: String(item.year ?? ""),
        link: `/projects/${item.slug}`,
        image: imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`,
        scope: (item.scopes ?? []).map((s) => s.name),
        industry: (item.industries ?? []).map((i) => i.name),
        location: (item.locations ?? []).map((l) => l.name),
    };
}

async function fetch_raw_projects(locale = "en", count = 2000, tag?: string): Promise<Project[]> {
    try {
        let url = `${BASE_URL}/api/projects?populate=*&locale=${locale}&pagination[pageSize]=${count}`;
        if (tag) url += `&filters[tags][slug][$eq]=${encodeURIComponent(tag)}`;
        const res = await fetch(url);
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data ?? []).map(mapProject);
    } catch {
        return [];
    }
}

export async function get_projects(locale = "en", count = 2000, tag?: string): Promise<Project[]> {
    return fetch_raw_projects(locale, count, tag);
}

export async function get_project_by_slug(slug: string, locale = "en"): Promise<ProjectDetail | null> {
    try {
        const [projectRes, adjacentRes] = await Promise.all([
            fetch(`${BASE_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&locale=${locale}`),
            fetch(`${BASE_URL}/api/projects/${encodeURIComponent(slug)}/adjacent?locale=${locale}`),
        ]);

        if (!projectRes.ok) return null;
        const json = await projectRes.json();
        const item: StrapiProjectItem & {
            startDate?: string;
            endDate?: string;
            clientName?: string;
            imageGallery?: { url: string }[];
            imageGallerySecond?: { url: string }[];
            content?: BlocksContent;
            end_content?: BlocksContent;
            highlited_lists: [{ id: number; text: string }];
        } = json.data?.[0];
        if (!item) return null;

        const adjacent = adjacentRes.ok ? await adjacentRes.json() : { prev: null, next: null };
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
            end_content: item.end_content ?? [],
            highlited_lists: item.highlited_lists ?? [],
            prev: adjacent.prev ?? null,
            next: adjacent.next ?? null,
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
