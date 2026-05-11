import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
export default function ProjectDetailsPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Banner.Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="Insights Into Project Work" title=<>Complete Insights Into Project Design And Delivery</> />
                </div>
            </Banner.Left>

            <Banner.Right>
                <div></div>
            </Banner.Right>
        </Banner>
    );
}
