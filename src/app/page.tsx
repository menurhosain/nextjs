import { headers } from "next/headers";
import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import Projects from "@/components/sections/home/project";
import About from "@/components/sections/home/about";
import Partner from "@/components/sections/home/partner";
import News from "@/components/sections/home/news";
import Career from "@/components/sections/home/career";
import { get_home_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import { get_service_cards } from "@/services/service_card.service";

export default async function Home() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [ content, service_cards ] = await Promise.all([get_home_page_content(locale), get_service_cards(locale)]);

    return (
        <>
            <Hero
                background={getStrapiMediaUrl(content?.banner_background)}
                titleNormal={content?.banner_title_normal}
                titleFancy={content?.banner_title_fancy}
                scrollLabel={content?.banner_scroll_now_label}
                counterLabel={content?.banner_counter_label}
                counterNumber={content?.banner_counter_number}
                buttonLabel={content?.banner_button_label}
                buttonLink={content?.banner_button_link}
            />
            <Service
                subTitle={content?.service_section_sub_title}
                titleNormal={content?.service_section_title_normal}
                titleAnimated={content?.service_section_title_animated}
                buttonLabelOne={content?.service_group_button_label_one}
                buttonLinkOne={content?.service_group_button_link_one}
                buttonLabelTwo={content?.service_group_button_label_two}
                buttonLinkTwo={content?.service_group_button_link_two}
				service_cards={service_cards}
            />
            <About />
            <Partner />
            <Projects />
            <Career />
            <News />
        </>
    );
}
