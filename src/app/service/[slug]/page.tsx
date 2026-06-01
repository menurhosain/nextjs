import type { Metadata } from "next";
import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import ServiceDetails from "@/components/sections/service-details/service-details";
import OurValue from "@/components/sections/service-details/our-value";
import TeamSection from "@/components/sections/service-details/team";
import Cta from "@/components/sections/partner/cta";
import FaqSection from "@/components/sections/service/faq";
import Service from "@/components/sections/about/service";
import FeatureSection from "@/components/sections/service-details/features";
import Approach from "@/components/sections/service-details/approach";

import { get_service_details_page_content, get_teams, get_cta_content, get_faq_items } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { get_service_by_slug } from "@/services/service.service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const service = await get_service_by_slug(slug, locale);

    if (!service) return {};

    return {
        title: service.title,
        description: service.description || undefined,
        openGraph: {
            title: service.title,
            description: service.description || undefined,
            ...(service.image && { images: [{ url: service.image }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: service.title,
            description: service.description || undefined,
            ...(service.image && { images: [service.image] }),
        },
    };
}

export default async function ServicesDetailsPage({params}:{params:Promise<{slug:string}>}) {
    const locale = (await headers()).get("x-locale") ?? "en";
    const { slug } = await params;
    const service = await get_service_by_slug(slug, locale);
    const [page, teams, cta,  faqItems] = await Promise.all([get_service_details_page_content(locale), get_teams(locale, 4), get_cta_content(locale), get_faq_items(locale)] );

    const bg = getStrapiMediaUrl(page?.Banner?.banner_bg) || "/home-hero.mp4";
    const subtitle = page?.Banner?.banner_label || "Detailed Service Overview Here";
    const title = page?.Banner?.banner_title || "Delivering High-Quality Construction Services With Precision";

    return (
        <>
            <Banner bg={bg} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={subtitle} title={title} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <ServiceDetails
                title={service?.title}
                description={service?.content ?? []}
                benefits_label={page?.service_detail_benefits_label}
                benefits={service?.benefits}
            />

            <TeamSection section_title={page?.team_section_title} teams={teams} />

            <OurValue
                heading={page?.our_value_heading}
                bg={getStrapiMediaUrl(page?.our_value_bg)}
                items={page?.our_value_items}
            />

            <Cta
                title={cta?.title ?? "Available Nationwide"}
                description={cta?.description}
                button_label={cta?.button_label}
                button_link={cta?.button_link}
                map_image={getStrapiMediaUrl(cta?.map_image)}
                legend_one={cta?.legend_one}
                legend_two={cta?.legend_two}
            />

            <Approach
                section_title={page?.approach_section_title}
                image={getStrapiMediaUrl(page?.approach_section_image)}
            />

            <FeatureSection
                bg={getStrapiMediaUrl(page?.feature_section_bg)}
                items={page?.feature_items}
            />

            <Service
                services={page?.services}
                subtitle={page?.service_section_title?.sub_title}
                title={page?.service_section_title?.title}
                className="bg-none bg-sah-light-4 py-0"
                containerClass="xl:border-x border-sah-light-3 !px-0 xl:!px-10"
                bgShape={false}
            />

            <FaqSection items={faqItems} />
        </>
    );
}
