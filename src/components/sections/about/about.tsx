"use client"
import Section_Title from "@/components/ui/section-title";
import { useEffect, useRef, useState } from "react";
import { AboutDotIcon } from "@/components/ui/svgs";
import Image from "next/image";

interface StatCardProps {
  label: string;
  target: number;
  suffix: string;
}

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    if (!start) return;
 
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
 
    requestAnimationFrame(step);
  }, [start, target, duration]);
 
  return count;
}
 
function StatCard({ label, target, suffix }: StatCardProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(target, 2000, inView);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
 
  return (
    <div
      ref={ref}
      className="flex-1 bg-white rounded-[12px] p-3 lg:p-6 flex flex-col gap-5 transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] lg:text-[16px] text-sah-gray-2 font-medium tracking-wide">
          {label}
        </span>
        <AboutDotIcon/>
      </div>
 
      {/* Animated Value */}
      <p className="text-[36px] lg:text-[50px] font-bold text-gray-900 tracking-tight leading-none">
        {count}
        {suffix}
      </p>
    </div>
  );
}
 
const stats: StatCardProps[] = [
  { label: "Projects Delivered", target: 400, suffix: "+" },
  { label: "Years Of Experience", target: 30, suffix: "+" },
  { label: "Head Office Staff", target: 250, suffix: "+" },
];

export default function About() {
    return (
        <section className="section-padding relative pt-[73px] lg:pt-[143px] lg:pb-[150px] pb-[80px] relative bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center">
            <div className="container mx-auto !px-0">
                <div className="flex flex-col">
                    <div className="mb-[50px] flex flex-col items-center ">
                        <Section_Title
                            subtitle="About SAH"
                            title={<> SAH building company overview profile </>}
                            description="Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has established itself as a trusted name in the construction industry, delivering exceptional projects of the highest quality."
                            class_name={{ subtitle: "text-sah-black !mb-[15px] !tracking-normal text-[14px] sm:text-[16px]", title: "max-w-[350px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[870px] text-sah-black text-center !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[86px]", description: "text-sah-gray-1 text-center max-w-[870px]" }}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-[30px] xl:px-[125px]">
                        {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>
                    <div className="h-[400px] sm:h-[540px] bg-[url('/about/about-bg.jpg')] bg-cover bg-center rounded-[12px] mt-[60px] relative">
                        <div className="bg-sah-white rounded-[8px] px-[20px] sm:px-[40px] py-[20px] sm:py-[40px] absolute right-[16px] bottom-[16px] group w-[222px] sm:w-[355px]">
                            <div className="relative w-full">
                                <Image src="/about/about-award.png" alt="" fill className="transition-transform duration-500 group-hover:scale-105 !relative !h-auto !w-auto" />
                                <h3 className="font-geist text-[20px] sm:text-[28px] font-medium mt-[16px] leading-[34px]">Construction Project of the Year</h3>
                                <p className="text-[16px] text-sah-gray-2 mt-[16px]">Best Builder Award</p>
                                <span className="absolute right-[16px] top-[16px] text-[18px] text-sah-gray-3">2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}






