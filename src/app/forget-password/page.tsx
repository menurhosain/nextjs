import ForgetPasswordForm from "./forget-password-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_forget_password_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { headers } from "next/headers";

export default async function ForgetPasswordPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const page = await get_forget_password_page_content(locale);

    const bg       = getStrapiMediaUrl(page?.banner?.banner_bg) || "/home-hero.mp4";
    const subtitle = page?.banner?.banner_label || "Building Trust And Excellence";
    const title    = page?.banner?.banner_title  || "Building Trust Through Quality Construction";

    return (
        <>
            <Banner bg={bg} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={subtitle} title={title} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <div className="py-[80px] lg:py-[150px] flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-5 sm:p-8">
                    <ForgetPasswordForm
                        form_title={page?.form_title}
                        form_description={page?.form_description}
                        email_label={page?.email_label}
                        email_placeholder={page?.email_placeholder}
                        submit_button_label={page?.submit_button_label}
                        submitting_label={page?.submitting_label}
                        success_title={page?.success_title}
                        success_description={page?.success_description}
                    />
                    <p className="mt-6 text-center text-sm text-gray-500">
                        {page?.back_to_login_text || "Remember your password?"}{" "}
                        <a href={page?.back_to_login_link || "/login"} className="text-gray-900 font-medium hover:underline">
                            {page?.back_to_login_link_label || "Sign in"}
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
