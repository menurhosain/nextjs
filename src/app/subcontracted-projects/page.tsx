import type { Metadata } from "next";
import { headers } from "next/headers";
import { get_subcontracteds } from "@/services/subcontracted.service";
import { get_subcontracted_projects_page_content } from "@/services/page_content.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import SubcontractedListingClient from "./subcontracted-listing-client";
import type { SubcontractedLocation } from "@/services/subcontracted.service";

export const metadata: Metadata = { title: "Subcontracted Projects" };

export default async function SubcontractedProjectsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";

    const [items, cms] = await Promise.all([get_subcontracteds(locale), get_subcontracted_projects_page_content(locale)]);

    const locationMap = new Map<string, SubcontractedLocation>();
    for (const item of items) {
        for (const loc of item.locations ?? []) {
            if (!locationMap.has(loc.slug)) locationMap.set(loc.slug, loc);
        }
    }
    const locations = Array.from(locationMap.values());

    const content = {
        banner_subtitle: cms?.banner?.banner_label ?? "Explore Opportunities",
        banner_title: cms?.banner?.banner_title ?? "Subcontracted Projects",
        search_placeholder: cms?.search_placeholder ?? "Search by title...",
        all_locations_label: cms?.all_locations_label ?? "All Locations",
        result_singular_label: cms?.result_singular_label ?? "project",
        result_plural_label: cms?.result_plural_label ?? "projects",
        no_results_text: cms?.no_results_text ?? "No projects match your search.",
        empty_state_text: cms?.empty_state_text ?? "No subcontracted projects at the moment. Please check back later.",
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

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[20px] font-medium text-sah-gray-2">{content.empty_state_text}</p>
                        </div>
                    ) : (
                        <SubcontractedListingClient
                            items={items}
                            locations={locations}
                            searchPlaceholder={content.search_placeholder}
                            allLocationsLabel={content.all_locations_label}
                            resultSingularLabel={content.result_singular_label}
                            resultPluralLabel={content.result_plural_label}
                            noResultsText={content.no_results_text}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
