import { BASE_URL } from "@/lib/constant";

export type AutoSearchSuggestion = {
    id: number;
    documentId: string;
    search_query: string;
};

type StrapiAutoSearchSuggestionItem = {
    id: number;
    documentId: string;
    search_query?: string | null;
};

export async function get_auto_search_suggestions(locale = "en"): Promise<AutoSearchSuggestion[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/auto-search-suggestions?locale=${locale}&fields[0]=search_query&pagination[pageSize]=100&status=published`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        const items: StrapiAutoSearchSuggestionItem[] = json?.data ?? [];
        return items
            .filter((item) => !!item.search_query)
            .map((item) => ({
                id: item.id,
                documentId: item.documentId,
                search_query: item.search_query ?? "",
            }));
    } catch {
        return [];
    }
}
