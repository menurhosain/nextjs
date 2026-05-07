"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Autoplay } from "swiper/modules";

const partners = [
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
    { image: "/partner/5.png" },
    { image: "/partner/6.png" },
    { image: "/partner/7.png" },
];

export default function Partner() {
    return (
        <section className="pb-[140px] bg-[linear-gradient(0deg,var(--color-sah-red)_0%,var(--color-sah-dark-2)_80%)]">
            <div className="container mx-auto flex items-center justify-between gap-8.5">
                <div className="w-[242px] text-white font-medium text-[24px] shrink-0">Clients who inspire our vision</div>
                <Swiper
                    pagination={true} modules={[Autoplay]}
                    slidesPerView={6}
                    spaceBetween={16}
                    loop={true}
                    speed={2000}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    className="partner-swiper"
                >
                    {partners.map((partner) => (
                        <SwiperSlide>
                            <div className="px-5 py-10 rounded-[20px] hover:rounded-[100px] flex justify-center bg-sah-dark-5 sah-transition">
                                <img src={partner.image} alt="logo" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}