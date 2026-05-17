import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ButtonModern } from "@/components/ui/button";
export default function About() {
    return (
        <section className="section-padding relative pt-27 lg:pb-[140px] pb-[80px] bg-sah-dark-2">
            <div className="container mx-auto !px-0">
                <div className="lg:flex justify-space-between 2xl:gap-[284px] xl:gap-[100px] gap-[50px]">
                    <div className="lg:basis-[432px] shrink-0 inline-block">
                        <div className="text-white text-[16px] tracking-normal font-medium uppercase mb-9">[ About SAH ] ↓</div>
                        <div className="relative rounded-[12px] overflow-hidden">
                            <img src="/about/intro-desk.jpg" alt="About" />
                            <div className="absolute bottom-[12px] left-[12px] w-[242px] rounded-[9px] p-2.5 text-[24px] bg-sah-dark-1 text-sah-overlay-white-50 font-medium">
                                From <span className="text-white">1994-2026 </span>
                                we’re growing fast
                            </div>
                        </div>
                    </div>

                    <div className="lg:mt-[0px] mt-[40px]">
                        <ScrollReveal toColor="var(--color-sah-white)">
                            <h2 className="2xl:text-[90px] xl:text-[70px] lg:text-[55px] md:text-[62px] text-[38px] md:leading-[1em] leading-[1.2em] sm font-medium tracking-tight font-geist">
                                <span className="text-white">Crafting exceptional buildings with detail, </span>
                                <span className="text-sah-overlay-white-30 scroll-color">care, and engineering excellence</span>
                            </h2>
                        </ScrollReveal>
                        <div className="flex items-center gap-[24px] mt-[46px]">
                            <ButtonModern variant="pill" link="#" label="About Us More" class_name="py-[10px] px-[30px] text-[16px] sah-transition hover:bg-sah-red hover:text-white" />
                            <ButtonModern variant="text" link="#" label="Explore More" class_name="p-0 text-[16px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

