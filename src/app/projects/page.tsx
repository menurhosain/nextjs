import type { Metadata } from "next";
import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_auto_search_suggestions } from "@/services/auto_search_suggestion.service";
import { get_locations } from "@/services/location.service";
import { get_projects_page_content } from "@/services/page_content.service";
import { get_subcontracteds } from "@/services/subcontracted.service";
import JobSearchBar from "./job-search-bar";
import SubcontractedListingClient from "./subcontracted-listing-client";

export const metadata: Metadata = { title: "Subcontracted Projects" };

export default async function SubcontractedProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string; location?: string }> }) {
    const locale = (await headers()).get("x-locale") ?? "en";
    const { q, location } = await searchParams;

    const [items, cms, all_locations, auto_suggestions] = await Promise.all([
        get_subcontracteds(locale, { q, location }),
        get_projects_page_content(locale),
        get_locations(locale),
        get_auto_search_suggestions(locale),
    ]);

    const content = {
        banner_subtitle: cms?.banner?.banner_label ?? "Explore Opportunities",
        banner_title: cms?.banner?.banner_title ?? "Projects",
        result_singular_label: cms?.result_singular_label ?? "project",
        result_plural_label: cms?.result_plural_label ?? "projects",
        result_found_label: cms?.result_found_label ?? "found",
        no_results_text: cms?.no_results_text ?? "No projects match your search.",
        empty_state_text: cms?.empty_state_text ?? "No projects at the moment. Please check back later.",
    };

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={content.banner_subtitle} title={content.banner_title} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding bg-sah-white py-[40px]">
                <div className="container !px-[50px] max-[1024px]:!px-4">
                    <JobSearchBar searchSuggestions={auto_suggestions.map((s) => s.search_query)} locationSuggestions={all_locations.map((loc) => loc.name)} />
                </div>
            </section>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">{q || location ? content.no_results_text : content.empty_state_text}</p>
                        </div>
                    ) : (
                        <SubcontractedListingClient
                            items={items}
                            resultSingularLabel={content.result_singular_label}
                            resultPluralLabel={content.result_plural_label}
                            resultFoundLabel={content.result_found_label}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
