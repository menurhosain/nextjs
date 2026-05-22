import { BASE_URL } from "@/lib/constant";

export type Stylesheet = {
    id: number;
    name: string | null;
    href: string | null;
    content: string | null;
};

export async function get_stylesheets(): Promise<Stylesheet[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/stylesheets`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}
