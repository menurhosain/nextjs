import type { Metadata } from "next";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import ProjectDetailsClient from "@/components/sections/project-details/project-details-client";
import { get_project_details_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { headers } from "next/headers";

export const metadata: Metadata = { title: "Project Details" };

export default async function ProjectDetailsPage() {
    const locale  = (await headers()).get("x-locale") ?? "en";
    const content = await get_project_details_page_content(locale);

    return (
        <>
            <Banner
                bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"}
                class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]"
            >
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Insights Into Project Work"}
                            title={content?.banner?.banner_title || "Complete Insights Into Project Design And Delivery"}
                        />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <ProjectDetailsClient
                project_info_heading={content?.project_info_heading}
                client_label={content?.client_label}
                category_label={content?.category_label}
                start_date_label={content?.start_date_label}
                end_date_label={content?.end_date_label}
                discuss_button_label={content?.discuss_button_label}
                discuss_button_link={content?.discuss_button_link}
                previous_project_label={content?.previous_project_label}
                next_project_label={content?.next_project_label}
            />
        </>
    );
}
