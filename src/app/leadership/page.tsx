import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function LeadershipPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="Reliable Business Partners" title=<>Visionary Leadership Building Tomorrow’s Structures</> />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div></div>
            </Banner.Right>
        </Banner>
    );
}
