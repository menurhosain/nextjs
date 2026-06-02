import type { Metadata } from "next";
import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { DownLongArrow } from "@/components/ui/svgs";
import { search } from "@/services/search.service";

export const metadata: Metadata = { title: "Search" };

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const locale = (await headers()).get("x-locale") ?? "en";
    const results = q ? await search(q, locale) : [];

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center gap-4">
                        <Banner_Title subtitle="Search Results" title={q ?? "Search"} />
                        {q && (
                            <p className="font-inter text-[15px] text-sah-white">
                                {results.length} Results for <span className="font-semibold text-sah-white">{q}</span>
                            </p>
                        )}
                    </div>
                </Left>

                <Right>
                    <div />
                </Right>
            </Banner>

            <div className="container py-16 px-4">
                {results.length === 0 ? (
                    <p className="text-center text-sah-dark font-inter text-[18px]">No results found{q ? ` for "${q}"` : ""}.</p>
                ) : (
                    <div className="flex flex-col">
                        {results.map((item) => (
                            <a key={item.slug} href={item.link} className="group border-b border-sah-light-3 py-10 pr-8 flex flex-col gap-4">
                                <span className="font-inter text-[12px] font-bold uppercase tracking-widest text-sah-red">{item.type === "news" ? "News" : "Projects"}</span>
                                <h2 className="font-geist text-[32px] md:text-[40px] font-normal text-sah-black leading-tight transition-colors duration-300 group-hover:text-sah-red">{item.title}</h2>
                                <p className="font-inter text-[16px] text-sah-dark leading-[1.7]">{item.excerpt}</p>
                                <span className="flex items-center gap-3 font-inter text-[12px] font-bold uppercase tracking-widest text-sah-black mt-2">
                                    Read More
                                    <DownLongArrow class_name="!fill-sah-red -rotate-90 !w-[14px] !h-[14px] transition-transform duration-300 group-hover:translate-x-[10px]" />
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
