import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import About from "@/components/sections/about/about";


export default function AboutUsPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Banner.Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle="Building Trust And Excellence"
                            title=<>
                                Building Trust Through <br /> Quality Construction <br /> Trust Through
                            </>
                        />
                    </div>
                </Banner.Left>

                <Banner.Right>
                    <div></div>
                </Banner.Right>
            </Banner>

            <About/>
        </>
    );
}
