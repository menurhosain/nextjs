import type { Metadata } from "next";
import { headers } from "next/headers";
import { get_subcontracteds } from "@/services/subcontracted.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import SubcontractedListingClient from "./subcontracted-listing-client";
import type { SubcontractedLocation } from "@/services/subcontracted.service";

export const metadata: Metadata = { title: "Subcontracted Projects" };

export default async function SubcontractedProjectsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const items = await get_subcontracteds(locale);

    // Collect unique locations across all items
    const locationMap = new Map<string, SubcontractedLocation>();
    for (const item of items) {
        for (const loc of item.locations ?? []) {
            if (!locationMap.has(loc.slug)) locationMap.set(loc.slug, loc);
        }
    }
    const locations = Array.from(locationMap.values());

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Explore Opportunities" title="Subcontracted Projects" />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">No subcontracted projects at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <SubcontractedListingClient items={items} locations={locations} />
                    )}
                </div>
            </section>
        </>
    );
}
