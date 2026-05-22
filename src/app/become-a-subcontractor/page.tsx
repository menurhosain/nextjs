import type { Metadata } from "next";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Subcontractor from "@/components/sections/become-a-subcontractor/subcontractor";
import Cta from "@/components/sections/become-a-subcontractor/cta";
import { get_subcontractor_page_content, get_career_cta_section_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Become a Subcontractor" };

export default async function BecomeASubcontrctorPage() {
    const [content, cta] = await Promise.all([
        get_subcontractor_page_content(),
        get_career_cta_section_content(),
    ]);

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Reliable Business Partners"}
                            title={content?.banner?.banner_title || "Become a valued subcontractor in our network"}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <Subcontractor
                intro_title_normal={content?.intro_title_normal}
                intro_title_animated={content?.intro_title_animated}
                intro_description={content?.intro_description}
                hero_image={getStrapiMediaUrl(content?.hero_image)}
                icon_box={content?.icon_box}
                policies_title={content?.policies_title}
                policies_description={content?.policies_description}
                policy_image={getStrapiMediaUrl(content?.policy_image)}
                policy_description={content?.policy_description}
                policy_button_1_label={content?.policy_button_1_label}
                policy_button_1_link={content?.policy_button_1_link}
                policy_button_2_label={content?.policy_button_2_label}
                policy_button_2_link={content?.policy_button_2_link}
            />
            <Cta
                bg={getStrapiMediaUrl(cta?.career_cta_background)}
                subtitle={cta?.career_cta_section_title?.sub_title}
                title={cta?.career_cta_section_title?.title}
                description={cta?.career_cta_section_title?.description}
                button_label={cta?.career_cta_button?.button_label}
                button_link={cta?.career_cta_button?.button_link}
            />
        </>
    );
}
