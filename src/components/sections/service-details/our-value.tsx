"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurValue() {

    const wrapperTitleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperTitleRef.current) return;

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
    }, []);

    return (
        <section className="relative w-full">
            <div ref={wrapperTitleRef} className="bg-[linear-gradient(0deg,#4f1321_0%,#191919_100%)] text-center pb-[35px]">
                <h2 ref={titleRef} className="text-[200px] leading-[1em] font-bold text-white mb-0 opacity-[0.3] ">Our Values</h2>
            </div>
            <div className="section-padding bg-[url('/construction-bg.jpg')] bg-no-repeat bg-cover pt-[246px]">
                <div className="container flex justify-center">
                    <div className="bg-white rounded-t-[12px] grid grid-cols-2 py-[80px] px-[106px] max-w-[1280px]">
                        <div className="pr-[50px] pb-[40px] border-r border-b border-sah-light-3">
                            <h4 className="text-[24px] leading-[40px] font-bold text-sah-dark-2 mb-[7px]">Integrity</h4>
                            <p className="text-[16px] leading-[28px] font-normal text-sah-dark-2">Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules. </p>
                        </div>
                        <div className="pl-[54px] pb-[40px] border-b border-sah-light-3">
                            <h4 className="text-[24px] leading-[40px] font-bold text-sah-dark-2 mb-[7px]">Quality</h4>
                            <p className="text-[16px] leading-[28px] font-normal text-sah-dark-2">Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules. </p>
                        </div>
                        <div className="pr-[50px] pt-[40px] border-r border-sah-light-3">
                            <h4 className="text-[24px] leading-[40px] font-bold text-sah-dark-2 mb-[7px]">Innovation</h4>
                            <p className="text-[16px] leading-[28px] font-normal text-sah-dark-2">Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules. </p>
                        </div>
                        <div className="pl-[54px] pt-[40px]">
                            <h4 className="text-[24px] leading-[40px] font-bold text-sah-dark-2 mb-[7px]">Safety</h4>
                            <p className="text-[16px] leading-[28px] font-normal text-sah-dark-2">Parallel workflows and streamlined offsite processes eliminate inefficiencies, improve logistics, and significantly shorten project schedules. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
