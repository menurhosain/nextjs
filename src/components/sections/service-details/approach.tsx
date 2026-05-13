"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Autoplay } from "swiper/modules";
import Section_Title from "@/components/ui/section-title";

const partners = [
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
    { image: "/partner/5.png" },
    { image: "/partner/6.png" },
    { image: "/partner/7.png" },
];

export default function Approach() {
    return (
        <section className="bg-sah-light-4">
            <div className="container border-x border-sah-light-3">
                <div className="grid grid-cols-12 gap-8.5 bg-sah-dark-3 p-[40px] rounded-[6px] items-center z-1 relative mb-[-265px]">
                    <div className="col-span-7">
                        <Section_Title
                            subtitle="Our Approach"
                            title="Our Approach Engineer Led, Owner-Focused."
                            description="Offsite operates a 200,000-square-foot manufacturing facility in central Alabama, designed to support high-efficiency production and precision engineering. The facility integrates advanced technologies, including Lincoln Python systems for streamlined steel processing, ABB robotics for accurate beam assembly, and a TopStation to optimize fabrication workflows. This modern."
                            class_name={
                                {
                                    subtitle: "text-sah-black !mb-[15px] text-white",
                                    title: "text-sah-black !mb-[25px] xl:text-[70px] lg:leading-[1.2em] text-white",
                                    description: "text-sah-gray-1 text-white"
                                }
                            }
                        />
                    </div>
                    <div className="col-span-5 p-[17px] bg-sah-dark-2 rounded-[6px]">
                        <img className="rounded-[6px]" src="/approach.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="section-padding bg-[linear-gradient(0deg,#7c0924_0%,var(--color-sah-dark-2)_50%)] h-[409px]"></div>
        </section>
    );
}