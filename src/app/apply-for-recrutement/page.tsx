import type { Metadata } from "next";
import ApplyForm from "./apply-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export const metadata: Metadata = { title: "Apply for Recrutement" };

export default function ApplyForRecrutementPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="" title={metadata.title} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    <div className="w-full bg-white lg:max-w-[750px] max-[640px]:px-4 p-10 flex flex-col rounded-[6px] overflow-hidden mx-auto">
                        <div className="bg-sah-red max-[640px]:-mx-4 -mx-10 -mt-10 px-4 xl:px-10 pt-[30px] xl:pt-[50px] pb-[30px] xl:pb-[50px] mb-8">
                            <h2 className="text-[26px] sm:text-[36px] font-medium text-white leading-[36px] sm:leading-[46px]">
                                Apply for Recruitment
                            </h2>
                            <p className="text-red-100 text-[17px] mt-2">Fill in the form below to submit your application.</p>
                        </div>
                        <ApplyForm />
                    </div>
                </div>
            </section>
        </>
    );
}
