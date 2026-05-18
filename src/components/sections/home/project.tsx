"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section_Title from "@/components/ui/section-title";
import ProjectCard from "@/components/ui/project-card";
import { ButtonModern } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
    subTitle?: string;
    title?: string;
    btnLabel?: string;
    btnLink?: string;
}

export default function Projects({subTitle, title, btnLabel, btnLink}: PortfolioProps) {
    
    const ref = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || !endRef.current) return;

        const mm = gsap.matchMedia();
        
        const cards = Array.from(ref.current.children);
        if (cards.length < 2) return;

        mm.add("(min-width: 1280px)", () => {
            const ctx = gsap.context(() => {
                cards.forEach((card, index) => {

                    ScrollTrigger.create({
                        trigger: card,
                        start: `top top+=${80 + (index * 100)}`,
                        endTrigger: endRef.current,
                        end: "bottom bottom-=20",
                        pin: true,
                        pinSpacing: false,
                        markers: false,
                    });

                });
            }, ref);
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="section-padding bg-[linear-gradient(0deg,#f5f5f566_42.16%,#f5f5f5_204.49%),url('/project-section-bg.jpg')] bg-bottom bg-no-repeat">
            <div className="container pt-[73px] lg:pt-[143px] pb-[80px] lg:pb-[150px] mx-auto border-x border-sah-light-3  max-[1024px]:!px-4">
                <div className="mb-[40px] lg:mb-[70px] max-w-[1024px] mx-auto">
                    <Section_Title
                        subtitle={subTitle || "Latest Projects"}
                        title={title || "Discover our completed building projects"}
                        class_name={{ subtitle: "text-sah-black text-center ", title: "text-sah-black text-center !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[90px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[90px]" }}
                    />
                </div>

                <div ref={ref}>
                    <ProjectCard
                        category="Architecture"
                        title="Police College Package C SQAPS Nizwa"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-1.jpg"
                    />
                    <ProjectCard
                        category="Architecture"
                        title="Special Task Force Complex – Al Khabourah"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-2.jpg"
                    />
                    <ProjectCard
                        category="Construction"
                        title="Jabal Akhdar Police Station Complex"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-3.jpg"
                    />
                </div>

                <div className="flex items-center justify-center mt-[50px]" ref={endRef}>
                    <ButtonModern link={btnLink || "#"} label={btnLabel || "View All Projects"} />
                </div>
            </div>
        </section>
    );
}
