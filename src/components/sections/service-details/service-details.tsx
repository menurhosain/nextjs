"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section_Title from "@/components/ui/section-title";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import TeamCard from "@/components/ui/team-card";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    { code: "001", label: "Structural steel (300 tons or less)" },
    { code: "002", label: "Stair systems & supports" },
    { code: "003", label: "Wall-panel systems" },
    { code: "004", label: "Handrails & guardrails" },
    { code: "005", label: "Pipe racks & supports" },
    { code: "006", label: "Architectural finishes" }
];

const teams = [
    {
        image: "/team/1.jpg",
        name: "Albert Flores",
        role: "Software Developer"
    },
    {
        image: "/team/2.jpg",
        name: "Jane Cooper",
        role: "Team Leader"
    },
    {
        image: "/team/3.jpg",
        name: "Darrell Steward",
        role: "Project manager"
    },
    {
        image: "/team/4.jpg",
        name: "Jenny Wilson",
        role: "Project Manager"
    }
];

const accordion = [
    {
        question: "What the first step of the home buying process?",
        answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement. We create engaging games and catchy art for various platforms."
    },
    {
        question: "How long does it take to buy a home?",
        answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement. We create engaging games and catchy art for various platforms."
    },
    {
        question: "How much do I need for a down payment?",
        answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement. We create engaging games and catchy art for various platforms."
    },
    {
        question: "What is earnest money?",
        answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement. We create engaging games and catchy art for various platforms."
    }
];

export default function ServiceDetails() {

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
                // color: '#101010',
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
        <>
            <section className="relative w-full">
                <div className="container border-x border-sah-light-3 pt-27 lg:pb-[140px] pb-[80px]">
                    <div className="grid grid-cols-7 gap-5 items-start">
                        <div className="col-span-3 sticky top-[30px] left-0">
                            <Section_Title
                                title="MEP & Building system"
                                class_name={
                                    {
                                        title: "xl:!text-[80px] xl:!leading-[86px] font-medium text-sah-black !mb-[10px] max-w-[870px] text-[70px] "
                                    }
                                }
                            />
                        </div>
                        <div className="col-span-4">
                            <p className="text-[16px] leading-[28px] font-medium text-sah-gray-2">Offsite, part of the SAH group, is reshaping construction through innovative and scalable offsite manufacturing methods. Backed by more than two decades of experience, we enable clients to achieve faster timelines,
                                improved safety, and smarter building practices. Our goal is to transform how projects are delivered by offering tailored, high-efficiency offsite solutions. Using cutting-edge technology, streamlined processes, and industry expertise, we provide everything from prefabricated elements to
                                complete integrated systems—ensuring speed, accuracy, and dependable results.</p>

                            <div className="w-full mt-[60px]">
                                <div className="flex items-center gap-2 mb-0 pb-4 border-b border-[rgba(229,_229,_229,_0.89))]">
                                    <span className="w-[6px] h-[6px] rounded-full bg-sah-black shrink-0" />
                                    <span className="text-[16px] font-medium uppercase text-sah-black">Benefits</span>
                                </div>

                                <div className="flex flex-col divide-y divide-[rgba(229,_229,_229,_0.89))] border-b border-b-[rgba(229,_229,_229,_0.89))]">
                                    {benefits.map((item, index) => (
                                        <div key={index} className="flex items-center gap-[150px] py-5">
                                            <span className="w-[160px] shrink-0 text-[16px] text-sah-black font-medium">
                                                ({item.code})
                                            </span>
                                            <span className="text-[20px] font-semibold text-sah-black leading-snug">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full section-padding lg:pt-[140px] lg:pb-[110px] py-[80px] bg-sah-dark-2">
                <div className="container">
                    <div className="grid grid-cols-6 gap-5 items-start mb-[50px]">
                        <div className="col-span-3">
                            <Section_Title
                                subtitle="Our Teams"
                                class_name={
                                    {
                                        subtitle: "text-white mb-[0] capitalize"
                                    }
                                }
                            />
                        </div>
                        <div className="col-span-3">
                            <Section_Title
                                title="Our leadership teams"
                                description="Our team brings extensive expertise in modular construction, offsite manufacturing, and complex project execution. With a strong focus on innovation, efficiency, and precision, we continuously."
                                class_name={
                                    {
                                        title: "xl:!text-[80px] xl:!leading-[86px] font-medium text-white !mb-[15px] max-w-[870px] text-[70px] ",
                                        description: "text-white"
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-[30px]">
                        {teams.map((team, index) => (
                            <TeamCard
                                key={index}
                                image={team.image}
                                name={team.name}
                                role={team.role}
                            />
                        ))}
                    </div>
                </div>
            </section>

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

            <section className="relative w-full bg-sah-light-4 py-[200px]"></section>

            <section className="section-padding w-full lg:py-[140px] py-[80px] bg-[url('/faq_sec_bg.jpg')] bg-cover bg-bottom bg-no-repeat">
                <div className="container">
                    <div className="grid grid-cols-2 gap-10 items-start">
                        <div>
                            <Section_Title
                                subtitle="Life at SAH"
                                title="Frequently Asked Questions"
                                description="Real stories from homeowners and investors who trusted us to guide their real estate journey."
                                class_name={
                                    {
                                        subtitle: "text-sah-black !mb-[15px]",
                                        title: "xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[60px] text-[70px] ",
                                        description: "text-sah-gray-1 max-w-[453px]"
                                    }
                                }
                            />
                        </div>
                        <div>
                            <FaqAccordion
                                items={accordion}
                                mode="exclusive"
                                showControls={false}
                                defaultOpen={0}
                                descClass="pr-[60px]"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
