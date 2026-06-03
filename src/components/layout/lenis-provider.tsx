"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            wheelMultiplier: 1.4,
            duration: 1.8,
            lerp: 0.5,
        });

        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
