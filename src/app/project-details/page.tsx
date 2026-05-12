import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { DownLongArrow } from "@/components/ui/svgs";
export default function ProjectDetailsPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="Insights Into Project Work" title=<>Complete Insights Into Project Design And Delivery</> />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div className="flex items-stretch gap-4 w-full pb-10">
                    {/* col 1: arrows + divider */}
                    <div className="flex flex-col justify-between">
                        <DownLongArrow class_name="!fill-sah-white w-3 h-3 -rotate-90" />
                        <div className="w-5 h-[1px] bg-sah-white" />
                        <DownLongArrow class_name="!fill-sah-white w-3 h-3 rotate-90" />
                    </div>
                    {/* col 2: label + title */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sah-white font-bold text-[16px] leading-[20px] uppercase tracking-wider">Architecture</span>
                        <h2 className="font-geist font-normal text-[30px] leading-[38px] text-sah-white underline">
                            Police College Package C SQAPS Nizwa
                        </h2>
                    </div>
                </div>
            </Banner.Right>
        </Banner>
    );
}
