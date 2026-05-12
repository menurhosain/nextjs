"use client";
import { useState } from "react";
import Section_Title from "@/components/ui/section-title";
import Image from "next/image";



export default function Careers() {
  const [hovered, setHovered] = useState(false);
    return (
        <>
            <section className="section-padding bg-sah-light-4">
                <div className="container !max-w-[1720px] !px-[50px] pt-[50px] lg:pt-[135px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
                    <div className="flex flex-col items-center">
                        <Section_Title
                            title=<> Build your future through collaboration </>
                            description="With us, your career is always moving forward. You’ll grow through continuous learning, guided by mentorship at every stage, while collaborating with diverse teams to broaden your skills, knowledge, and experience.Our leadership is rooted in strong values. Our culture reflects principles such as trust, openness, accountability, entrepreneurial spirit, integrity, and mutual respect—creating an environment where individuals and teams can truly thrive."
                            class_name={{ title: "xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[10px] text-center max-w-[950px] text-[70px] ", description: "text-sah-gray-1 text-center max-w-[875px] mb-[38px]" }}
                        />
                        <a  href="#" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                        className={`
                            inline-flex items-center gap-[10px] px-6 py-[9px] rounded-[8px] font-medium text-[16px] transition-all duration-300 ease-in-out bg-sah-dark-2
                            ${hovered
                                ? "bg-sah-red text-white border-2 border-sah-red shadow-md translate-y-[-2px]"
                                : "bg-gray-900 text-white border-2 border-gray-900 shadow-sm"
                            }
                        `}
                        >
                        Start Your Career with Us
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="!w-[11px] h-[11px]">
                                <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z" fill="white"/>
                            </svg>

                        </a>
                        <div className="w-full p-[24px] border border-sah-light-3 rounded-[6px] mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                            <div className="">
                                <Image src="/careers-thumb-1.jpg" alt="" fill className="!h-auto !w-auto !relative rounded-[6px]" />
                            </div>
                            <div className="w-full relative bg-sah-white rounded-[6px] px-[30px] pb-[40px]">
                                {/* Legend */}
                                <div className="mt-[55px] mr-[50px] flex flex-col items-start gap-[12px] pl-[120px] relative z-[5]">
                                    <div className="flex items-start gap-2 max-w-[220px]">
                                        <span className="mt-1 w-3 h-3 bg-white border border-sah-light-3 flex-shrink-0" />
                                        <p className="text-[14px] text-sah-gray-2 leading-[22px]">
                                            Location where Khabourah has done work
                                        </p>
                                    </div> 
                                    <div className="flex items-start gap-2 max-w-[300px]">
                                        <span className="mt-1 w-3 h-3 bg-[#FA7575] flex-shrink-0" />
                                        <p className="text-[14px] text-sah-gray-2 leading-[22px] ">
                                            Location where Sabal Akhdar Police Station Complex
                                        </p>
                                    </div>
                                </div>
                                {/* Map */}
                                <div className="w-full max-w-full mx-auto drop-shadow-lg mt-[-45px] relative z-[3]">
                                    <Image src="/cta-map.png" alt="" fill className="!h-auto !w-auto !relative" />
                                </div>
                            </div>
                            <div className="">
                                <Image src="/careers-thumb-2.jpg" alt="" fill className="!h-auto !w-auto !relative rounded-[6px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



 
