import { ScrollReveal } from "@/components/ui/scroll-reveal";
export default function About() {
    return (
        <section className="relative py-20 bg-sah-dark-2">
            <div className="container mx-auto">
                <div className="flex justify-space-between gap-[284px]">
                    <div className="basis-[27.4%] shrink-0">
                        <div className="text-sah-black text-sm font-medium tracking-widest uppercase mb-9">[ About SAH ] ↓</div>
                        <div className="relative rounded-[12px] overflow-hidden">
                            <img src="/about/intro-desk.jpg" alt="About" />
                            <div className="absolute bottom-7 left-7 w-[242px] rounded-[9px] p-2.5 text-[24px] bg-sah-dark-1 text-sah-overlay-white-50">
                                From <span className="text-white">1994-2026 </span>
                                we’re growing fast
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <ScrollReveal toColor="var(--color-sah-white)">
                            <h2 className="text-[90px] leading-[90px] font-medium tracking-tight font-geist">
                                <div className="text-white">Crafting exceptional buildings with detail,{" "}</div>
                                <div className="text-sah-overlay-white-50 scroll-color">care, and engineering excellence</div>
                            </h2>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}