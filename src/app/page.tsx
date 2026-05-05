import Header from "@/components/layout/header/header";
import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import Projects from "@/components/sections/home/project";

export default function Home() {
    return (
        <>
            <Hero />
            <Service />

            <Projects />
        </>
    );
}
