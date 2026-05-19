import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Service from "@/components/sections/service/service";
import FaqSection from "@/components/sections/service/faq";
import { headers } from "next/headers";
import { get_services_page_content, get_faq_items } from "@/services/page_content.service";
import { get_service_cards } from "@/services/service_card.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function ServicesPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [content, serviceCards, faqItems] = await Promise.all([
        get_services_page_content(locale),
        get_service_cards(locale),
        get_faq_items(locale),
    ]);

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Explore Our Core Services"}
                            title={content?.banner?.banner_title || "Delivering Reliable And Efficient Construction Services Today"}
                        />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <Service
                section_title={content?.service_section_title}
                cards={serviceCards}
            />

            <FaqSection
                section_title={content?.faq_section_title}
                items={faqItems}
            />
        </>
    );
}
