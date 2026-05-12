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
    titleClass?: string;
    descClass?: string;
    mode?: "exclusive" | "multi";
    showControls?: boolean;
    defaultOpen?: number | number[];
}

export function FaqAccordion({
     items,
     className,
     titleClass,
     descClass,
     mode = "exclusive",
     showControls = false,
     defaultOpen,
 }: FaqAccordionProps) {
    const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
        if (defaultOpen === undefined) return new Set();
        return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
    });
    const [currentMode, setCurrentMode] = useState(mode);

    const isOpen = (i: number) => openIndices.has(i);
    const allOpen = openIndices.size === items.length;

    const toggle = (index: number) => {
        const next = new Set(openIndices);
        if (next.has(index)) {
            next.delete(index);
        } else {
            if (currentMode === "exclusive") next.clear();
            next.add(index);
        }
        setOpenIndices(next);
    };

    const expandAll = () => setOpenIndices(new Set(items.map((_, i) => i)));
    const collapseAll = () => setOpenIndices(new Set());

    return (
        <div className={cn("w-full", className)}>
            {showControls && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center bg-sah-light-4 rounded-[8px] p-1 gap-0.5">
                        {(["exclusive", "multi"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setCurrentMode(m)}
                                className={cn(
                                    "px-4 py-1.5 text-sm font-medium rounded-[6px] transition-all duration-200",
                                    currentMode === m
                                        ? "bg-sah-white text-sah-black shadow-sm"
                                        : "text-sah-gray-2 hover:text-sah-black"
                                )}
                            >
                                {m === "exclusive" ? "Single open" : "Multi open"}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={allOpen ? collapseAll : expandAll}
                        className="text-[13px] font-medium text-sah-gray-2 hover:text-sah-black transition-colors"
                    >
                        {allOpen ? "Collapse all" : "Expand all"}
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-[12px]">
                {items.map((item, index) => {
                    const open = isOpen(index);
                    const panelId = `faq-panel-${index}`;
                    return (
                        <div className="rounded-[12px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.04)]" key={index}>
                            <button
                                type="button"
                                onClick={() => toggle(index)}
                                aria-expanded={open}
                                aria-controls={panelId}
                                className={cn("w-full flex items-center gap-4 py-[18px] px-[30px] text-left", titleClass)}
                            >
                                <div className="flex-1 min-w-0">
                                    <span className="font-semibold text-sah-black text-[24px] block">
                                        {item.question}
                                    </span>
                                </div>
                                <span
                                    className={cn(
                                        "shrink-0 flex items-center justify-center transition-transform duration-300",
                                        open && "rotate-45"
                                    )}
                                >
                                    <svg viewBox="0 0 24 24"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
                                </span>
                            </button>

                            <div
                                id={panelId}
                                role="region"
                                aria-hidden={!open}
                                className="grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                            >
                                <div className="overflow-hidden">
                                    <p className={cn("text-sah-gray-2 text-[16px] leading-[24px] pb-[24px] px-[30px]", descClass)}>
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}