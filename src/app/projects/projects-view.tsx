"use client";

import { useState, useRef, useEffect } from "react";
import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { Cross, DownArrow, SearchIcon, SettingIcon } from "@/components/ui/svgs";
import { ProjectCardSmall } from "@/components/ui/project-card-small";
import type { Project, ProjectTag } from "@/services/project.service";

export default function ProjectsView({ projects, tags }: { projects: Project[]; tags: ProjectTag[] }) {
    const [inputValue, setInputValue] = useState("");
    const [query, setQuery] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [scrollTrigger, setScrollTrigger] = useState(0);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(
        () => () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        },
        [],
    );

    useEffect(() => {
        setCurrentPage(1);
        setScrollTrigger((n) => n + 1);
    }, [query, selectedFilters]);

    useEffect(() => {
        if (scrollTrigger === 0) return;
        const id = setTimeout(() => {
            if (sectionRef.current) {
                window.scrollTo({ top: sectionRef.current.offsetTop - 200, behavior: "smooth" });
            }
        }, 50);
        return () => clearTimeout(id);
    }, [scrollTrigger]);

    function toggleAccordion(key: string) {
        setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function toggleFilterOption(key: string, option: string) {
        setSelectedFilters((prev) => {
            const current = prev[key] ?? [];
            return {
                ...prev,
                [key]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
            };
        });
    }

    function handleSearch(value: string) {
        setInputValue(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setQuery(value), 300);
    }

    function submitSearch() {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setQuery(inputValue);
    }

    function clear_filters() {
        setInputValue("");
        setQuery("");
        setSelectedFilters({});
    }

    const filteredProjects = projects
        .filter((p) => !query.trim() || p.title.toLowerCase().includes(query.trim().toLowerCase()))
        .filter((p) => {
            const fieldMap: Record<string, string> = { scope: p.scope, industry: p.industry, location: p.location };
            return Object.entries(selectedFilters).every(([key, options]) => {
                if (options.length === 0) return true;
                const value = fieldMap[key] ?? "";
                return options.some((o) => value.includes(o));
            });
        });

    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
    const pagedProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    function getVisiblePages(): (number | "...")[] {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 2) return [1, 2, 3, "..."];
        if (currentPage >= totalPages - 1) return ["...", totalPages - 2, totalPages - 1, totalPages];
        return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
    }

    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Banner.Left class_name="flex flex-col justify-center">
                    <div className="flex flex-col justify-center mt-[188px]">
                        <Banner_Title subtitle="Explore Our Recent Projects" title=<>Showcasing our latest construction projects and achievements</> />
                    </div>
                    <div className="flex gap-4 self-start w-[90%] py-[70px] relative  mt-auto">
                        <div className="absolute bg-sah-white/20 top-0 h-[1px] w-[120vw] ml-[calc(50%-50vw)]"></div>

                        {/* Search */}
                        <div className="flex-1 flex items-center gap-[20px] justify-between bg-sah-gray-5 px-6 transition-colors duration-200 pr-[14px]">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                                className="text-sah-white h-[65px] flex-1 border-none outline-none font-inter text-[16px] font-medium placeholder:text-sah-white bg-transparent"
                                placeholder="Find a project"
                            />
                            <button type="button" onClick={submitSearch} className="size-[40px] flex items-center justify-center cursor-pointer">
                                <SearchIcon class_name="!size-[18px]" />
                            </button>
                        </div>

                        {/* Filter */}
                        <div
                            onClick={() => setDrawerOpen(true)}
                            className="flex-1 flex items-center gap-[20px] justify-between bg-sah-gray-5 px-6 cursor-pointer transition-colors duration-200 pr-[14px]"
                        >
                            <span className="text-sah-white flex items-center h-[65px] flex-1 border-none outline-none font-inter text-[16px] font-medium placeholder:text-sah-white">
                                Refined Your Search
                            </span>
                            <div className="size-[40px] flex items-center justify-center">
                                <SettingIcon class_name="!size-[18px]" />
                            </div>
                        </div>
                    </div>
                </Banner.Left>

                <Banner.Right>
                    <div>Hello</div>
                </Banner.Right>
            </Banner>

            {/* Drawer overlay */}
            <div className={`fixed inset-0 z-[9999] flex justify-end transition-all duration-300 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div onClick={() => setDrawerOpen(false)} className={`flex-1 bg-black/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`} />
                <div className={`w-[350px] h-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                    {/* Close button row */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-sah-light-3">
                        <span className="text-[16px] font-inter font-medium">Refine your search</span>
                        <button type="button" onClick={() => setDrawerOpen(false)} className="size-7 flex items-center justify-end hover:opacity-60 transition-opacity">
                            <Cross class_name="cursor-pointer !size-[24px]" />
                        </button>
                    </div>

                    {/* Search bar */}
                    <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-200">
                        <SearchIcon class_name="!size-[18px] shrink-0 text-sah-dark !fill-sah-red" />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                            placeholder="Find A Project"
                            className="flex-1 min-w-0 outline-none font-inter text-[14px] text-sah-dark placeholder:text-sah-dark/50"
                        />
                    </div>

                    {/* Clear filters */}
                    <div className="flex justify-end px-6 py-3 border-b border-gray-200 ">
                        <button onClick={clear_filters} type="button" className="font-inter cursor-pointer text-[13px] text-sah-dark underline underline-offset-2">
                            Clear All Filters
                        </button>
                    </div>

                    {/* Accordions */}
                    {tags.map(({ key, label, options }) => (
                        <div key={key} className="border-b border-gray-200">
                            <button type="button" onClick={() => toggleAccordion(key)} className="w-full flex items-center justify-between px-6 py-5 cursor-pointer">
                                <span className="font-inter text-[13px] font-medium tracking-widest text-sah-dark">{label}</span>
                                <DownArrow class_name={`transition-transform duration-200 !fill-sah-red !size-[14px] ${openAccordions[key] ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`grid transition-all duration-300 ease-in-out ${openAccordions[key] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="overflow-hidden">
                                    <div className="px-6 pb-5 flex flex-wrap gap-2">
                                        {options.map((option) => {
                                            const selected = selectedFilters[key]?.includes(option);
                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => toggleFilterOption(key, option)}
                                                    className={`px-4 py-2 rounded-full border font-inter text-[13px] transition-colors duration-150 cursor-pointer select-none ${selected ? "bg-sah-red text-sah-white border-sah-red" : "bg-white text-sah-dark border-gray-300 hover:border-sah-dark"}`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Apply filters */}
                    <div className="mt-auto px-6 py-5 border-t border-gray-200">
                        <button
                            onClick={() => {
                                submitSearch();
                                setDrawerOpen(false);
                            }}
                            type="button"
                            className="w-full bg-sah-red text-sah-white font-inter text-[14px] font-semibold py-4 cursor-pointer hover:opacity-90 transition-opacity"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            <section ref={sectionRef} className="section-padding bg-sah-light-4">
                <div className="container py-[140px] border-x border-sah-light-3">
                    {filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-[80px] gap-4">
                            <p className="font-geist text-[32px] font-medium text-sah-dark">No projects found.</p>
                            <p className="font-inter text-[16px] text-sah-dark/50">Try narrowing your search or adjusting the filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {pagedProjects.map((project) => (
                                <ProjectCardSmall key={project.title} {...project} />
                            ))}
                        </div>
                    )}

                    {filteredProjects.length > 0 && (
                        <div className="flex items-center justify-center gap-2 mt-[60px]">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => {
                                    setCurrentPage((p) => p - 1);
                                    setScrollTrigger((n) => n + 1);
                                }}
                                className="px-5 py-2 rounded-[8px] border border-sah-light-2 font-inter text-[14px] font-bold text-sah-dark hover:border-sah-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {getVisiblePages().map((page, i) =>
                                page === "..." ? (
                                    <span key={`ellipsis-${i}`} className="px-1 font-inter text-[14px] text-sah-dark">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => {
                                            setCurrentPage(page);
                                            setScrollTrigger((n) => n + 1);
                                        }}
                                        className={`size-[38px] rounded-[8px] font-inter text-[12px] font-bold transition-colors cursor-pointer ${currentPage === page ? "border border-sah-red text-sah-red" : "text-sah-dark hover:text-sah-red"}`}
                                    >
                                        {page}
                                    </button>
                                ),
                            )}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => {
                                    setCurrentPage((p) => p + 1);
                                    setScrollTrigger((n) => n + 1);
                                }}
                                className="px-5 py-2 rounded-[8px] bg-sah-red font-inter text-[14px] font-bold text-sah-white hover:bg-sah-red/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
