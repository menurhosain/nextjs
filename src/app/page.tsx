import Header from "@/components/layout/header/header";
import Hero from "@/components/sections/home/hero";
import Service from "@/components/sections/home/service";

export default function Home() {
    return (
        <>
            {<Hero />}
            <Service />
        </>
    );
}
