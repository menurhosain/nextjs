"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BrandShape } from "./svgs";

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];

function Banner({ bg, children, style, bgDirection = "right" }: { bg: string; children: React.ReactNode; style?: React.CSSProperties; bgDirection?: "left" | "right" }) {
    const isImage = IMAGE_EXTS.some((ext) => bg.toLowerCase().endsWith(ext));

    const [displayBg, setDisplayBg] = useState(bg);
    const [outgoingBg, setOutgoingBg] = useState<string | null>(null);
    const [animKey, setAnimKey] = useState(0);
    const displayBgRef = useRef(bg);

    useEffect(() => {
        if (!isImage || bg === displayBgRef.current) return;
        const old = displayBgRef.current;
        displayBgRef.current = bg;
        setOutgoingBg(old);
        setDisplayBg(bg);
        setAnimKey((k) => k + 1);
        const timer = setTimeout(() => setOutgoingBg(null), 500);
        return () => clearTimeout(timer);
    }, [bg, isImage]);

    const inClass = bgDirection === "right" ? "bg-slide-right" : "bg-slide-left";
    const outClass = bgDirection === "right" ? "bg-slide-out-left" : "bg-slide-out-right";

    return (
        <section className="2xl:h-[85vh] md:min-h-[780px] lg:min-h-[855px] xl:min-h-[955px] max-[768px]:py-18 relative w-full flex banner-overlay section-padding overflow-hidden  max-[1280px]:!px-4" style={{ ...style }}>
            {isImage ? (
                <>
                    {outgoingBg && <img key={`out-${animKey}`} src={outgoingBg} alt="" className={`absolute inset-0 h-full w-full object-cover z-[-2] ${outClass}`} />}
                    <img key={`in-${animKey}`} src={displayBg} alt="" className={`absolute inset-0 h-full w-full object-cover z-[-1] ${animKey > 0 ? inClass : ""}`} />
                </>
            ) : (
                <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover z-[-1]">
                    <source src={bg} type="video/mp4" />
                </video>
            )}
            <div className="container relative z-3 flex flex-col justify-center md:flex-row gap-[2%] max-[1280px]:!px-0">{children}</div>
        </section>
    );
}

function Left({ children, style, class_name, has_brand_shape = false }: { children: React.ReactNode; style?: React.CSSProperties; class_name?: string; has_brand_shape?: Boolean }) {
    return (
        <div className={cn("w-[100%] md:w-[60%]  pt-[100px] flex items-center", class_name)} style={{ ...style }}>
            {children}
            {has_brand_shape && <BrandShape class_name="absolute bottom-0 !fill-transparent !w-[100%] md:!w-[70%] !h-[400px] z-[-1]" />}
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[100%] md:w-[38%] flex flex-col items-end justify-end   ${className}`}>{children}</div>;
}

export { Banner, Left, Right };
