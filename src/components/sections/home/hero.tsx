import Link from "next/link";
import { StatCounter } from "@/components/ui/stat-counter";
import Banner from "@/components/ui/banner";
import { AngleArrow } from "@/components/ui/svgs";

export default function Hero() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col gap-[40px]">
                    <h1 className="text-white font-medium leading-[40px] sm:leading-[60px] xl:leading-[90px] tracking-[-0.05em]">
                        <span className="text-[44px] md:text-[60px] xl:text-[100px] font-geist">Leading Design</span>
                        <br />
                        <em className="italic text-[36px] md:text-[50px] xl:text-[84px] font-inter">& Build Contractor</em>
                    </h1>

                    <div className="h-[1px] w-[150px] md:w-[450px] bg-sah-white relative mb-[10px] sm:mb-[30px]">
                        <span className="h-[1px] absolute w-[50px] md:w-[80px] bg-sah-red"></span>
                    </div>

                    <Link href="/register" className="inline-flex items-center gap-[10px] bg-sah-red text-white text-[16px] font-bold px-[30px] py-[20px] rounded-[8px] w-fit">
                        You Like to Build?
                        <AngleArrow class_name="!w-[10px] !h-[10px]" />
                    </Link>

                    <div className="hidden md:flex flex flex-col items-center gap-3 bg-sah-overlay-dark-50 border border-white/20 rounded-full px-4 py-6 w-[60px]">
                        <span className="text-white text-xs font-medium tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">Scroll Now</span>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L7 17M7 17L1 11M7 17L13 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </Banner.Left>

            <Banner.Right>
                <div className="flex justify-start pt-[40px] sm:justify-end sm:pb-[100px]">
                    <div className="relative w-[280px] py-[20px] px-[15px] md:px-[30px] md:py-[50px] flex flex-col gap-3 bg-cover bg-center" style={{ backgroundImage: "url('/white-dots.jpg')" }}>
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sah-red" />
                        <StatCounter value={30} suffix="+" className="text-sah-red font-bold font-geist text-[50px] lg:text-[100px] leading-none" />
                        <span className="text-sah-gray-2 font-geist font-semibold text-[18px] lg:text-[22px] uppercase tracking-wide leading-snug">Leading Years in Construction</span>
                    </div>
                </div>
            </Banner.Right>
        </Banner>
    );
}
