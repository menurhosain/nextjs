import type { Metadata } from "next";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Testimonial from "@/components/sections/careers/testimonial";
import Careers from "@/components/sections/careers/careers";
import JobCareers from "@/components/sections/careers/jobcareers";
import { get_voices_of_experience_content, get_career_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { headers } from "next/headers";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [content, voices] = await Promise.all([get_career_page_content(locale), get_voices_of_experience_content(locale)]);

    return (
        <>
            <Banner
                bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"}
                class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]"
            >
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Reliable Business Partners"}
                            title={content?.banner?.banner_title || "Work on meaningful projects that shape communities"}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <Careers
                section_title={content?.section_title}
                section_description={content?.section_description}
                section_button_label={content?.section_button_label}
                section_button_link={content?.section_button_link}
                image_1={getStrapiMediaUrl(content?.image_1)}
                image_2={getStrapiMediaUrl(content?.image_2)}
                map_image={getStrapiMediaUrl(content?.map_image)}
                map_legend_1={content?.map_legend_1}
                map_legend_2={content?.map_legend_2}
            />
            <JobCareers
                job_section_title={content?.job_section_title}
                job_section_description={content?.job_section_description}
                job_board_image={getStrapiMediaUrl(content?.job_board_image)}
                job_listings={content?.job_listings ?? []}
            />
            <Testimonial bg={getStrapiMediaUrl(voices?.background)} quote={voices?.quote} author_name={voices?.name} author_role={voices?.role} />
        </>
    );
}
