"use client";

import { useState } from "react";
import { ProjectArrowLeft, ProjectArrowRight } from "@/components/ui/svgs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { NewsItemDetail, NewsItem } from "@/services/news.service";

/* ─── Share Buttons ─────────────────────────────────────────────────────── */
function ShareButtons({ title, share_label }: { title: string; share_label?: string | null }) {
    const [copied, setCopied] = useState(false);
    const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");

    const share = (platform: string) => {
        const url  = encodeURIComponent(getUrl());
        const text = encodeURIComponent(title);
        const links: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            whatsapp: `https://wa.me/?text=${text}%20${url}`,
        };
        window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
    };

    const copyLink = () => {
        const url = getUrl();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        } else {
            const el = document.createElement("textarea");
            el.value = url;
            el.style.position = "fixed";
            el.style.opacity = "0";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const btn = "w-9 h-9 flex items-center justify-center border border-sah-light-3 text-sah-gray-2 hover:bg-sah-red hover:border-sah-red hover:text-white transition-all duration-200 cursor-pointer";

    return (
        <div className="border border-sah-light-3 p-6">
            <p className="text-[20px] font-semibold capitalize text-sah-dark-2 mb-[5px]">{share_label || "Share"}</p>
            <div className="w-[50px] h-[3px] bg-sah-red mb-5"></div>
            <div className="flex flex-wrap gap-2">
                <button aria-label="Share on Facebook" onClick={() => share("facebook")} className={btn}>
                    <svg viewBox="0 0 24 24"><path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path></svg>
                </button>
                <button aria-label="Share on Twitter" onClick={() => share("twitter")} className={btn}>
                    <svg viewBox="0 0 24 24"><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path></svg>
                </button>
                <button aria-label="Share on LinkedIn" onClick={() => share("linkedin")} className={btn}>
                    <svg viewBox="0 0 24 24"><path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"></path></svg>
                </button>
                <button aria-label="Share on WhatsApp" onClick={() => share("whatsapp")} className={btn}>
                    <svg viewBox="0 0 24 24"><path d="M7.25361 18.4944L7.97834 18.917C9.18909 19.623 10.5651 20 12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 13.4363 4.37821 14.8128 5.08466 16.0238L5.50704 16.7478L4.85355 19.1494L7.25361 18.4944ZM2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22ZM8.39232 7.30833C8.5262 7.29892 8.66053 7.29748 8.79459 7.30402C8.84875 7.30758 8.90265 7.31384 8.95659 7.32007C9.11585 7.33846 9.29098 7.43545 9.34986 7.56894C9.64818 8.24536 9.93764 8.92565 10.2182 9.60963C10.2801 9.76062 10.2428 9.95633 10.125 10.1457C10.0652 10.2428 9.97128 10.379 9.86248 10.5183C9.74939 10.663 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.40738 11.0473 9.44455 11.1944C9.45903 11.25 9.50521 11.331 9.54708 11.3991C9.57027 11.4368 9.5918 11.4705 9.60577 11.4938C9.86169 11.9211 10.2057 12.3543 10.6259 12.7616C10.7463 12.8783 10.8631 12.9974 10.9887 13.108C11.457 13.5209 11.9868 13.8583 12.559 14.1082L12.5641 14.1105C12.6486 14.1469 12.692 14.1668 12.8157 14.2193C12.8781 14.2457 12.9419 14.2685 13.0074 14.2858C13.0311 14.292 13.0554 14.2955 13.0798 14.2972C13.2415 14.3069 13.335 14.2032 13.3749 14.1555C14.0984 13.279 14.1646 13.2218 14.1696 13.2222V13.2238C14.2647 13.1236 14.4142 13.0888 14.5476 13.097C14.6085 13.1007 14.6691 13.1124 14.7245 13.1377C15.2563 13.3803 16.1258 13.7587 16.1258 13.7587L16.7073 14.0201C16.8047 14.0671 16.8936 14.1778 16.8979 14.2854C16.9005 14.3523 16.9077 14.4603 16.8838 14.6579C16.8525 14.9166 16.7738 15.2281 16.6956 15.3913C16.6406 15.5058 16.5694 15.6074 16.4866 15.6934C16.3743 15.81 16.2909 15.8808 16.1559 15.9814C16.0737 16.0426 16.0311 16.0714 16.0311 16.0714C15.8922 16.159 15.8139 16.2028 15.6484 16.2909C15.391 16.428 15.1066 16.5068 14.8153 16.5218C14.6296 16.5313 14.4444 16.5447 14.2589 16.5347C14.2507 16.5342 13.6907 16.4482 13.6907 16.4482C12.2688 16.0742 10.9538 15.3736 9.85034 14.402C9.62473 14.2034 9.4155 13.9885 9.20194 13.7759C8.31288 12.8908 7.63982 11.9364 7.23169 11.0336C7.03043 10.5884 6.90299 10.1116 6.90098 9.62098C6.89729 9.01405 7.09599 8.4232 7.46569 7.94186C7.53857 7.84697 7.60774 7.74855 7.72709 7.63586C7.85348 7.51651 7.93392 7.45244 8.02057 7.40811C8.13607 7.34902 8.26293 7.31742 8.39232 7.30833Z"></path></svg>
                </button>
                <button aria-label="Copy link" onClick={copyLink} className={`${btn} ${copied ? "!bg-sah-red !border-sah-red !text-white" : ""}`}>
                    {copied ? (
                        <svg viewBox="0 0 24 24"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>
                    ) : (
                        <svg viewBox="0 0 24 24"><path d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path></svg>
                    )}
                </button>
            </div>
        </div>
    );
}

