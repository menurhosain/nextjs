"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
    className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={cn("flex flex-col divide-y divide-gray-200", className)}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index}>
                        <button
                            type="button"
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between gap-4 py-5 text-left"
                        >
                            <span className="font-semibold text-sah-black text-[16px] leading-snug">
                                {item.question}
                            </span>
                            <span className={cn(
                                "shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-transform duration-300",
                                isOpen && "rotate-45"
                            )}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <line x1="6" y1="0" x2="6" y2="12" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                                    <line x1="0" y1="6" x2="12" y2="6" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className={cn(
                            "overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-96 pb-5" : "max-h-0"
                        )}>
                            <p className="text-sah-gray-2 text-[15px] leading-[26px]">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
