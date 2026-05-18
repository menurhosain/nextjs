import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    icon?: React.ReactNode;
    title: any;
    description: string;
    href?: string;
    class_name?: string;
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
    function ServiceCard({ icon, class_name, title, description, href = "#" }, ref) {
    return (
        <div ref={ref} className={cn(
            "relative bg-sah-white rounded-[12px] p-[20px] sm:p-[30px] xl:p-[40px] flex flex-col gap-[20px] xl:gap-[30px] group",
            class_name
        )}>
            {/* Top-right corner bracket */}
            <div className="absolute top-5 right-5 w-3.5 h-3.5 transition-all duration-500 border-t border-r border-sah-gray-3 group-hover:border-sah-red group-hover:w-6.5 group-hover:h-6.5" />

            {/* Icon box — 60×60, user drops SVG inside */}
            <Link href={href} className="text-[56px] flex items-start justify-start shrink-0 text-sah-gray-2 transition-transform duration-500 group-hover:scale-80 w-fit">{icon}</Link>

            {/* Title */}
            <Link href={href} className="text-sah-black font-semibold font-geist text-[24px] xl:text-[30px] mb-[5px] xl:mb-[40px] leading-[34px] hover:text-sah-red transition-colors duration-300 w-fit">{title}</Link>

            {/* Description */}
            <p className="text-sah-gray-1 font-inter text-[17px] leading-[30px]">{description}</p>

            {/* CTA */}
            <Link
                href={href}
                className="text-sah-black font-inter font-medium text-[16px] underline underline-offset-4 decoration-sah-black w-fit mt-auto transition-colors group-hover:text-sah-red group-hover:decoration-sah-red"
            >
                Discover More
            </Link>
        </div>
    );
});
