"use client";
import Section_Title from "@/components/ui/section-title";
import ChooseCard from "@/components/ui/choose-card";
import ChoooseImageCard from "@/components/ui/choose-image-card";
import { WhyChoose1 ,WhyChoose2 ,WhyChoose3 ,WhyChoose4  } from "@/components/ui/svgs";

export default function WhyChoose() {
    return (
        <section className="section-padding relative lg:pt-[143px] pt-[73px] lg:pb-[150px] pb-[80px] bg-sah-dark-2 bg-[url('/whychoose-shape.png')] bg-no-repeat bg-bottom">
            <div className="container mx-auto !px-0">
                <div className="flex flex-col items-center">
                    <div className="mb-[50px] flex flex-col items-start w-full sm:w-[580px]">
                        <Section_Title
                            subtitle="Why Choose us"
                            title=<> What makes us different </>
                            description="It’s not just about creating something good; it’s about designing, innovating, and collaborating to forge remarkable and unparalleled experiences."
                            class_name={{ subtitle: "!mb-[15px] text-left text-sah-white !tracking-normal text-[14px] sm:text-[16px]", title: "text-sah-white text-left !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[86px]", description: "text-sah-gray-1 text-center max-w-[870px] text-left text-sah-white" }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] auto-rows-auto">

                    {/* Row 1 */}
                    <div className="lg:col-span-1 lg:row-span-1  max-[1024px]:order-1">
                        <ChoooseImageCard
                            src="/choose-item-1.jpg"
                            alt="Luxury villa"
                        />
                    </div>

                    <div className="lg:col-span-1 lg:row-span-1 max-[1024px]:order-1">
                        <ChooseCard
                            icon={<WhyChoose1/>}
                            title="Affordable Realty Options"
                            desc="We prioritize clear communication and simplicity, making your property journey smooth and stress-free."
                            accent
                        />
                    </div>

                    {/* Tall image spanning 2 rows */}
                    <div className="lg:col-span-1 lg:row-span-2 relative max-[1024px]:order-1">
                        <ChoooseImageCard
                            src="/choose-item-2.jpg"
                            alt="Tropical resort with palms"
                            tall
                        />
                        <div className="lg:col-span-1 lg:col-start-3 lg:row-start-3 absolute bottom-[10px] left-[10px] right-[10px]">
                            <ChooseCard
                                icon={<WhyChoose2/>}
                                title="Building For Long-Term Value"
                                desc="Every project we develop is built with quality and vision, designed to benefit generations to come."
                                dark
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="lg:col-span-1 max-[1024px]:order-1">
                        <ChooseCard
                            icon={<WhyChoose3/>}
                            title="Hassle-Free Process"
                            desc="We prioritize clear communication and simplicity, making your property journey smooth and stress-free."
                        />
                    </div>

                    <div className="lg:col-span-1 max-[1024px]:order-1">
                        <ChooseCard
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