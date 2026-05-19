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
import { get_service_details_page_content, get_teams } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function ServicesDetailsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [page, teams] = await Promise.all([get_service_details_page_content(locale), get_teams(locale, 4)]);

    const bg = getStrapiMediaUrl(page?.Banner?.banner_bg) || "/home-hero.mp4";
    const subtitle = page?.Banner?.banner_label || "Detailed Service Overview Here";
    const title = page?.Banner?.banner_title || "Delivering High-Quality Construction Services With Precision";

    return (
        <>
            <Banner bg={bg}>
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={subtitle} title={title} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <ServiceDetails
                title={page?.service_detail_title}
                description={page?.service_detail_description}
                benefits_label={page?.service_detail_benefits_label}
                benefits={page?.service_detail_benefits}
            />

            <TeamSection section_title={page?.team_section_title} teams={teams} />

            <OurValue />

            <Cta title="Available Nationwide" />

            <Approach />

            <FeatureSection />

            <Service
                className="bg-none bg-sah-light-4 py-0"
                containerClass="border-x border-sah-light-3 pt-[140px] pb-[150px]"
                bgShape={false}
            />

            <FaqSection />
        </>
    );
}
