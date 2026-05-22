import { BASE_URL } from "@/lib/constant";

export type Script = {
    id: number;
    name: string | null;
    src: string | null;
    content: string | null;
    strategy: "beforeInteractive" | "afterInteractive" | "lazyOnload" | null;
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
