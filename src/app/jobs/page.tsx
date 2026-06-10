import type { Metadata } from "next";
import { headers } from "next/headers";
import { get_jobs } from "@/services/job.service";
import { get_locations } from "@/services/location.service";
import { get_auto_search_suggestions } from "@/services/auto_search_suggestion.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import JobListingClient from "./job-listing-client";
import JobSearchBar from "./job-search-bar";

export const metadata: Metadata = { title: "Job Openings" };

export default async function JobListingPage({ searchParams }: { searchParams: Promise<{ q?: string; location?: string }> }) {
    const locale = (await headers()).get("x-locale") ?? "en";
    const { q, location } = await searchParams;

    const [jobs, all_locations, auto_suggestions] = await Promise.all([
        get_jobs(locale, { q, location }),
        get_locations(locale),
        get_auto_search_suggestions(locale),
    ]);

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Explore Opportunities" title="Open Positions" />
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
                    />
                </div>
            </section>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {jobs.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">
                                {q || location ? "No positions match your search." : "No open positions at the moment. Please check back later."}
                            </p>
                        </div>
                    ) : (
                        <JobListingClient jobs={jobs} />
                    )}
                </div>
            </section>
        </>
    );
}
