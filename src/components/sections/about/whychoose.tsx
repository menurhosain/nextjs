"use client";
import Section_Title from "@/components/ui/section-title";
import { useState } from "react";
import { WhyChoose1 ,WhyChoose2 ,WhyChoose3 ,WhyChoose4  } from "@/components/ui/svgs";


function ImageCard({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl group ${tall ? "h-full min-h-[420px]" : "h-[284px]"}`}>
            <img
                src={src}
                alt={alt}
                className="w-full  object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-sah-red/40 transition-all duration-500" />
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    desc,
    accent,
    dark,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    accent?: boolean;
    dark?: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    const bg = dark
        ? "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]"
        : accent
            ? "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]"
            : "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]";

    return (
        <div
            className={`relative rounded-[12px] p-7 flex flex-col gap-[30px] cursor-pointer overflow-hidden transition-all duration-500 group ${bg} hover:border-[#c0392b]/30`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Glow spot */}
            <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c0392b]/10 blur-3xl transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Top rule */}
            <div
                className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#c0392b]/60 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
                    }`}
            />
            <div className="flex items-center gap-[20px]">
                <div
                    className={`text-white/60 transition-all duration-500 group-hover:text-white origin-left flex items-center justify-center h-[80px] w-[80px] min-w-[80px] bg-sah-dark-2 rounded-[50%]`}
                >
                    {icon}
                </div>
                <h3 className="text-white font-medium text-[30px] leading-[38px] mb-0 mr-11">{title}</h3>
            </div>

            <div>
                <div
                    className={`w-8 h-[1px] bg-sah-white/15 mb-[47px] transition-all duration-500 ${hovered ? "w-full !bg-sah-red" : "w-[350px]"
                        }`}
                />
                <p className="text-white/70 text-[16px] leading-relaxed group-hover:text-white transition-colors duration-300">
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default function WhyChoose() {
    return (
        <section className="section-padding relative pt-27 lg:pb-[140px] pb-[80px] bg-sah-dark-2 bg-[url('/whychoose-shape.png')] bg-no-repeat bg-bottom">
            <div className="container mx-auto !px-0">
                <div className="flex flex-col items-center">
                    <div className="mb-[50px] flex flex-col items-start w-[580px]">
                        <Section_Title
                            subtitle="Why Choose us"
                            title=<> What makes us different </>
                            description="It’s not just about creating something good; it’s about designing, innovating, and collaborating to forge remarkable and unparalleled experiences."
                            class_name={{ subtitle: "text-sah-black !mb-[15px] text-left text-sah-white !tracking-normal", title: "xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[10px] text-center max-w-[870px] text-[70px] text-left text-sah-white", description: "text-sah-gray-1 text-center max-w-[870px] text-left text-sah-white" }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] auto-rows-auto">

                    {/* Row 1 */}
                    <div className="lg:col-span-1 lg:row-span-1">
                        <ImageCard
                            src="/choose-item-1.jpg"
                            alt="Luxury villa"
                        />
                    </div>

                    <div className="lg:col-span-1 lg:row-span-1">
                        <FeatureCard
                            icon={<WhyChoose1/>}
                            title="Affordable Realty Options"
                            desc="We prioritize clear communication and simplicity, making your property journey smooth and stress-free."
                            accent
                        />
                    </div>

                    {/* Tall image spanning 2 rows */}
                    <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] relative">
                        <ImageCard
                            src="/choose-item-2.jpg"
                            alt="Tropical resort with palms"
                            tall
                        />
                        <div className="lg:col-span-1 lg:col-start-3 lg:row-start-3 absolute bottom-[10px] left-[10px] right-[10px]">
                            <FeatureCard
                                icon={<WhyChoose2/>}
                                title="Building For Long-Term Value"
                                desc="Every project we develop is built with quality and vision, designed to benefit generations to come."
                                dark
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="lg:col-span-1">
                        <FeatureCard
                            icon={<WhyChoose3/>}
                            title="Hassle-Free Process"
                            desc="We prioritize clear communication and simplicity, making your property journey smooth and stress-free."
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <FeatureCard
                            icon={<WhyChoose4/>}
                            title="Expertise You Can Trust"
                            desc="Our experienced real estate experts guide you through every step with knowledge, care, and dedication."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}