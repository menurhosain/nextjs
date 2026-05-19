import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Partner from "@/components/sections/partner/partner";
import Testimonial from "@/components/sections/partner/testimonial";
import Cta from "@/components/sections/partner/cta";
import { headers } from "next/headers";
import { get_partner_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function PartnerPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [content] = await Promise.all([get_partner_page_content(locale)]);

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"}  class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center max-w-[800px]">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Reliable Business Partners"}
                            title={content?.banner?.banner_title || "Trusted Partners Driving Construction Excellence"}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <Partner
                logos={content?.partner_logos}
                subtitle={content?.partner_section_sub_title}
                titleNormal={content?.partner_section_title_normal}
                titleAnimated={content?.partner_section_title_animated}
            />
            <Testimonial />
            <Cta />
        </>
    );
}