/* ─── Page View ─────────────────────────────────────────────────────────── */
type PageViewProps = {
    news: NewsItemDetail;
    relatedPosts?: NewsItem[];
    related_posts_label?: string | null;
    share_label?: string | null;
    previous_article_label?: string | null;
    next_article_label?: string | null;
};

export default function NewsItemView({
    news,
    relatedPosts = [],
    related_posts_label,
    share_label,
    previous_article_label,
    next_article_label,
}: PageViewProps) {
    return (
        <>
            {/* ── Hero banner ── */}
            <div className="relative w-full min-h-[65vh] lg:min-h-[80vh] flex items-end overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    {news.featuredImage ? (
                        <img src={news.featuredImage} alt={news.title} className="w-full h-full object-cover" />
                    ) : (
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                            <source src="/home-hero.mp4" type="video/mp4" />
                        </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
                </div>

                {/* Overlay content */}
                <div className="relative z-10 w-full section-padding">
                    <div className="container max-[640px]:!px-0 pb-[60px] pt-[140px]">

                        {/* Tags */}
                        {news.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {news.tags.map((tag, index) => (
                                    <span key={index}
                                        className="bg-sah-red text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="font-geist font-bold text-white text-[30px] sm:text-[40px] lg:text-[54px] xl:text-[62px] leading-[1.1] max-w-[900px] mb-6">
                            {news.title}
                        </h1>

                        {/* Author + Date */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/65 text-[14px]">
                            {news.author && (
                                <span>By <span className="text-white font-semibold">{news.author}</span></span>
                            )}
                            {news.author && news.date && (
                                <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
                            )}
                            {news.date && <span>{news.date}</span>}
                        </div>

                    </div>
                </div>
            </div>

            {/* ── Article body ── */}
            <section className="section-padding">
                <div className="container mx-auto border-x border-sah-light-3 max-[1024px]:!px-4 pt-[80px] pb-[80px] lg:pt-[150px] lg:pb-[150px] max-[1280px]:!px-4">

                    <div className="flex flex-col lg:flex-row gap-[30px] 2xl:gap-[80px] items-start">

                        {/* ── Main content ── */}
                        <div className="min-w-0 flex-1">
                            {/* Excerpt pull-quote */}
                            {news.excerpt && (
                                <p className="text-[16px] xl:text-[19px] leading-relaxed text-sah-gray-2 font-medium border-l-[3px] border-sah-red pl-5 mb-10">
                                    {news.excerpt}
                                </p>
                            )}

                            <div className="rich-content">
                                <BlocksRenderer content={news.content} />
                            </div>
                        </div>

                        {/* ── Sidebar ── */}
                        <aside className="flex flex-col gap-6 lg:sticky lg:top-[100px] w-full lg:w-[360px] xl:w-[400px] shrink-0">

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="border border-sah-light-3 p-6">
                                    <p className="text-[20px] font-semibold capitalize text-sah-dark-2 mb-[5px]">{related_posts_label || "Related Posts"}</p>
                                    <div className="w-[50px] h-[3px] bg-sah-red mb-5"></div>
                                    <div className="flex flex-col gap-5">
                                        {relatedPosts.map((post) => (
                                            <a key={post.documentId} href={`/news/${post.slug}`} className="flex gap-3 group">
                                                {post.image && (
                                                    <div className="w-[72px] h-[72px] shrink-0 overflow-hidden">
                                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red transition-colors leading-snug line-clamp-2">{post.title}</p>
                                                    {post.date && <p className="text-[11px] text-sah-gray-2 mt-1">{post.date}</p>}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <ShareButtons title={news.title} share_label={share_label} />

                        </aside>
                    </div>

                    {/* ── Prev / Next ── */}
                    <div className="flex sm:flex-row flex-col items-center justify-between border-t border-b border-sah-light-3 pt-[18px] pb-[18px] gap-4 mt-16">
                        {news.prev ? (
                            <a href={`/news/${news.prev.slug}`} className="flex items-center gap-3 flex-1 transition-all group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowLeft />
                                </span>
                                <div>
                                    <p className="text-[13px] font-semibold uppercase tracking-wide text-sah-gray-2 !m-0">{previous_article_label || "Previous Article"}</p>
                                    <p className="text-[15px] font-semibold text-sah-dark-2 group-hover:text-sah-red !m-0 transition-all line-clamp-1">{news.prev.title}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {news.prev && news.next && <div className="w-px h-10 bg-sah-light-3 hidden sm:block" />}

                        {news.next ? (
                            <a href={`/news/${news.next.slug}`} className="flex items-center flex-row-reverse gap-3 flex-1 text-right group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowRight />
                                </span>
                                <div>
                                    <p className="text-[13px] font-semibold uppercase tracking-wide text-sah-gray-2 !m-0">{next_article_label || "Next Article"}</p>
                                    <p className="text-[15px] font-semibold text-sah-dark-2 group-hover:text-sah-red !m-0 transition-all line-clamp-1">{news.next.title}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
}
