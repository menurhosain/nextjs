import Header from "@/components/layout/header/header";
import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";
import About from "@/components/sections/home/about";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Service />
            <About />
        </>
    );
}
