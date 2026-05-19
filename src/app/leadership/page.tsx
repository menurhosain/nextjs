import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import LeadershipSection from "@/components/sections/leadership/leadership";
import Career from "@/components/sections/home/career";
import { get_career_cta_section_content } from "@/services/page_content.service";

export default async function LeadershipPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [ career] = await Promise.all([get_career_cta_section_content(locale)]);

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Reliable Business Partners" title="Visionary Leadership Building Tomorrow’s Structures"/>
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <LeadershipSection />

            <Career content={career} />
        </>
    );
}
