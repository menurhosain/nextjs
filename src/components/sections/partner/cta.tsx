"use client";
 
import { JSX, useState } from "react";
import Image from "next/image";

type CtaProps = {
  title?: string;
  description?: string;
};

 
export default function Cta({ title, description }: CtaProps) {
  const [hovered, setHovered] = useState(false);
 
  return (
    <section className="bg-sah-light-4 relative">
    <div className="container !max-w-[1720px] !px-[50px] pt-[140px] pb-[150px]  border-x border-sah-light-3 ">
      <div className="w-full flex flex-col md:flex-row items-start gap-[20px]">
 
        {/* LEFT: Map + Legend */}
        <div className="flex-shrink-0 w-full md:w-[550px] relative">
          {/* Legend */}
          <div className="mt-[55px] mr-[50px] flex flex-col items-end gap-[12px] pl-4 relative z-[5]">
            <div className="flex items-start gap-2 max-w-[310px]">
              <span className="mt-1 w-3 h-3 bg-white border border-sah-light-3 flex-shrink-0" />
              <p className="text-[14px] text-sah-gray-2 leading-[22px]">
                Location where Sumali General Hospital has done work
              </p>
            </div>
            <div className="flex items-start gap-2 max-w-[310px]">
              <span className="mt-1 w-3 h-3 bg-[#FA7575] flex-shrink-0" />
              <p className="text-[14px] text-sah-gray-2 leading-[22px] ">
                Location where Sumali General Hospital is currently pursuing or has pursued work
              </p>
            </div>
          </div>
        {/* Map */}
        <div className="w-full max-w-full mx-auto drop-shadow-lg mt-[-145px] relative z-[3]">
            <Image src="/cta-map.png" alt="" fill className="!h-auto !w-auto" />
        </div>
        </div>
 
        {/* RIGHT: Content Card */}
        <div className="flex-1 rounded-[16px] border border-sah-light-3 px-[60px] pb-[60px] pt-[55px] flex flex-col justify-center">
          <h2 className="text-[80px] font-medium text-sah-dark-2 leading-tight mb-[10px] tracking-tight">
            {title ? title : "We build with oman"}
          </h2>
          <p className="text-sah-gray-2 text-[16px] font-medium font-inter leading-[28px] mb-8">
            {description ? description : "Offsite operates a 200,000-square-foot manufacturing facility in central Alabama, designed to support high-efficiency production and precision engineering. The facility integrates advanced technologies, including Lincoln Python systems for streamlined steel processing, ABB robotics for accurate beam assembly, and a TopStation to optimize fabrication workflows. This modern setup ensures consistent quality, reduced material waste, faster turnaround times, and reliable output to meet the demands of complex construction and industrial projects."}
          </p>
 
          {/* CTA Button */}
          <div>
            <a 
              href="#"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`
                inline-flex items-center gap-[10px] px-6 py-3 rounded-[8px] font-medium text-[16px] transition-all duration-300 ease-in-out bg-sah-dark-2
                ${hovered
                  ? "bg-sah-red text-white border-2 border-sah-red shadow-md translate-y-[-2px]"
                  : "bg-gray-900 text-white border-2 border-gray-900 shadow-sm"
                }
              `}
            >
              Contact Us Now
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="!w-[11px] h-[11px]">
                    <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z" fill="white"/>
                </svg>

            </a>
          </div>
        </div>
 
      </div>
    </div>
    </section>
  );
}