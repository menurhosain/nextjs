import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Contact from "@/components/sections//contact/contact";
import Map from "@/components/sections//contact/map";
import { headers } from "next/headers";
import { get_contact_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function ContactPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const content = await get_contact_page_content(locale);

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Reliable Business Partners"}
                            title={content?.banner?.banner_title || "Let's discuss your construction needs with experts"}
                        />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>
            <Contact
                form_title={content?.form_title}
                form_subtitle={content?.form_subtitle}
                form_submit_label={content?.form_submit_label}
                contact_image={getStrapiMediaUrl(content?.contact_image)}
                address_label={content?.address_label}
                address_value={content?.address_value}
                email_label={content?.email_label}
                email_value={content?.email_value}
                phone_label={content?.phone_label}
                phone_value={content?.phone_value}
                hours_label={content?.hours_label}
                hours_value={content?.hours_value}
                placeholder_first_name={content?.placeholder_first_name}
                placeholder_last_name={content?.placeholder_last_name}
                placeholder_email={content?.placeholder_email}
                placeholder_phone={content?.placeholder_phone}
                placeholder_message={content?.placeholder_message}
            />
            <Map embed_url={content?.map_embed_url} />
        </>
    );
}
