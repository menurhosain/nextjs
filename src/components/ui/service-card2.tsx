"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardTwoProps {
    icon?: React.ReactNode;
    title: any;
    description: string;
    image: string;
    href?: string;
    className?: string;
}

export function ServiceCardTwo({ icon, title, description, image, href = "#", className }: ServiceCardTwoProps) {
    return (
        <div className={cn("bg-white rounded-[12px] overflow-hidden flex flex-col p-[20px] pt-[50px] gap-[40px] sah-transition", className)}>
            <div className="px-[10px] flex flex-col gap-[33px]">
                <div className="flex items-start gap-4">
                    {icon && <div className="shrink-0 text-[48px] leading-none">{icon}</div>}

                    <Link href={href} className="text-sah-black font-semibold font-geist text-[30px] leading-[34px] hover:text-sah-red transition-colors duration-300 w-fit">
                        {title}
                    </Link>
                </div>

                <hr className="border-gray-200" />

                <p className="text-[16px] leading-[26px] text-sah-gray-2">{description}</p>
            </div>

            <div className="relative rounded-[12px] overflow-hidden">
                <img src={image} alt="Service" className="w-full h-auto" />
                <div className="group">
                    <Link
                        href={href}
                        className="absolute bottom-3 text-[11px] right-3 w-9 h-9 rounded-full bg-white hover:bg-sah-red hover:text-white flex items-center justify-center shadow sah-transition group-hover:rotate-45"
                    >
                        <svg viewBox="0 0 12 12">
                            <path d="M0 10.0576L8.36252 1.69511H2.90993L2.89581 0.0141261L11.2442 0V8.36252L9.56322 8.34839V2.8958L1.2007 11.2583L0 10.0576Z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
