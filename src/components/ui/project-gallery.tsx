"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectGallery({ images }: { images: string[] }) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="grid grid-cols-[200px_1fr] gap-3">
            <div className="no-scrollbar flex flex-col gap-[20px] h-[640px] overflow-hidden">
                {images.map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setSelected(i)}
                        className={`relative w-[200px] h-[200px] shrink-0 overflow-hidden cursor-pointer ${selected === i ? "border-4 border-sah-red" : ""}`}
                    >
                        <Image src={src} alt={`Project thumbnail ${i + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            <div key={selected} className="fade-in relative h-[640px] overflow-hidden">
                <Image src={images[selected]} alt="Project main image" fill className="object-cover" />
            </div>
        </div>
    );
}
