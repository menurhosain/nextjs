import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Testimonial from "@/components/sections/careers/testimonial";
import Careers from "@/components/sections/careers/careers";
import JobCareers from "@/components/sections/careers/jobcareers";

export default function CareersPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Reliable Business Partners" title=<>Work on meaningful projects that shape communities</> />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <Careers />
            <JobCareers />
            <Testimonial />
        </>
    );
}
