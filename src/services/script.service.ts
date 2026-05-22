import { BASE_URL } from "@/lib/constant";

export type Script = {
    id: number;
    name: string | null;
    script: string | null;
    place: "Header" | "Footer" | null;
};

export async function get_scripts(): Promise<Script[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/scripts`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}
