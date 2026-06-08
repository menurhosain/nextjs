import { BASE_URL } from "@/lib/constant";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type SubcontractedLocation = {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
};

export type Subcontracted = {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locations?: SubcontractedLocation[];
    deadline: string | null;
    experience: string | null;
    details?: BlocksContent | null;
};

type StrapiSubcontractedItem = {
    id: number;
    documentId: string;
    title?: string;
    slug?: string;
    locations?: SubcontractedLocation[];
    deadline?: string | null;
    experience?: string | null;
    details?: BlocksContent | null;
};

export async function get_subcontracteds(locale = "en"): Promise<Subcontracted[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/subcontracteds?locale=${locale}&populate[locations][fields][0]=name&populate[locations][fields][1]=slug&populate[locations][fields][2]=description`,
            { next: { revalidate: 60 } },
        );
        if (!res.ok) return [];
        const json = await res.json();
        const items: StrapiSubcontractedItem[] = json?.data ?? [];
        return items.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title ?? "",
            slug: item.slug ?? "",
            locations: item.locations ?? [],
            deadline: item.deadline ?? null,
            experience: item.experience ?? null,
        }));
    } catch {
        return [];
    }
}

export async function get_subcontracted_by_slug(slug: string, locale = "en"): Promise<Subcontracted | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/subcontracteds?filters[slug][$eq]=${slug}&locale=${locale}&populate[locations][fields][0]=name&populate[locations][fields][1]=slug&populate[locations][fields][2]=description&status=published`,
            { next: { revalidate: 60 } },
        );
        if (!res.ok) return null;
        const json = await res.json();
        const item: StrapiSubcontractedItem | undefined = json?.data?.[0];
        if (!item) return null;
        return {
            id: item.id,
            documentId: item.documentId,
            title: item.title ?? "",
            slug: item.slug ?? "",
            locations: item.locations ?? [],
            deadline: item.deadline ?? null,
            experience: item.experience ?? null,
            details: item.details ?? null,
        };
    } catch {
        return null;
    }
}
