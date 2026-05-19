import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Testimonial from "@/components/sections/careers/testimonial";
import Careers from "@/components/sections/careers/careers";
import JobCareers from "@/components/sections/careers/jobcareers";

export default function CareersPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
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
