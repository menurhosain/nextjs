import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function ProjectsPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="Explore Our Recent Projects" title=<>Showcasing Our Latest Construction Projects And Achievements</> />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div></div>
            </Banner.Right>
        </Banner>
    );
}
