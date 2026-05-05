import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import Projects from "@/components/sections/home/project";
import About from "@/components/sections/home/about";

export default function Home() {
    return (
        <>
            <Hero />
            <Service />
            <About />
            <Projects />
        </>
    );
}
