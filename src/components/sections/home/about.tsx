import { ScrollReveal } from "@/components/ui/scroll-reveal";
export default function About() {
    return (
        <section className="relative py-20">
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
                        <ScrollReveal toColor="var(--color-sah-dark-2)">
                            <h2 className="text-[90px] font-bold tracking-tight font-geist">
                                <span className="text-white">We deliver high quality construction services with innovation, precision,{" "}</span>
                                <span className="text-sah-gray-2 scroll-color font-bold">and commitment to every client project</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
