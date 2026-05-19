"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { AngleArrow } from "@/components/ui/svgs";

type CtaProps = {
  title?: string;
  description?: string;
};

export default function Cta({ title, description }: CtaProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="section-padding bg-sah-light-4 relative">
      <div className="container py-16 sm:py-16 lg:pt-[140px] lg:pb-[150px] border-x border-sah-light-3 px-4  max-[1024px]:!px-4">
        <div className="w-full flex max-[1024px]:flex-col-reverse flex-col lg:flex-row items-start gap-6 lg:gap-[20px]">

          {/* LEFT: Map + Legend */}
          <div className="flex-shrink-0 lg:w-[350px] xl:w-[550px] relative">
            {/* Legend */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start xl:items-end gap-4 lg:gap-[12px] lg:mt-[55px] mr-[0px] xl:mr-[50px] xl:pl-4 relative z-[5]">
              <div className="flex items-start gap-2 max-w-[280px] sm:max-w-[310px]">
                <span className="mt-1 w-3 h-3 bg-white border border-sah-light-3 flex-shrink-0" />
                <p className="text-[13px] sm:text-[14px] text-sah-gray-2 leading-[20px] sm:leading-[22px]">
                  Location where Sumali General Hospital has done work
                </p>
              </div>
              <div className="flex items-start gap-2 max-w-[280px] sm:max-w-[310px]">
                <span className="mt-1 w-3 h-3 bg-[#FA7575] flex-shrink-0" />
                <p className="text-[13px] sm:text-[14px] text-sah-gray-2 leading-[20px] sm:leading-[22px]">
                  Location where Sumali General Hospital is currently pursuing or has pursued work
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full max-w-full mx-auto drop-shadow-lg max-[1024px]:mt-[30px] xl:mt-[-95px] 2xl:mt-[-115px] relative z-[3]">
              <Image
                src="/cta-map.png"
                alt=""
                fill
                className="!h-auto !w-auto max-[1024px]:!relative"
              />
            </div>
          </div>

          {/* RIGHT: Content Card */}
          <div className="flex-1 w-full rounded-[16px] border border-sah-light-3 px-4 xl:px-[40px] 2xl:px-[60px] pb-4 xl:pb-[40px] 2xl:pb-[60px] pt-5 xl:pt-[35px] 2xl:pt-[55px] flex flex-col justify-center">
            <h2 className="text-[30px] sm:text-[38px] md:text-[46px] xl:text-[60px] 2xl:text-[80px] font-medium text-sah-dark-2 leading-[1.2] mb-[10px] tracking-tight">
              {title ?? "We build with oman"}
            </h2>
            <p className="text-sah-gray-2 text-[14px] sm:text-[15px] md:text-[16px] font-medium font-inter leading-[26px] sm:leading-[28px] mb-6 sm:mb-8">
              {description ??
                "Offsite operates a 200,000-square-foot manufacturing facility in central Alabama, designed to support high-efficiency production and precision engineering. The facility integrates advanced technologies, including Lincoln Python systems for streamlined steel processing, ABB robotics for accurate beam assembly, and a TopStation to optimize fabrication workflows. This modern setup ensures consistent quality, reduced material waste, faster turnaround times, and reliable output to meet the demands of complex construction and industrial projects."}
            </p>

            {/* CTA Button */}
            <div>
              <a
                href="#"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`
                  inline-flex items-center gap-[10px] px-3 sm:px-6 py-2.5 sm:py-3 rounded-[8px] font-medium text-[14px] sm:text-[16px] transition-all duration-300 ease-in-out
                  ${hovered
                    ? "bg-sah-red text-white border-2 border-sah-red shadow-md -translate-y-0.5"
                    : "bg-sah-dark-2 text-white border-2 border-gray-900 shadow-sm"
                  }
                `}
              >
                Contact Us Now
                <AngleArrow class_name="!w-[11px] h-[11px]" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}