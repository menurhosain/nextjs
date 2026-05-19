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
    subtitle?: string;
    title?: string;
}
export default function Service({ className, containerClass, bgShape = true, services, subtitle, title }: serviceProps) {
    const sectionTitleRef = useRef<HTMLDivElement>(null);
    const cardRefsArray = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                const lastCard = cardRefsArray.current[cardRefsArray.current.length - 1];
                gsap.to(sectionTitleRef.current, {
                    scrollTrigger: {
                        trigger: sectionTitleRef.current,
                        start: "top top+=110",
                        end: "top top+=310",
                        pin: true,
                        pinSpacing: false,
                        endTrigger: lastCard,
                    },
                });

                cardRefsArray.current.forEach((el) => {
                    gsap.to(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top top+=280",
                            end: "top top+=280",
                            pin: true,
                            pinSpacing: false,
                            endTrigger: lastCard,
                        },
                    });
                });
            });

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section className={cn("section-padding value-pin-area pt-[73px] lg:pt-[143px] pb-[80px] lg:pb-[150px] relative bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center overflow-hidden", className)}>
            {bgShape &&
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 md:w-[780px] md:h-[600px] bg-[url('/brand_shape.png')] bg-no-repeat bg-center bg-bottom pointer-events-none"
                />
            }
            <div className={cn("container mx-auto  !px-0", containerClass)}>
                <div className="mb-[20px] lg:mb-[50px] flex flex-col items-center " ref={sectionTitleRef}>
                    <Section_Title
                        subtitle={subtitle || "our expertise"}
                        title={<>{title || "Our service offerings"}</>}
                        class_name={{ subtitle: "text-sah-black !mb-[15px] !tracking-normal text-[14px] sm:text-[16px]", title: "text-sah-black text-center !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[86px]", description: "text-sah-gray-1 text-center max-w-[870px]" }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rs-pin-element items-start">
                    {services?.map((ser, i) => (
                        <ServiceCard style={{marginTop: `${i * 400 }px`}} class_name="max-md:!mt-0" ref={(el) => { cardRefsArray.current[i] = el; }} title={ser.title} description={ser.description} icon={ser.svg} link_label={ser.button_label} href={ser.button_link} key={ser.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
