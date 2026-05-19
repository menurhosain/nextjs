"use client";
import { useState } from "react";
import Section_Title from "@/components/ui/section-title";
import Image from "next/image";
import { AngleArrow } from "@/components/ui/svgs";



export default function Careers() {
  const [hovered, setHovered] = useState(false);
    return (
        <>
            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] pt-[70px] lg:pt-[135px] pb-[63px] lg:pb-[140px] border-x border-sah-light-3 max-[1024px]:!px-4">
                    <div className="flex flex-col items-center">
                        <Section_Title
                            title=<> Build your future through collaboration </>
                            description="With us, your career is always moving forward. You’ll grow through continuous learning, guided by mentorship at every stage, while collaborating with diverse teams to broaden your skills, knowledge, and experience.Our leadership is rooted in strong values. Our culture reflects principles such as trust, openness, accountability, entrepreneurial spirit, integrity, and mutual respect—creating an environment where individuals and teams can truly thrive."
                            class_name={{ title: "max-w-[350px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[960px] text-sah-black text-center !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[86px]", description: "text-sah-gray-1 text-center max-w-[875px] mb-[38px]" }}
                        />
                        <a  href="#jobboard" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                        className={`
                            inline-flex items-center gap-[10px] px-3 sm:px-6 py-[9px] rounded-[8px] font-medium text-[14px] sm:text-[16px] transition-all duration-300 ease-in-out bg-sah-dark-2
                            ${hovered
                                ? "bg-sah-red text-white border-2 border-sah-red shadow-md translate-y-[-2px]"
                                : "bg-gray-900 text-white border-2 border-gray-900 shadow-sm"
                            }
                        `}
                        >
                        Start Your Career with Us
                        <AngleArrow class_name="!w-[11px] h-[11px]"/>

                        </a>
                        <div className="w-full p-[0px] sm:p-[15px] xl:p-[24px] max-[640px]:border-0 border border-sah-light-3 rounded-[6px] mt-[60px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
                            <div className=" max-[768px]:order-2">
                                <Image src="/careers-thumb-1.jpg" alt="" fill className="!h-full !w-full !relative rounded-[6px]" />
                            </div>
                            <div className="w-full relative bg-sah-white rounded-[6px] px-[15px] sm:px-[30px] pb-[25px] max-[768px]:order-0">
                                {/* Legend */}
                                <div className="mt-[30px] lg:mt-[55px] 2xl:mr-[50px] flex flex-col items-start gap-[12px] 2xl:pl-[120px] relative z-[5] ">
                                    <div className="flex items-start gap-2 md:max-w-[220px]">
                                        <span className="mt-1 w-3 h-3 bg-white border border-sah-light-3 flex-shrink-0" />
                                        <p className="text-[14px] text-sah-gray-2 leading-[22px]">
                                            Location where Khabourah has done work
                                        </p>
                                    </div> 
                                    <div className="flex items-start gap-2 md:max-w-[300px]">
                                        <span className="mt-1 w-3 h-3 bg-[#FA7575] flex-shrink-0" />
                                        <p className="text-[14px] text-sah-gray-2 leading-[22px] ">
                                            Location where Sabal Akhdar Police Station Complex
                                        </p>
                                    </div>
                                </div>
                                {/* Map */}
                                <div className="w-[52%] 2xl:w-full max-w-full mx-auto drop-shadow-lg mt-[20px] 2xl:mt-[-20px] relative z-[3]">
                                    <Image src="/careers-map-2.png" alt="" fill className="!h-auto !w-auto !relative" />
                                </div>
                            </div>
                            <div className="max-[1280px]:col-span-2 max-[768px]:col-span-1">
                                <Image src="/careers-thumb-2.jpg" alt="" fill className="!h-full !w-full max-[1280px]:!h-[380px] max-[768px]:!h-full !relative rounded-[6px] object-cover object-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



 
