"use client";

 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const testimonials = [
  {
    id: 1,
    quote:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum.",
    name: "Mr. Sojan Varghese",
    role: "Team, Leader",
  },
  {
    id: 2,
    quote:
      "Praesent commodo cursus magna vel scelerisque nisl consectetur. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla at volutpat velit aliquet.",
    name: "Ms. Priya Sharma",
    role: "Product, Manager",
  },
  {
    id: 3,
    quote:
      "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum blandit augue laoreet rutrum faucibus dolor.",
    name: "Mr. Daniel Osei",
    role: "Design, Director",
  },
  {
    id: 4,
    quote:
      "Fusce dapibus tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur ornare augue laoreet rutrum faucibus dolor.",
    name: "Ms. Amara Nwosu",
    role: "Engineering, Lead",
  },
];

export default function Testimonial() {
    return (
        <>
            <style>{`
                .testi-swiper .swiper-slide { backface-visibility: hidden; }
            `}</style>
            <section className="px-[30px] mt-[-270px]">
                <div className="section-padding !px-[0] flex items-center bg-[url('/testimonial-bg.jpg')] h-[615px] bg-cover bg-center">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-end">
                            <div className="relative px-6 max-w-[900px]">                
                                <Swiper
                                    className="testi-swiper"
                                    modules={[Autoplay, EffectFade]}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    speed={550}
                                    autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                    loop
                                >
                                {testimonials.map((t) => (
                                    <SwiperSlide key={t.id}>
                                        <div className="bg-white overflow-hidden mr-[10px] mb-[10px] shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                                            <div className="px-[50px] pt-[51px] pb-[55px] relative">   
                                                <p className="relative z-10 text-[24px] font-regular leading-[36px] text-sah-dark-2 mb-6 min-h-[108px]">
                                                    {t.quote}
                                                </p>
                                                <div className="h-px bg-sah-light-3 mb-7" />
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start flex-col gap-0">
                                                        <p className="text-[24px] font-bold text-sah-dark-2 leading-snug pb-[5px]">
                                                            {t.name}
                                                        </p>
                                                        <p className="text-[16px] font-medium text-sah-gray-1">
                                                            {t.role}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-[3px] items-end opacity-75 ">
                                                        <svg width="44" height="33" viewBox="0 0 44 33" fill="var(--color-sah-red)" xmlns="http://www.w3.org/2000/svg" className="!w-[44px] !h-[44px]">
                                                            <path d="M0 0V33L16.5 16.5V0H0ZM27.5 0V33L44 16.5V0H27.5Z" fill="var(--color-sah-red)"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



 
