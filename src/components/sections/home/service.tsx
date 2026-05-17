"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ServiceCard } from "@/components/ui/service-card";
import { AngleArrow, DownLongArrow,ServiceIcon1 ,ServiceIcon2 ,ServiceIcon3 } from "@/components/ui/svgs";

gsap.registerPlugin(ScrollTrigger);

export default function Service() {
    const sectionTitleRef = useRef<HTMLDivElement>(null);
    const cardOneRef = useRef<HTMLDivElement>(null);
    const cardTwoRef = useRef<HTMLDivElement>(null);
    const cardThreeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sectionTitleRef.current, {
                scrollTrigger: {
                    trigger: sectionTitleRef.current,
                    start: "top top+=110",
                    end: "top top+=410",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cardThreeRef.current,
                },
            });
            gsap.to(cardOneRef.current, {
                scrollTrigger: {
                    trigger: cardOneRef.current,
                    start: "top top+=360",
                    end: "top top+=360",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cardThreeRef.current,
                },
            });
            gsap.to(cardTwoRef.current, {
                scrollTrigger: {
                    trigger: cardTwoRef.current,
                    start: "top top+=360",
                    end: "top top+=360",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cardThreeRef.current,
                },
            });
            gsap.to(cardThreeRef.current, {
                scrollTrigger: {
                    trigger: cardThreeRef.current,
                    start: "top top+=360",
                    end: "top top+=360",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cardThreeRef.current,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            className="section-padding value-pin-area pt-[140px] relative bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 md:w-[780px] md:h-[600px] bg-[url('/brand_shape.png')] bg-no-repeat bg-center bg-bottom pointer-events-none"
            />
            <div className="container mx-auto border-x border-sah-light-3">
                <div className="mb-[23px]" ref={sectionTitleRef}>
                    <div className="flex items-center justify-center gap-6 mb-[38px]">
                        <span className="text-sah-black flex items-center gap-[6px] text-[16px] font-medium tracking-widest uppercase font-inter">
                            [ Our Expertise ]
                            <DownLongArrow class_name="!w-[14px] !h-[14px]" />
                        </span>
                    </div>
                    <ScrollReveal toColor="var(--color-sah-dark-2)">
                        <h2 className="section-heading mx-auto text-center leading-[48px] mb-[60px]">
                            <span className="text-sah-dark-2">
                                We deliver high quality construction services <br /> with innovation, precision,{" "}
                            </span>
                            <span className="text-sah-dark-2/50 scroll-color font-bold">and commitment to every client project</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rs-pin-element items-start">
                    <ServiceCard
                        ref={cardOneRef}
                        title={
                            <>
                                Construction <br /> & Engineering
                            </>
                        }
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures that shape modern."
                        icon={<ServiceIcon1/>}
                    />
                    <ServiceCard
                        class_name="mt-[400]"
                        ref={cardTwoRef}
                        title={
                            <>
                                MEP & Building <br /> Systems{" "}
                            </>
                        }
                        description="MEP and building systems integrate mechanical, electrical, and plumbing solutions to ensure efficient, safe, and sustainable building."
                        icon={<ServiceIcon2/>}
                    />
                    <ServiceCard
                        class_name="mt-[900]"
                        ref={cardThreeRef}
                        title={
                            <>
                                Infrastructure <br /> Works
                            </>
                        }
                        description="We deliver reliable infrastructure works including transportation, drainage, and public utilities to enhance communities and support long-term."
                        icon={<ServiceIcon3/>}
                    />
                </div>

                <div className="flex justify-center mt-12 mb-[140px]">
                    <div className="inline-flex shadow-sm md:px-[30px] md:py-[8px] bg-sah-white rounded-full gap-[20px]">
                        <a href="#" className="flex group items-center text-[14px] sm:text-[16px] gap-[10px] font-inter font-medium ">
                            <span className="text-sah-dark-2 group-hover:text-sah-red">Careers</span>
                            <span
                                className="flex items-center justify-center w-[30px] h-[30px] sm:w-[28px] sm:h-[28px] rounded-full bg-sah-red text-sah-white flex-shrink-0 group-hover:bg-sah-red/80 transition-colors"
                                aria-label="Navigate"
                            >
                                <AngleArrow class_name="!w-[8px] !h-[8px]" />
                            </span>
                        </a>
                        <a href="#" className="flex group items-center text-[14px] sm:text-[16px] gap-[20px] font-inter font-medium">
                            <span className="text-sah-dark-2 underline underline-offset-2 decoration-sah-dark-2 group-hover:text-sah-red group-hover:decoration-sah-red transition-colors">
                                View All Services
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
