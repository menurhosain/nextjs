import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function BecomeASubcontrctorPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Left class_name="">
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
    );
}
