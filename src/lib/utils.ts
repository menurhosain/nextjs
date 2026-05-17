import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BASE_URL } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiMediaUrl(media?: string | { url: string } | { url: string }[] | null): string {
    let url: string | undefined;

    if (!media) return "";
    if (typeof media === "string") url = media;
    else if (Array.isArray(media)) url = media[0]?.url;
    else url = media.url;

    if (!url) return "";
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}