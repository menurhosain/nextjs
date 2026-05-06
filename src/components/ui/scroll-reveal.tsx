"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    /** Any child element with this class will have its text animated on scroll. Defaults to "scroll-color". */
    revealClass?: string;
    /** CSS color value characters animate TO on scroll (hex, rgb, hsl, CSS variable). Defaults to full opacity of the element's own color. */
    toColor?: string;
}

export function ScrollReveal({ children, className, revealClass = "scroll-color", toColor }: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const splits: InstanceType<typeof SplitText>[] = [];

        const ctx = gsap.context(() => {
            const elements = container.querySelectorAll<HTMLElement>(`.${revealClass}`);

            elements.forEach((el) => {
                const computed = window.getComputedStyle(el).color;
                const startColor = computed;
                const endColor = toColor ?? toFullOpacity(computed);

                const split = new SplitText(el, { type: "words, chars" });
                splits.push(split);

                gsap.set(split.chars, { color: startColor });

                gsap.to(split.chars, {
                    color: endColor,
                    stagger: { each: 0.03, from: "start" },
                    scrollTrigger: {
                        trigger: container,
                        start: "top 70%",
                        end: "bottom 30%",
                        scrub: 1,
                    },
                });
            });
        }, containerRef);

        return () => {
            ctx.revert();
            splits.forEach((s) => s.revert());
        };
    }, [revealClass, toColor]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}

function toFullOpacity(color: string): string {
    if (color.startsWith("rgba")) {
        return color.replace(/,\s*[\d.]+\)$/, ", 1)");
    }
    return color;
}
