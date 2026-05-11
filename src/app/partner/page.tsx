import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function PartnerPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title
                        subtitle="Reliable Business Partners"
                        title=<>
                            Trusted Partners <br /> Driving Construction Excellence
                        </>
                    />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div></div>
            </Banner.Right>
        </Banner>
    );
}
