"use client";

import NewsCard from "@/components/ui/news-card";
import type { NewsPost } from "@/services/news.service";
import { useEffect, useRef, useState } from "react";

const ITEMS_PER_PAGE = 6;

type NewsListProps = {
    posts: NewsPost[];
    categories: string[];
};

export default function NewsList({ posts, categories }: NewsListProps) {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [scrollTrigger, setScrollTrigger] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setDebouncedSearch(search), 300);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [search]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        setCurrentPage(1);
        setScrollTrigger((n) => n + 1);
    }, [debouncedSearch, activeCategories]);

    useEffect(() => {
        if (scrollTrigger === 0) return;
        const id = setTimeout(() => {
            if (sectionRef.current) {
                window.scrollTo({ top: sectionRef.current.offsetTop - 200, behavior: "smooth" });
            }
        }, 50);
        return () => clearTimeout(id);
    }, [scrollTrigger]);

    function toggleCategory(category: string) {
        setActiveCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

    function goToPage(page: number) {
        setCurrentPage(page);
        setScrollTrigger((n) => n + 1);
    }

    const filteredPosts = posts
        .filter((post) =>
            activeCategories.length === 0 ||
            activeCategories.some((active) => post.category.includes(active))
        )
        .filter((post) =>
            debouncedSearch.trim() === "" ||
            post.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
        );

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
    const pagedPosts = filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    function getVisiblePages(): (number | "...")[] {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 2) return [1, 2, 3, "..."];
        if (currentPage >= totalPages - 1) return ["...", totalPages - 2, totalPages - 1, totalPages];
        return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
    }

    return (
        <>
            {categories.length > 0 && (
                <div className="container flex gap-3 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className={`px-4 py-2 rounded-full border text-[14px] transition-colors ${
                                activeCategories.includes(category)
                                    ? "bg-sah-red border-sah-red text-white"
                                    : "border-sah-light-3 text-sah-dark"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <div className="container mt-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full border border-sah-light-3 rounded-lg px-4 py-2 text-sah-dark text-[14px] outline-none"
                />
            </div>

            <div ref={sectionRef} className="container pt-[140px] pb-[140px] border-x border-sah-light-3">
                {filteredPosts.length === 0 ? (
                    <div className="flex items-center justify-center mt-[50px] mb-[140px]">
                        <p className="text-sah-dark text-[18px]">No news posts found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-[30px] mt-[50px] mb-[80px]">
                            {pagedPosts.map((post, index) => (
                                <NewsCard
                                    key={index}
                                    className="rounded-[12px]"
                                    titleParam={{
                                        className: "p-0 md:text-[24px]",
                                        title: post.title
                                    }}
                                    metaParam={{
                                        date: post.date,
                                        category: post.category.join(", ")
                                    }}
                                    overlayParam={{
                                        className: "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                                    }}
                                    imageParam={{
                                        className: "h-[400px]",
                                        src: post.image,
                                    }}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-[60px]">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => goToPage(currentPage - 1)}
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
                                            onClick={() => goToPage(page)}
                                            className={`size-[38px] rounded-[8px] font-inter text-[12px] font-bold transition-colors cursor-pointer ${currentPage === page ? "border border-sah-red text-sah-red" : "text-sah-dark hover:text-sah-red"}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => goToPage(currentPage + 1)}
                                    className="px-5 py-2 rounded-[8px] bg-sah-red font-inter text-[14px] font-bold text-sah-white hover:bg-sah-red/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
