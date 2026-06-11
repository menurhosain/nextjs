import type { Metadata } from "next";
import { headers } from "next/headers";
import { get_jobs } from "@/services/job.service";
import { get_locations } from "@/services/location.service";
import { get_auto_search_suggestions } from "@/services/auto_search_suggestion.service";
import { get_jobs_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import JobListingClient from "./job-listing-client";
import JobSearchBar from "./job-search-bar";

export const metadata: Metadata = { title: "Job Openings" };

export default async function JobListingPage({ searchParams }: { searchParams: Promise<{ q?: string; location?: string }> }) {
    const locale = (await headers()).get("x-locale") ?? "en";
    const { q, location } = await searchParams;

    const [jobs, all_locations, auto_suggestions, content] = await Promise.all([
        get_jobs(locale, { q, location }),
        get_locations(locale),
        get_auto_search_suggestions(locale),
        get_jobs_page_content(locale),
    ]);

    const no_results_text = content?.no_results_text ?? "No positions match your search.";
    const empty_state_text = content?.empty_state_text ?? "No open positions at the moment. Please check back later.";

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"}>
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={content?.banner?.banner_label ?? "Explore Opportunities"} title={content?.banner?.banner_title ?? "Open Positions"} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding bg-sah-white py-[40px]">
                <div className="container !px-[50px] max-[1024px]:!px-4">
                    <JobSearchBar
                        searchSuggestions={auto_suggestions.map((s) => s.search_query)}
                        locationSuggestions={all_locations.map((loc) => loc.name)}
                        search_placeholder={content?.search_placeholder}
                        search_suggestions_label={content?.search_suggestions_label}
                        location_placeholder={content?.location_placeholder}
                        location_suggestions_label={content?.location_suggestions_label}
                        search_button_label={content?.search_button_label}
                    />
                </div>
            </section>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[50x] lg:pt-[50px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {jobs.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">{q || location ? no_results_text : empty_state_text}</p>
                        </div>
                    ) : (
                        <JobListingClient
                            jobs={jobs}
                            result_singular_label={content?.result_singular_label}
                            result_plural_label={content?.result_plural_label}
                            result_found_label={content?.result_found_label}
                            employment_type_label={content?.employment_type_label}
                            experience_label={content?.experience_label}
                            deadline_label={content?.deadline_label}
                            location_label={content?.location_label}
                            apply_button_label={content?.apply_button_label}
                            no_details_text={content?.no_details_text}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
