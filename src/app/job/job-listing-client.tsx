"use client";

import { useState, useRef, useMemo } from "react";
import type { Job, JobLocation } from "@/services/job.service";

function MapPinIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM224 320C206.3 320 192 334.3 192 352L192 416C192 433.7 206.3 448 224 448L288 448C305.7 448 320 433.7 320 416L320 352C320 334.3 305.7 320 288 320L224 320z" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 19 19" fill="none" className="w-[16px] h-[16px] shrink-0 fill-current">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.04167 0C3.15575 0 0 3.15575 0 7.04167C0 10.9276 3.15575 14.0833 7.04167 14.0833C10.9276 14.0833 14.0833 10.9276 14.0833 7.04167C14.0833 3.15575 10.9276 0 7.04167 0ZM7.04167 1.08333C10.3307 1.08333 13 3.75267 13 7.04167C13 10.3307 10.3307 13 7.04167 13C3.75267 13 1.08333 10.3307 1.08333 7.04167C1.08333 3.75267 3.75267 1.08333 7.04167 1.08333Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2585 17.4915L12.0196 11.2537C11.9174 11.155 11.7806 11.1004 11.6386 11.1016C11.4965 11.1029 11.3607 11.1598 11.2603 11.2603C11.1598 11.3607 11.1029 11.4965 11.1016 11.6386C11.1004 11.7806 11.155 11.9174 11.2537 12.0196L17.4915 18.2585C17.5955 18.3481 17.7295 18.3952 17.8667 18.3901C18.0039 18.385 18.1341 18.3282 18.2312 18.2312C18.3282 18.1341 18.385 18.0039 18.3901 17.8667C18.3952 17.7295 18.3481 17.5955 18.2585 17.4915Z"
            />
        </svg>
    );
}

type Props = {
    jobs: Job[];
    locations: JobLocation[];
};

export default function JobListingClient({ jobs, locations }: Props) {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleSearch(value: string) {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setQuery(value), 300);
    }

    const filtered = useMemo(() => {
        return jobs.filter((job) => {
            const matchesTitle = query === "" || job.title.toLowerCase().includes(query.toLowerCase());
            const matchesLocation = locationFilter === "" || (job.locations ?? []).some((l) => l.slug === locationFilter);
            return matchesTitle && matchesLocation;
        });
    }, [jobs, query, locationFilter]);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sah-gray-2 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by job title..."
                        className="w-full h-[48px] pl-10 pr-4 rounded-[8px] border border-sah-light-3 bg-white text-[15px] text-sah-dark-2 placeholder:text-sah-gray-2 outline-none focus:border-sah-red transition-colors duration-200"
                    />
                </div>

                {/* Location select */}
                <div className="relative sm:w-[220px]">
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full h-[48px] pl-4 pr-8 rounded-[8px] border border-sah-light-3 bg-white text-[15px] text-sah-dark-2 outline-none focus:border-sah-red appearance-none cursor-pointer transition-colors duration-200"
                    >
                        <option value="">All Locations</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.slug}>
                                {loc.name}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sah-gray-2">
                        <svg viewBox="0 0 11 6" className="w-[10px] fill-current">
                            <path d="M9.21967 0.21967C9.51256 -0.0732233 9.98732 -0.0732233 10.2802 0.21967C10.5731 0.512563 10.5731 0.987324 10.2802 1.28022L5.78022 5.78022C5.48732 6.07311 5.01256 6.07311 4.71967 5.78022L0.21967 1.28022C-0.0732233 0.987324 -0.0732233 0.512563 0.21967 0.21967C0.512563 -0.0732233 0.987324 -0.0732233 1.28022 0.21967L5.24994 4.1894L9.21967 0.21967Z" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Results count */}
            <p className="text-[14px] text-sah-gray-2 font-medium mb-5">
                {filtered.length} {filtered.length === 1 ? "position" : "positions"} found
            </p>

            {/* Cards */}
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-[18px] font-medium text-sah-gray-2">No positions match your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((job) => (
                        <a
                            key={job.id}
                            href={`/job/${job.slug}`}
                            className="group flex flex-col gap-4 bg-white border border-sah-light-3 hover:border-sah-red rounded-[10px] p-6 transition-all duration-300 hover:shadow-md"
                        >
                            {/* Title */}
                            <div>
                                <h3 className="text-[18px] font-semibold text-sah-red leading-snug group-hover:underline">{job.title}</h3>
                                {job.employment_status && <p className="text-[14px] font-medium text-sah-dark-2 mt-1">{job.employment_status}</p>}
                            </div>

                            {/* Location */}
                            {job.locations && job.locations.length > 0 && (
                                <div className="flex items-center gap-2 text-sah-gray-2">
                                    <MapPinIcon />
                                    <span className="text-[14px] font-medium">{job.locations.map((l) => l.name).join(", ")}</span>
                                </div>
                            )}

                            {/* Experience + Deadline */}
                            <div className="flex items-center justify-between gap-4 pt-2 border-t border-sah-light-3 mt-auto">
                                {job.experience ? (
                                    <div className="flex items-center gap-2 text-sah-gray-2">
                                        <BriefcaseIcon />
                                        <span className="text-[13px] font-medium">{job.experience}</span>
                                    </div>
                                ) : (
                                    <span />
                                )}
                                {job.deadline && (
                                    <div className="flex items-center gap-2 text-sah-gray-2">
                                        <CalendarIcon />
                                        <span className="text-[13px] font-medium">{new Date(job.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
