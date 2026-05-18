import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import About from "@/components/sections/about/about";
import WhyChoose from "@/components/sections/about/whychoose";
import Service from "@/components/sections/about/service";
import Career from "@/components/sections/home/career";
import { get_service_cards } from "@/services/service_card.service";


export default async function AboutUsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [  service_cards ] = await Promise.all([get_service_cards(locale)]);

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle="Building Trust And Excellence"
                            title={<>
                                Building Trust Through <br /> Quality Construction <br /> Trust Through
                            </>}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <About/>
            <WhyChoose />
            <Service services={service_cards} />
            <Career />
        </>
    );
}
