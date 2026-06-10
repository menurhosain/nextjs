"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function SearchIcon() {
    return (
        <svg viewBox="0 0 19 19" fill="none" className="w-[16px] h-[16px] shrink-0 fill-current">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.04167 0C3.15575 0 0 3.15575 0 7.04167C0 10.9276 3.15575 14.0833 7.04167 14.0833C10.9276 14.0833 14.0833 10.9276 14.0833 7.04167C14.0833 3.15575 10.9276 0 7.04167 0ZM7.04167 1.08333C10.3307 1.08333 13 3.75267 13 7.04167C13 10.3307 10.3307 13 7.04167 13C3.75267 13 1.08333 10.3307 1.08333 7.04167C1.08333 3.75267 3.75267 1.08333 7.04167 1.08333Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M18.2585 17.4915L12.0196 11.2537C11.9174 11.155 11.7806 11.1004 11.6386 11.1016C11.4965 11.1029 11.3607 11.1598 11.2603 11.2603C11.1598 11.3607 11.1029 11.4965 11.1016 11.6386C11.1004 11.7806 11.155 11.9174 11.2537 12.0196L17.4915 18.2585C17.5955 18.3481 17.7295 18.3952 17.8667 18.3901C18.0039 18.385 18.1341 18.3282 18.2312 18.2312C18.3282 18.1341 18.385 18.0039 18.3901 17.8667C18.3952 17.7295 18.3481 17.5955 18.2585 17.4915Z" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg className="w-[15px] h-[15px] shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19.188c2.005-1.834 3.495-3.49 4.468-4.964.974-1.476 1.46-2.825 1.46-4.048 0-1.789-.572-3.253-1.717-4.394-1.144-1.14-2.548-1.71-4.211-1.71-1.664 0-3.067.57-4.212 1.71-1.144 1.14-1.716 2.605-1.716 4.394 0 1.223.486 2.571 1.46 4.045.973 1.473 2.462 3.129 4.468 4.967zm-.002 2.304c-.248 0-.496-.043-.743-.13a1.963 1.963 0 01-.664-.394 40.642 40.642 0 01-2.935-2.949c-.849-.954-1.558-1.88-2.126-2.78-.568-.9-1-1.77-1.293-2.614-.294-.843-.44-1.66-.44-2.45 0-2.554.824-4.589 2.473-6.105C7.92 2.555 9.83 1.797 12 1.797c2.17 0 4.08.758 5.73 2.273 1.648 1.516 2.473 3.551 2.473 6.106 0 .79-.147 1.606-.44 2.45-.294.842-.725 1.713-1.293 2.613-.569.9-1.277 1.826-2.127 2.78a40.646 40.646 0 01-2.934 2.95 1.967 1.967 0 01-.666.392 2.234 2.234 0 01-.745.131zM12 12.06c.57 0 1.056-.201 1.457-.603.402-.401.603-.887.603-1.457 0-.57-.201-1.056-.603-1.457A1.984 1.984 0 0012 7.94c-.57 0-1.056.201-1.457.603A1.985 1.985 0 009.94 10c0 .57.201 1.056.603 1.457.401.402.887.603 1.457.603z" />
        </svg>
    );
}

type Props = { searchSuggestions: string[]; locationSuggestions: string[] };

