"use client";

import Lenis from "lenis";
import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
//
// gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            wheelMultiplier: 1.4,
            duration: 1.8,
            lerp: 0.5,
        });

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}
