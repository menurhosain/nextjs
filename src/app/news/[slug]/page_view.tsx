"use client";

import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { ProjectArrowLeft, ProjectArrowRight } from "@/components/ui/svgs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { NewsItemDetail } from "@/services/news.service";

export default function NewsItemView({ news }: { news: NewsItemDetail }) {
    return (
        <>
            <Banner bg={news.featuredImage || "/home-hero.mp4"} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={news.date} title={news.title} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container mx-auto pt-[80px] lg:pt-[150px] lg:pb-[150px] pb-[80px] border-x border-sah-light-3 max-[1024px]:!px-4">

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-[14px] text-sah-gray-2 border-b border-sah-light-3 pb-6">
                        {news.author && (
                            <span>
                                By <span className="font-semibold text-sah-dark-2">{news.author}</span>
                            </span>
                        )}
                        {news.date && <span>{news.date}</span>}
                        {news.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {news.tags.map((tag) => (
                                    <a
                                        key={tag.documentId}
                                        href={`/news?tag=${tag.slug}`}
                                        className="bg-sah-red/10 text-sah-red px-3 py-0.5 text-[12px] font-medium uppercase tracking-wide hover:bg-sah-red hover:text-white transition-colors"
                                    >
                                        {tag.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Article body */}
                    <div className="rich-content max-w-[860px]">
                        <BlocksRenderer content={news.content} />
                    </div>

                    {/* Prev / Next */}
                    <div className="flex sm:flex-row flex-col items-center justify-between border-t border-b border-sah-light-3 pt-4.5 pb-4.5 gap-4 mt-11">
                        {news.prev ? (
                            <a href={`/news/${news.prev.slug}`} className="flex items-center gap-3 flex-1 transition-all group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowLeft />
                                </span>
                                <div>
                                    <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red !m-0 transition-all">Previous Article</p>
                                    <p className="text-[13px] text-sah-dark-2/60 !m-0">{news.prev.title}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {news.next ? (
                            <a href={`/news/${news.next.slug}`} className="flex items-center flex-row-reverse gap-3 flex-1 text-right group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowRight />
                                </span>
                                <div>
                                    <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red !m-0 transition-all">Next Article</p>
                                    <p className="text-[13px] text-sah-dark-2/60 !m-0">{news.next.title}</p>
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
