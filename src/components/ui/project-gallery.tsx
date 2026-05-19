"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const AUTOPLAY_INTERVAL = 5000;

export default function ProjectGallery({ images }: { images: string[] }) {
    const [selected, setSelected] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const clearTimers = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
    };

    const startAutoplay = useCallback(() => {
        clearTimers();
        setProgress(0);

        const TICK = 50;
        progressRef.current = setInterval(() => {
            setProgress((p) => Math.min(p + (TICK / AUTOPLAY_INTERVAL) * 100, 100));
        }, TICK);

        intervalRef.current = setInterval(() => {
            setSelected((prev) => {
                const next = (prev + 1) % images.length;
                return next;
            });
            setProgress(0);
        }, AUTOPLAY_INTERVAL);
    }, [images.length]);

    useEffect(() => {
        if (!paused) startAutoplay();
        else clearTimers();
        return clearTimers;
    }, [paused, startAutoplay]);

    const handleSelect = (i: number) => {
        setSelected(i);
        setProgress(0);
        if (!paused) startAutoplay();
    };

    return (
        <div
            className="grid grid-cols-[200px_1fr] gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Thumbnail strip */}
            <div className="no-scrollbar flex flex-col gap-[20px] h-[640px] overflow-hidden">
                {images.map((src, i) => (
                    <button
                        key={i}
                        ref={(el) => { thumbRefs.current[i] = el; }}
                        type="button"
                        onClick={() => handleSelect(i)}
                        className={`relative w-[200px] h-[200px] shrink-0 overflow-hidden cursor-pointer ${
                            selected === i ? "border-4 border-sah-red" : ""
                        }`}
                    >
                        <Image
                            src={src}
                            alt={`Project thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                        />

                        {/* Progress bar on active thumb */}
                        {selected === i && !paused && (
                            <div className="absolute bottom-0 left-0 h-1 bg-sah-red/30 transition-none"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Main image */}
            <div key={selected} className="fade-in relative h-[640px] overflow-hidden">
                <Image
                    src={images[selected]}
                    alt="Project main image"
                    fill
                    className="object-cover"
                />

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleSelect(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                selected === i
                                    ? "bg-white scale-125"
                                    : "bg-white/50 hover:bg-white/80"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
