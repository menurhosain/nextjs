import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function ContactPage() {
    return (
        <Banner bg="/home-hero.mp4">
            <Left class_name="">
                <div className="flex flex-col justify-center">
                    <Banner_Title
                        subtitle="Reliable Business Partners"
                        title=<>
                            Let’s discuss your construction needs
                            <br /> with experts
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
