import Link from "next/link";
import { StatCounter } from "@/components/ui/stat-counter";
import { Banner, Left, Right } from "@/components/ui/banner";
import { AngleArrow, DownCurveArrow } from "@/components/ui/svgs";
import TypewriterText from "@/components/ui/typewriter-text";

interface BannerProps {
    background?: string;
    titleNormal?: string;
    typewriterTexts?: string[];
    scrollLabel?: string;
    counterLabel?: string;
    counterNumber?: number;
    buttonLabel?: string;
    buttonLink?: string;
}

const FALLBACK_TYPEWRITER_TEXTS = ["& Build Contractor", "& Expert Renovation", "& Quality Finishes"];

export default function Hero({ background, titleNormal, typewriterTexts, scrollLabel, counterLabel, counterNumber, buttonLabel, buttonLink }: BannerProps) {
    const texts = typewriterTexts && typewriterTexts.length > 0 ? typewriterTexts : FALLBACK_TYPEWRITER_TEXTS;
    return (
        <Banner bg="/home-hero.mp4">
            <Left has_brand_shape={true}>
                <div className="flex flex-col max-[768px]:w-full">
                    <h1 className="text-white  font-medium leading-[20px] sm:leading-[30px] md:leading-[40px] lg:leading-[50px] xl:leading-[50px] 2xl:leading-[70px] tracking-[-0.05em] flex flex-col gap-[20px] sm:gap-[30px] mb-[35px]">
                        <span className="text-[36px] sm:text-[56px] lg:text-[70px] xl:text-[80px] 2xl:text-[100px] font-geist">{titleNormal || "Leading Design"}</span>
                        <em className="italic text-[30px] sm:text-[46px] lg:text-[54px] xl:text-[64px] 2xl:text-[84px] font-dm-serif">
                            <TypewriterText texts={texts} />
                        </em>
                    </h1>

                    <div className="h-[1px] w-[250px] sm:w-[350px] md:w-[390px] bg-sah-white/20 relative mb-[35px] sm:mb-[56px] ">
                        <span className="h-[1px] absolute w-[50px] md:w-[80px] bg-sah-red"></span>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-[10px] group bg-sah-red hover:bg-sah-white text-white hover:text-sah-red   text-[16px] font-bold px-[30px] py-[14px] rounded-[8px] w-fit transition duration-300"
                    >
                        You Like to Build?
                        <AngleArrow class_name="!w-[12px] !h-[12px] !fill-white group-hover:!fill-sah-red transition duration-300" />
                    </Link>

                    <span className="hidden md:flex flex flex-col items-center gap-3 bg-sah-overlay-dark-50 border border-white/30 rounded-full px-[12px] py-[16px] mt-[80px] w-[max-content]">
                        <span className="text-white text-[16px] font-normal capitalcase [writing-mode:vertical-rl] rotate-180">Scroll Now</span>
                        <DownCurveArrow class_name="!fill-sah-white !h-[20px] !w-[15px]" />
                    </span>
                </div>
            </Left>

            <Right>
                <div className="flex  justify-start pt-[40px] sm:justify-end sm:pb-[30px] md:pb-[100px] h-[100%] w-[max-content] mt-6 sm:mt-0 border-x border-sah-white/20 max-[768px]:border-0">
                    <div
                        className="relative rounded-[10px] w-[258px] sm:w-[288px] py-[20px] px-[15px] md:px-[30px] md:py-[42px] h-[max-content] flex flex-col gap-3 bg-cover bg-center mt-auto"
                        style={{ backgroundImage: "url('/white-dots.jpg')" }}
                    >
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sah-red" />
                        <StatCounter value={30} suffix="+" className="text-sah-red font-semibold font-geist text-[50px] lg:text-[100px] leading-none" />
                        <span className="text-sah-gray-1 font-geist font-semibold text-[18px] lg:text-[22px] uppercase tracking-wide leading-snug">Leading Years in Construction</span>
                    </div>
                </div>
            </Right>
        </Banner>
    );
}
