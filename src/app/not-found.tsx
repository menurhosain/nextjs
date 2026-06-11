import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function NotFound() {
    return (
        <Banner bg="/home-hero.mp4" >
            <Left class_name="max-[640px]:pt-[70px]">
                <div className="flex flex-col justify-center">
                    <Banner_Title subtitle="404 — Page Not Found" title="This page could not be found." />
                </div>
            </Left>
            <Right>
                <div></div>
            </Right>
        </Banner>
    );
}
