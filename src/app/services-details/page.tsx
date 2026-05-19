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
import { headers } from "next/headers";
import { get_faq_items } from "@/services/page_content.service";
import { get_cta_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function ServicesDetailsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [faqItems, cta] = await Promise.all([
        get_faq_items(locale),
        get_cta_content(locale),
    ]);

    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Detailed Service Overview Here" title={<>Delivering High-Quality Construction Services With Precision</>} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <ServiceDetails />

            <TeamSection />

            <OurValue />

            <Cta
                title={cta?.title ?? "Available Nationwide"}
                description={cta?.description}
                button_label={cta?.button_label}
                button_link={cta?.button_link}
                map_image={getStrapiMediaUrl(cta?.map_image)}
                legend_one={cta?.legend_one}
                legend_two={cta?.legend_two}
            />

            <Approach />

            <FeatureSection />

            <Service
                className="bg-none bg-sah-light-4 py-0"
                containerClass="border-x border-sah-light-3 pt-[140px] pb-[150px]"
                bgShape={false}
            />

            <FaqSection items={faqItems} />
        </>
    );
}
