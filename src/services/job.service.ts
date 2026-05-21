import { BASE_URL } from "@/lib/constant";

export type Job = {
    id: number;
    documentId: string;
    title: string;
    job_type: string | null;
    link: string | null;
    order: number;
};

type StrapiJobItem = {
    id: number;
    documentId: string;
    title?: string;
    job_type?: string | null;
    link?: string | null;
    order?: number;
};

export async function get_jobs(locale = "en"): Promise<Job[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/api/jobs?locale=${locale}&sort=order:asc&pagination[limit]=100&status=published`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return [];
        const json = await res.json();
        const items: StrapiJobItem[] = json?.data ?? [];
        return items.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title ?? "",
            job_type: item.job_type ?? null,
            link: item.link ?? null,
            order: item.order ?? 0,
        }));
    } catch {
        return [];
    }
}
