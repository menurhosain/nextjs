import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Testimonial from "@/components/sections/careers/testimonial";
import Careers from "@/components/sections/careers/careers";

export default function CareersPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Banner.Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Reliable Business Partners" title=<>Work on meaningful projects that shape communities</> />
                    </div>
                </Banner.Left>

                <Banner.Right>
                    <div></div>
                </Banner.Right>
            </Banner>
            <Careers />
            <Testimonial />
        </>
    );
}
