"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const arcRef = useRef<SVGCircleElement>(null);

    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;

            if (arcRef.current) {
                arcRef.current.style.strokeDashoffset = String(circumference - progress * circumference);
            }

            setVisible(scrollTop > 300);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [circumference]);

    const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div
            onClick={handleClick}
            role="button"
            aria-label="Back to top"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            className={`fixed bottom-[20px] right-[20px] z-[999] w-[40px] h-[40px] rounded-full bg-sah-red cursor-pointer transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <svg className="absolute inset-0 m-auto z-10" viewBox="0 0 24 24" width="18" height="18">
                <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" fill="#fff" />
            </svg>
            <svg className="absolute top-0 left-0 -rotate-90 !w-[40px] !h-[40px]">
                <circle cx="20" cy="20" r={radius} strokeWidth="2" fill="none" stroke="transparent" />
                <circle
                    ref={arcRef}
                    cx="20"
                    cy="20"
                    r={radius}
                    strokeWidth="2"
                    fill="none"
                    stroke="#fff"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
