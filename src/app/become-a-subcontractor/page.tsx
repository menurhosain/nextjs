import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Subcontractor from "@/components/sections/become-a-subcontractor/subcontractor";
import Cta from "@/components/sections/become-a-subcontractor/cta";

export default function BecomeASubcontrctorPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle="Reliable Business Partners"
                            title=<>
                                Become a valued subcontractor in
                                <br /> our network
                            </>
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <Subcontractor/>
            <Cta/>
        </>
    );
}
