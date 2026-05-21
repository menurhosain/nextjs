import Script from "next/script";
import RegisterApplicantForm from "./register-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_register_applicant_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { headers } from "next/headers";

export default async function RegisterApplicantPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const page = await get_register_applicant_page_content(locale);

    const bg = getStrapiMediaUrl(page?.banner?.banner_bg) || "/home-hero.mp4";
    const subtitle = page?.banner?.banner_label || "Building Trust And Excellence";
    const title = page?.banner?.banner_title || "Building Trust Through Quality Construction";

    return (
        <>
            <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
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

            <div className="py-[80px] lg:py-[150px] register-box flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-[24px] sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{page?.form_title || "Create an applicant account"}</h2>
                    <RegisterApplicantForm
                        first_name_label={page?.first_name_label}
                        last_name_label={page?.last_name_label}
                        email_label={page?.email_label}
                        username_label={page?.username_label}
                        password_label={page?.password_label}
                        confirm_password_label={page?.confirm_password_label}
                        phone_label={page?.phone_label}
                        location_label={page?.location_label}
                        first_name_placeholder={page?.first_name_placeholder}
                        last_name_placeholder={page?.last_name_placeholder}
                        email_placeholder={page?.email_placeholder}
                        username_placeholder={page?.username_placeholder}
                        phone_placeholder={page?.phone_placeholder}
                        location_placeholder={page?.location_placeholder}
                        submit_button_label={page?.submit_button_label}
                        submitting_label={page?.submitting_label}
                    />
                </div>
            </div>
        </>
    );
}
