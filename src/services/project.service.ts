import { BASE_URL } from "@/lib/constant";

export type Project = {
    scope: string[];
    industry: string[];
    title: string;
    image: string;
    year: string;
    location: string[];
    link: string;
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
    year?: number;
    featuredImage?: { url: string } | null;
    scopes?: StrapiRelationItem[];
    industries?: StrapiRelationItem[];
    locations?: StrapiRelationItem[];
};

async function fetch_raw_projects(locale = "en"): Promise<Project[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/projects?populate=*&locale=${locale}`);
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data ?? []).map((item: StrapiProjectItem) => {
            const imageUrl = item.featuredImage?.url ?? "";
            return {
                title: item.title ?? "",
                year: String(item.year ?? ""),
                link: `/projects/${item.documentId}`,
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

export async function get_projects(locale = "en"): Promise<Project[]> {
    return fetch_raw_projects(locale);
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
