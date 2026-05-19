import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import About from "@/components/sections/about/about";
import WhyChoose from "@/components/sections/about/whychoose";
import Service from "@/components/sections/about/service";
import Career from "@/components/sections/home/career";
import { get_service_cards } from "@/services/service_card.service";
import { get_about_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

const FALLBACK_BG = "/home-hero.mp4";
const FALLBACK_SUBTITLE = "Building Trust And Excellence";
const FALLBACK_TITLE = (
    <>
        Building Trust Through <br /> Quality Construction <br /> Trust Through
    </>
);

export default async function AboutUsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [service_cards, about_page] = await Promise.all([get_service_cards(locale), get_about_page_content(locale)]);

    const banner = about_page?.Banner;
    const bg = getStrapiMediaUrl(banner?.banner_bg) || FALLBACK_BG;
    const subtitle = banner?.banner_label || FALLBACK_SUBTITLE;
    const title = banner?.banner_title || FALLBACK_TITLE;

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

            <About
                subtitle={about_page?.about_section?.sub_title}
                title={about_page?.about_section?.title}
                description={about_page?.about_section?.description}
                stats={about_page?.about_stats_counters}
                award_bg={getStrapiMediaUrl(about_page?.about_award_bg)}
                award_logo={getStrapiMediaUrl(about_page?.about_award_logo)}
                award_title={about_page?.about_award_title}
                award_sub_title={about_page?.about_award_sub_title}
                award_year={about_page?.about_award_year}
            />
            <WhyChoose
                section={about_page?.why_choose_section}
                cards={about_page?.why_choose_cards}
                image_cards={about_page?.why_choose_image_cards}
            />
            <Service services={service_cards} />
            <Career />
        </>
    );
}
