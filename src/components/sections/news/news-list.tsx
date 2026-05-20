"use client";

import NewsCard from "@/components/ui/news-card";
import type { NewsItem, NewsTag } from "@/services/news.service";
import { useEffect, useRef, useState } from "react";

type NewsListProps = {
    posts: NewsItem[];
    tags: NewsTag[];
    count?: number;
};

export default function NewsList({ posts, tags, count }: NewsListProps) {
    const ITEMS_PER_PAGE = count || 6;
    const [activeTags, setActiveTags] = useState<string[]>([]);
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
    }, [debouncedSearch, activeTags]);

    useEffect(() => {
        if (scrollTrigger === 0) return;
        const id = setTimeout(() => {
            if (sectionRef.current) {
                window.scrollTo({ top: sectionRef.current.offsetTop - 200, behavior: "smooth" });
            }
        }, 50);
        return () => clearTimeout(id);
    }, [scrollTrigger]);

    function toggleTag(tagName: string) {
        setActiveTags((prev) =>
            prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
        );
    }

    function goToPage(page: number) {
        setCurrentPage(page);
        setScrollTrigger((n) => n + 1);
    }

    const filteredPosts = posts
        .filter((post) =>
            activeTags.length === 0 ||
            activeTags.some((active) => post.tags.some((t) => t.name === active))
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
        <div ref={sectionRef} className="container pt-[140px] pb-[140px] border-x border-sah-light-3">
            <div className="flex mb-[60px] gap-[50px]">
                <div className="w-[500px] shrink-0 border-r border-sah-gray-4 pr-[50px]">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full border border-sah-light-3 rounded-[50px] px-4 py-2 text-sah-dark text-[14px] outline-none"
                    />
                </div>

                {tags.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                        {tags.map((tag) => (
                            <button
                                key={tag.documentId}
                                type="button"
                                onClick={() => toggleTag(tag.name)}
                                className={`px-4 py-2 rounded-full border text-[14px] cursor-pointer hover:bg-sah-red hover:text-white hover:border-sah-red sah-transition ${
                                    activeTags.includes(tag.name)
                                        ? "bg-sah-red border-sah-red text-white"
                                        : "border-sah-light-3 text-sah-dark"
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {filteredPosts.length === 0 ? (
                <div className="flex items-center justify-center">
                    <p className="text-sah-dark text-[18px]">No news posts found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-[30px]">
                        {pagedPosts.map((post) => (
                            <NewsCard
                                key={post.documentId}
                                href={`/news/${post.slug}`}
                                className="rounded-[12px]"
                                titleParam={{
                                    className: "p-0 md:text-[24px]",
                                    title: post.title,
                                }}
                                metaParam={{
                                    date: post.date,
                                    category: post.tags.map((t) => t.name).join(", "),
                                }}
                                overlayParam={{
                                    className: "bg-gradient-to-t from-black/85 via-black/40 to-transparent",
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
    );
}
