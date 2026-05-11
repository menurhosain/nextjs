"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            wheelMultiplier: 1.4,
            duration: 1.8,
            lerp: 0.5,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(rafCallback);
        };
    }, []);

    return <>{children}</>;
}
