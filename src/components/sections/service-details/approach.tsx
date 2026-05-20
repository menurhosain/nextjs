"use client";

import Section_Title from "@/components/ui/section-title";
import { SectionTitle } from "@/services/page_content.service";

interface ApproachProps {
    section_title?: SectionTitle | null;
    image?: string | null;
}

export default function Approach({ section_title, image }: ApproachProps) {
    return (
        <section className=" bg-sah-light-4">
            <div className="section-padding">
                <div className="container border-x border-sah-light-3 max-[1024px]:!px-4">
                    <div className="xl:grid grid-cols-1 xl:grid-cols-12 gap-8.5 bg-sah-dark-3 p-[25px] sm:p-[40px] pl-5 sm:pl-6 2xl:pl-[70px] rounded-[6px] items-center z-1 relative mb-[-265px]">
                        <div className="col-span-7">
                            <Section_Title
                                subtitle={section_title?.sub_title || "Our Approach"}
                                title={section_title?.title || "Our approach engineer led, owner-focused."}
                                description={section_title?.description || "Offsite operates a 200,000-square-foot manufacturing facility in central Alabama, designed to support high-efficiency production and precision engineering. The facility integrates advanced technologies, including Lincoln Python systems for streamlined steel processing, ABB robotics for accurate beam assembly, and a TopStation to optimize fabrication workflows. This modern."}
                                class_name={{
                                    subtitle: "text-sah-black !mb-[15px] text-white !text-[14px] sm:text-[16px]",
                                    title: "text-sah-black !mb-[15px] xl:!mb-[25px] md:!text-[52px] xl:text-[70px] lg:leading-[1.1em] max-[1024]:leading-[60px] max-[768px]:leading-[50px] max-[640px]:!text-[20px] max-[640px]:!leading-[30px] text-white",
                                    description: "text-sah-gray-1 text-white max-[640px]:text-[16px]"
                                }}
                            />
                        </div>
                        <div className="col-span-5 p-[17px] bg-sah-dark-2 rounded-[6px] mt-6 xl:mt-0">
                            <img className="rounded-[6px] max-[1280px]:w-full" src={image || "/approach.jpg"} alt="" />
                        </div>
                    </div>
                </div>
            </div>
                <div className="section-padding bg-[linear-gradient(0deg,#7c0924_0%,var(--color-sah-dark-2)_50%)] h-[340px] lg:h-[409px]"></div> 
        </section>
    );
}
