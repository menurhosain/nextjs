"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Autoplay } from "swiper/modules";
import { getStrapiMediaUrl } from "@/lib/utils";

interface partnerLogoProps {
    secTitle?: string;
    logos?: string[];
}

const partners = [
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
    { image: "/partner/5.png" },
    { image: "/partner/6.png" },
    { image: "/partner/7.png" },
];

export default function Partner({secTitle, logos}: partnerLogoProps) {
    const hasLogos = Array.isArray(logos) && logos.length > 0;

    const partnerItems = hasLogos
        ? logos.map((media) => ({
            image: getStrapiMediaUrl(media),
        }))
        : partners;

    return (
        <section className="section-padding pb-[80px] lg:pb-[140px] bg-[linear-gradient(0deg,var(--color-sah-red)_0%,var(--color-sah-dark-2)_80%)]">
            <div className="container mx-auto xl:flex items-center justify-between gap-8.5 max-[1536px]:!px-0">
                <div className="xl:w-[242px] text-white font-medium text-[24px] shrink-0 xl:mb-[0px] mb-[30px]">{secTitle || "Clients who inspire our vision"}</div>
                <Swiper
                    pagination={true} modules={[Autoplay]}
                    loop={true}
                    speed={2000}
                    className="partner-swiper"
                    breakpoints={{
                        0:    { slidesPerView: 2, spaceBetween: 12 },
                        640:  { slidesPerView: 3, spaceBetween: 14 },
                        768:  { slidesPerView: 4, spaceBetween: 16 },
                        1024: { slidesPerView: 5, spaceBetween: 16 },
                        1280: { slidesPerView: 6, spaceBetween: 16 },
                    }}
                >
                    {partnerItems.map((partner, index) => (
                        <SwiperSlide key={index}>
                            <div className="px-5 py-6 sm:py-10 rounded-[20px] hover:rounded-[100px] max-[480px]:hover:rounded-[40px] flex justify-center bg-sah-dark-5 hover:bg-sah-white sah-transition-all duration-600 group">
                                <img src={partner.image} className="group-hover:brightness-90 group-hover:invert sah-transition-all duration-600" alt="logo" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}