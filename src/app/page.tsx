import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import Projects from "@/components/sections/home/project";
import About from "@/components/sections/home/about";
import News from "@/components/sections/home/news";
import Career from "@/components/sections/home/career";

export default function Home() {
    return (
        <>
            <Hero />
            <Service />
            {
                //<About />
            }
            <Projects />
            <Career />
            <News />
        </>
    );
}
