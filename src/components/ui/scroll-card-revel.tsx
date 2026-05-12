"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollCardRevelProps = {
    children: React.ReactNode;
    className?: string;
    pin?: boolean;
    pinSpacing?: boolean;
    start?: string;
    end?: string;
};

export function ScrollCardRevel({ children, className, pin = true, pinSpacing = false, start = "top top+=350", end = "top top+=360" }: ScrollCardRevelProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = Array.from(container.children) as HTMLElement[];
        if (cards.length === 0) return;

        const lastCard = cards[cards.length - 1];

        const ctx = gsap.context(() => {
            for (const card of cards) {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start,
                        end,
                        pin,
                        pinSpacing,
                        endTrigger: lastCard,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, [pin, pinSpacing, start, end]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
