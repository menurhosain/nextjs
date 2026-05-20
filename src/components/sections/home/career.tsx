import Section_Title from "@/components/ui/section-title";
import { ButtonModern } from "@/components/ui/button";
import {  CareerCtaSectionContent } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function Career({ content }: { content: CareerCtaSectionContent }) {
    return (
        <section className="section-padding pt-[80px] lg:pt-[150px] xl:pt-[300px] 2xl:pt-[425px] relative">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover z-[-1]">
                <source src={getStrapiMediaUrl(content?.career_cta_background) || "/career.mp4"} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 z-[-1]" />

            <div className="container h-full flex items-end max-[1536px]:!px-0">
                <div className="w-full lg:w-[700px] xl:w-[900px] 2xl:w-[920px] p-[30px] md:p-[50px] xl:p-[100px] bg-[url('/career-content-bg.jpg')] bg-cover bg-top bg-no-repeat rounded-tr-[10px] rounded-tl-[10px]">
                    <Section_Title
                        subtitle={content?.career_cta_section_title?.sub_title || "About SAH"}
                        title={content?.career_cta_section_title?.title || "Career with SAH"}
                        description={content?.career_cta_section_title?.description || "Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has established itself as a trusted name in the construction industry, delivering exceptional projects"}
                        class_name={{ subtitle: "text-sah-black !mb-[15px] text-[14px] sm:text-[16px]", title: "text-sah-black !mb-[25px] text-[28px] sm:text-[46px] md:text-[60px] lg:text-[70px] lg:leading-[70px] leading-[1.1em]", description: "text-sah-gray-1" }}
                    />
                    <div className="mt-[40px] w-max">
                        <ButtonModern variant="solid" link={content?.career_cta_button?.button_link || "#"} label={content?.career_cta_button?.button_label || "You Like to Build?"} class_name="max-[640px]:px-3" />
                    </div>
                </div>
            </div>
        </section>
    );
}
