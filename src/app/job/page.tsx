import type { Metadata } from "next";
import { headers } from "next/headers";
import { get_jobs } from "@/services/job.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import JobListingClient from "./job-listing-client";
import type { JobLocation } from "@/services/job.service";

export const metadata: Metadata = { title: "Job Openings" };

export default async function JobListingPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const jobs = await get_jobs(locale);

    // Collect unique locations across all jobs
    const locationMap = new Map<string, JobLocation>();
    for (const job of jobs) {
        for (const loc of job.locations ?? []) {
            if (!locationMap.has(loc.slug)) locationMap.set(loc.slug, loc);
        }
    }
    const locations = Array.from(locationMap.values());

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

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {jobs.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">No open positions at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <JobListingClient jobs={jobs} locations={locations} />
                    )}
                </div>
            </section>
        </>
    );
}
