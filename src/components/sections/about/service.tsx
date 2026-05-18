"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ServiceCard } from "@/components/ui/service-card";
import Section_Title from "@/components/ui/section-title";
import { cn } from "@/lib/utils";
import { ServiceCard as ServiceCardTypes } from "@/services/service_card.service";

gsap.registerPlugin(ScrollTrigger);

interface serviceProps {
    className?: string;
    containerClass?: string;
    bgShape?: boolean;
    services?: ServiceCardTypes[];
}
export default function Service({ className, containerClass, bgShape = true, services }: serviceProps) {
    const sectionTitleRef = useRef<HTMLDivElement>(null);
    const cardRefs = services?.map(() => useRef<HTMLDivElement>(null)) ?? [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sectionTitleRef.current, {
                scrollTrigger: {
                    trigger: sectionTitleRef.current,
                    start: "top top+=110",
                    end: "top top+=310",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cardRefs[cardRefs.length - 1]?.current,
                },
            });

            cardRefs.forEach((ref) => {
                gsap.to(ref.current, {
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top+=280",
                        end: "top top+=280",
                        pin: true,
                        pinSpacing: false,
                        endTrigger: cardRefs[cardRefs.length - 1]?.current,
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            className={cn(
                "section-padding value-pin-area pt-[140px] pb-[150px] relative bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center overflow-hidden",
                className,
            )}
        >
            {bgShape && (
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 md:w-[780px] md:h-[600px] bg-[url('/brand_shape.png')] bg-no-repeat bg-center bg-bottom pointer-events-none"
                />
            )}
            <div className={cn("container mx-auto  !px-0", containerClass)}>
                <div className="mb-[50px] flex flex-col items-center " ref={sectionTitleRef}>
                    <Section_Title
                        subtitle="our expertise"
                        title={<> Our service offerings </>}
                        class_name={{
                            subtitle: "text-sah-black !mb-[15px] !tracking-normal",
                            title: "xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[10px] text-center max-w-[870px] text-[70px]",
                            description: "text-sah-gray-1 text-center max-w-[870px]",
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rs-pin-element items-start">
                    {services?.map((ser, i) => (
                        <ServiceCard style={{marginTop: `${i * 400 }px`}} ref={cardRefs[i]} title={ser.title} description={ser.description} icon={ser.svg} link_label={ser.button_label} href={ser.button_link} key={ser.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
