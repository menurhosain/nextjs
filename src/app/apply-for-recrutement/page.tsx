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
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">Apply for Recruitment</h1>
                        <p className="text-sm text-muted-foreground">Fill in the form below to submit your application.</p>
                    </div>
                    <ApplyForm />
                </div>
            </div>
        </>
    );
}
