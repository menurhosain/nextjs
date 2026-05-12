import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Service from "@/components/sections/service/service";

export default function ServicesPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Banner.Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle="Explore Our Core Services"
                            title={<> Delivering Reliable And Efficient Construction Services Today </>}
                        />
                    </div>
                </Banner.Left>

                <Banner.Right>
                    <div></div>
                </Banner.Right>
            </Banner>

            <Service />
        </>
    );
}
