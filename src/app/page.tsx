import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import Projects from "@/components/sections/home/project";
import About from "@/components/sections/home/about";
import Partner from "@/components/sections/home/partner";
import News from "@/components/sections/home/news";
import Career from "@/components/sections/home/career";
import { get_home_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function Home() {
    const locale = "en";
    const content= await get_home_page_content(locale);
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
            <Service />
            <About />
            <Partner />
            <Projects />
            <Career />
            <News />
        </>
    );
}
