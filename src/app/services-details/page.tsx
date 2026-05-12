import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import ServiceDetails from "@/components/sections/service-details/service-details";

export default function ServicesDetailsPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Detailed Service Overview Here" title={<>Delivering High-Quality Construction Services With Precision</>} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <ServiceDetails />
        </>
    );
}