export default function JobSearchBar({ searchSuggestions, locationSuggestions }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const search_params = useSearchParams();

    const [job_query, set_job_query] = useState(search_params.get("q") ?? "");
    const [show_suggestions, set_show_suggestions] = useState(false);
    const [location_query, set_location_query] = useState(search_params.get("location") ?? "");
    const [show_location_suggestions, set_show_location_suggestions] = useState(false);

    const matches_word_start = (suggestion: string, query: string) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        const text = suggestion.toLowerCase();
        return text.startsWith(q) || text.split(/[\s,]+/).some((word) => word.startsWith(q));
    };

    const filtered_search_suggestions = searchSuggestions.filter((s) => matches_word_start(s, job_query));
    const filtered_location_suggestions = locationSuggestions.filter((s) => matches_word_start(s, location_query));

    const update_url = (q: string, location: string) => {
        const params = new URLSearchParams(search_params.toString());
        if (q.trim()) params.set("q", q.trim());
        else params.delete("q");
        if (location.trim()) params.set("location", location.trim());
        else params.delete("location");
        const query_string = params.toString();
        router.replace(query_string ? `${pathname}?${query_string}` : pathname, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 rounded-[16px] md:rounded-full border border-sah-light-1 bg-sah-white px-4 py-3 md:py-2 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="relative flex flex-1 items-center gap-3 md:ps-2">
                <SearchIcon />
                <input
                    type="text"
                    value={job_query}
                    onChange={(e) => set_job_query(e.target.value)}
                    onFocus={() => set_show_suggestions(true)}
                    onBlur={() => set_show_suggestions(false)}
                    placeholder="Job title, keywords, or company"
                    className="w-full bg-transparent text-[16px] text-sah-dark-2 placeholder:text-sah-gray-2 outline-none"
                />

                {show_suggestions && filtered_search_suggestions.length > 0 && (
                    <div className="absolute start-0 top-full z-50 mt-4 w-full rounded-[12px] border border-sah-light-3 bg-sah-white py-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                        <p className="px-5 pb-3 text-[14px] font-bold text-sah-dark-2">Search suggestions</p>
                        <ul className="max-h-[320px] overflow-y-auto no-scrollbar">
                            {filtered_search_suggestions.map((suggestion) => (
                                <li key={suggestion}>
                                    <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            set_job_query(suggestion);
                                            set_show_suggestions(false);
                                        }}
                                        className="flex w-full items-center gap-4 px-5 py-2.5 text-start text-[15px] text-sah-dark-2 hover:bg-sah-light-4 sah-transition"
                                    >
                                        <span className="text-sah-gray-2"><SearchIcon /></span>
                                        {suggestion}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="hidden md:block h-[32px] w-px bg-sah-light-2 mx-4" />
            <div className="md:hidden h-px w-full bg-sah-light-2" />

            <div className="relative flex flex-1 items-center gap-3">
                <PinIcon />
                <input
                    type="text"
                    value={location_query}
                    onChange={(e) => set_location_query(e.target.value)}
                    onFocus={() => set_show_location_suggestions(true)}
                    onBlur={() => set_show_location_suggestions(false)}
                    placeholder='City, state, zip code, or "remote"'
                    className="w-full bg-transparent text-[16px] text-sah-dark-2 placeholder:text-sah-gray-2 outline-none"
                />

                {show_location_suggestions && filtered_location_suggestions.length > 0 && (
                    <div className="absolute start-0 top-full z-50 mt-4 w-full rounded-[12px] border border-sah-light-3 bg-sah-white py-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                        <p className="px-5 pb-3 text-[14px] font-bold text-sah-dark-2">Location suggestions</p>
                        <ul className="max-h-[320px] overflow-y-auto no-scrollbar">
                            {filtered_location_suggestions.map((suggestion) => (
                                <li key={suggestion}>
                                    <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            set_location_query(suggestion);
                                            set_show_location_suggestions(false);
                                        }}
                                        className="flex w-full items-center gap-4 px-5 py-2.5 text-start text-[15px] text-sah-dark-2 hover:bg-sah-light-4 sah-transition"
                                    >
                                        <span className="text-sah-gray-2"><PinIcon /></span>
                                        {suggestion}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => update_url(job_query, location_query)}
                className="shrink-0 rounded-full bg-sah-red px-8 py-2.5 text-[16px] font-semibold text-sah-white sah-transition hover:bg-sah-coral md:ms-4"
            >
                Search
            </button>
        </div>
    );
}
