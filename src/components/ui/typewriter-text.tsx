"use client";

import { useEffect, useState } from "react";

type Props = {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
};

export default function TypewriterText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 40,
    pauseDuration = 1800,
}: Props) {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!texts || texts.length === 0) return;

        const current = texts[index % texts.length];

        if (isPaused) {
            const timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                setDisplayText(current.slice(0, displayText.length + 1));
                if (displayText.length + 1 === current.length) {
                    setIsPaused(true);
                }
            } else {
                // Deleting
                setDisplayText(current.slice(0, displayText.length - 1));
                if (displayText.length - 1 === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isPaused, index, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <>
            {displayText}
            <span className="inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle animate-pulse" />
        </>
    );
}
