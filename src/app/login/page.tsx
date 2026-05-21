import LoginForm from "./login-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_login_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { headers } from "next/headers";

export default async function LoginPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const page = await get_login_page_content(locale);

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
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h1 className="text-[24px] sm:text-2xl font-bold text-gray-900 mb-6">
                        {page?.form_title || "Sign in"}
                    </h1>
                    <LoginForm
                        email_label={page?.email_label}
                        email_placeholder={page?.email_placeholder}
                        password_label={page?.password_label}
                        forgot_password_label={page?.forgot_password_label}
                        forgot_password_link={page?.forgot_password_link}
                        submit_button_label={page?.submit_button_label}
                        submitting_label={page?.submitting_label}
                    />
                </div>
            </div>
        </>
    );
}
