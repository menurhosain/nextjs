"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            wheelMultiplier: 1.4,
            duration: 1.8,
            lerp: 0.5,
        });

        return () => lenis.destroy();
    }, [pathname]);

    return <>{children}</>;
}
