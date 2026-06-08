import { BASE_URL } from "@/lib/constant";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type JobLocation = {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
};

export type Job = {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locations?: JobLocation[];
    deadline: string | null;
    experience: string | null;
    employment_status: string | null;
    details?: BlocksContent | null;
};

type StrapiJobItem = {
    id: number;
    documentId: string;
    title?: string;
    slug?: string;
    locations?: JobLocation[];
    deadline?: string | null;
    experience?: string | null;
    employment_status?: string | null;
    details?: BlocksContent | null;
};

export async function get_jobs(locale = "en"): Promise<Job[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/jobs?locale=${locale}&populate[locations][fields][0]=name&populate[locations][fields][1]=slug&populate[locations][fields][2]=description`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        const items: StrapiJobItem[] = json?.data ?? [];
        return items.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title ?? "",
            slug: item.slug ?? "",
            locations: item.locations ?? [],
            deadline: item.deadline ?? null,
            experience: item.experience ?? null,
            employment_status: item.employment_status ?? null,
        }));
    } catch {
        return [];
    }
}

export async function get_job_by_slug(slug: string, locale = "en"): Promise<Job | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/jobs?filters[slug][$eq]=${slug}&locale=${locale}&populate[locations][fields][0]=name&populate[locations][fields][1]=slug&populate[locations][fields][2]=description&status=published`,
            { next: { revalidate: 60 } },
        );
        if (!res.ok) return null;
        const json = await res.json();
        const item: StrapiJobItem | undefined = json?.data?.[0];
        if (!item) return null;
        return {
            id: item.id,
            documentId: item.documentId,
            title: item.title ?? "",
            slug: item.slug ?? "",
            locations: item.locations ?? [],
            deadline: item.deadline ?? null,
            experience: item.experience ?? null,
            employment_status: item.employment_status ?? null,
            details: item.details ?? null,
        };
    } catch {
        return null;
    }
}
