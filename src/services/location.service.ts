import { BASE_URL } from "@/lib/constant";

export type Location = {
    id: number;
    documentId: string;
    name: string;
    slug: string;
};

type StrapiLocationItem = {
    id: number;
    documentId: string;
    name?: string;
    slug?: string;
};

export async function get_locations(locale = "en"): Promise<Location[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/locations?locale=${locale}&fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        const items: StrapiLocationItem[] = json?.data ?? [];
        return items.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            name: item.name ?? "",
            slug: item.slug ?? "",
        }));
    } catch {
        return [];
    }
}
