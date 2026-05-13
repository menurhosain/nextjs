import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Service from "@/components/sections/service/service";
import FaqSection from "@/components/sections/service/faq";

export default function ServicesPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle="Explore Our Core Services"
                            title={<> Delivering Reliable And Efficient Construction Services Today </>}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <Service />

            <FaqSection />
        </>
    );
}
