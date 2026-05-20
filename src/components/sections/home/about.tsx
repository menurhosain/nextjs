import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ButtonModern } from "@/components/ui/button";

interface AboutProps {
    subTitle?: string;
    titleNormal?: string;
    titleAnimated?: string;
    imageUrl?: string;
    imageTopText?: string;
    btnLabelOne?: string;
    btnLinkOne?: string;
    btnLabelTwo?: string;
    btnLinkTwo?: string;
}
export default function About({subTitle, titleNormal, titleAnimated, imageUrl, imageTopText, btnLabelOne, btnLinkOne, btnLabelTwo, btnLinkTwo}: AboutProps) {
    return (
        <section className="section-padding relative pt-27 max-[1024]:pt-15 lg:pb-[140px] pb-[72px] bg-sah-dark-2">
            <div className="container mx-auto !px-0">
                <div className="lg:flex justify-space-between 2xl:gap-[284px] xl:gap-[100px] gap-[50px]">
                    <div className="lg:basis-[340px] xl:basis-[432px] shrink-0 inline-block">
                        <div className="text-white text-[16px] tracking-normal font-medium uppercase mb-9">[ {subTitle || "About SAH"} ] ↓</div>
                        <div className="relative rounded-[12px] overflow-hidden">
                            <img src={imageUrl || "/about/intro-desk.jpg"} alt="About" />
                            <div className="absolute bottom-[12px] left-[12px] sm:w-[242px] w-[230px] rounded-[9px] p-2.5 text-[20px] sm:text-[24px] bg-sah-dark-1 text-white font-medium">{imageTopText || "From 1994-2026 we’re growing fast"}</div>
                        </div>
                    </div>

                    <div className="lg:mt-[0px] mt-[40px]">
                        <ScrollReveal toColor="var(--color-sah-white)">
                            <h2 className="2xl:text-[90px] xl:text-[64px] lg:text-[55px] md:text-[46px] sm:text-[38px] text-[24px] md:leading-[1em] leading-[1.2em] sm font-medium tracking-tight font-geist">
                                <span className="text-white">{titleNormal || "Crafting exceptional buildings with detail,"}</span>
                                <span className="text-sah-overlay-white-30 scroll-color"> {titleAnimated || "care, and engineering excellence"}</span>
                            </h2>
                        </ScrollReveal>
                        <div className="flex items-center gap-[24px] mt-[46px] flex-wrap">
                            <ButtonModern variant="pill" link={btnLinkOne || "#"} label={btnLabelOne || "About Us More"} class_name="py-[10px] px-[30px] text-[16px] sah-transition hover:bg-sah-red hover:text-white" />
                            <ButtonModern variant="text" link={btnLinkTwo || "#"} label={btnLabelTwo || "Explore More"} class_name="p-0 text-[16px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

