"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StackCardsProps {
    children: React.ReactNode;
    className?: string;
    sectionRef?: React.RefObject<HTMLElement | null>;
}

export function StackCards({ children, className = "", sectionRef }: StackCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = Array.from(container.children) as HTMLElement[];
        if (cards.length < 2) return;

        const cardH = cards[0].offsetHeight;
        const totalScroll = cards.slice(1).reduce((sum, card) => sum + card.offsetHeight, 0);
        const section = sectionRef?.current ?? container.closest("section");

        gsap.set(container, { position: "relative", height: cardH, overflow: "hidden" });
        gsap.set(cards, { position: "absolute", top: 0, left: 0, right: 0, width: "100%" });

        cards.forEach((card, i) => {
            gsap.set(card, { zIndex: i + 1 });
            if (i > 0) gsap.set(card, { y: cardH });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                start: "top-=100px top",
                end: `+=${totalScroll}`,
            },
        });

        cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, { y: 0, ease: "none", duration: 1 });
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [sectionRef]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
