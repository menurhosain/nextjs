import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function ServicesDetailsPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="Detailed Service Overview Here" title=<>Delivering High-Quality Construction Services With Precision</> />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div></div>
            </Banner.Right>
        </Banner>
    );
}
