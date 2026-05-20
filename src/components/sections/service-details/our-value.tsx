"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_ITEMS = [
    { id: 1, title: "Integrity", description: "Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules." },
    { id: 2, title: "Quality", description: "Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules." },
    { id: 3, title: "Innovation", description: "Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules." },
    { id: 4, title: "Safety", description: "Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules." },
];

interface OurValueProps {
    heading?: string | null;
    bg?: string | null;
    items?: { id: number; title: string; description: string }[];
}

export default function OurValue({ heading, bg, items }: OurValueProps) {
    const wrapperTitleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const displayItems = items && items.length > 0 ? items : FALLBACK_ITEMS;
    const bgUrl = bg || "/construction-bg.jpg";

    useEffect(() => {
        if (!wrapperTitleRef.current) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {

        const ctx = gsap.context(() => {
            gsap.to(titleRef.current, {
                y: 250,
                scale: 0.4,
                ease: "none",
                opacity: 1,
                fontWeight: 500,
                scrollTrigger: {
                    trigger: wrapperTitleRef.current,
                    start: "top 40%",
                    end: "bottom top+=10%",
                    scrub: true,
                    markers: false
                }
            });
        });

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="relative w-full">
            <div ref={wrapperTitleRef} className="bg-[linear-gradient(0deg,#4f1321_0%,#191919_100%)] text-center pb-[35px]">
                <h2 ref={titleRef} className="text-[60px] sm:text-[90px] md:text-[100px] lg:text-[160px] xl:text-[200px] leading-[1em] font-bold text-white mb-0 opacity-[0.3] ">{heading || "Our Values"}</h2>
            </div>
            <div className="section-padding bg-no-repeat bg-cover pt-[80px] lg:pt-[246px]" style={{ backgroundImage: `url('${bgUrl}')` }}>
                <div className="container flex justify-center max-[1536px]:!px-0">
                    <div className="bg-white rounded-t-[12px] grid grid-cols-1 sm:grid-cols-2 sm:py-[25px] lg:py-[80px] sm:px-[30px] lg:px-[106px] max-w-[1280px]">
                        {displayItems.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const isTop = index < 2;
                            return (
                                <div
                                    key={item.id}
                                    className={[
                                        isLeft ? "pr-[20px] md:pr-[50px] max-[640px]:pl-[20px]" : "pl-[24px] md:pl-[54px] max-[640px]:pr-[20px]",
                                        isTop ? "pb-[20px] md:pb-[40px]  max-[640px]:pt-[20px]" : "pt-[20px] md:pt-[40px] max-[640px]:pb-[20px]",
                                        isLeft && isTop ? "border-r border-b border-sah-light-3" : "",
                                        !isLeft && isTop ? "border-b border-sah-light-3" : "",
                                        isLeft && !isTop ? "border-r border-sah-light-3  max-[640px]:border-b" : "",
                                    ].join(" ")}
                                >
                                    <h4 className="text-[24px] leading-[40px] font-bold text-sah-dark-2 mb-[7px]">{item.title}</h4>
                                    <p className="text-[16px] leading-[28px] font-normal text-sah-dark-2">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
