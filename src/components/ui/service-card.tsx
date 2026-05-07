import Link from "next/link";

interface ServiceCardProps {
    icon?: React.ReactNode;
    title: any;
    description: string;
    href?: string;
}

export function ServiceCard({ icon, title, description, href = "#" }: ServiceCardProps) {
    return (
        <div className="relative bg-sah-white rounded-[12px] p-[40px] flex flex-col gap-[30px] group">
            {/* Top-right corner bracket */}
            <div className="absolute top-5 right-5 w-3.5 h-3.5 transition-colors duration-500 border-t border-r border-sah-gray-3 group-hover:border-sah-red" />

            {/* Icon box — 60×60, user drops SVG inside */}
            <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">{icon}</div>

            {/* Title */}
            <h3 className="text-sah-black font-semibold font-geist text-[30px] mb-[40px] leading-[34px]">{title}</h3>

            {/* Description */}
            <p className="text-sah-gray-1 font-inter text-[18px] leading-[30px]">{description}</p>

            {/* CTA */}
            <Link
                href={href}
                className="text-sah-black font-inter font-medium text-[16px] underline underline-offset-4 decoration-sah-black w-fit mt-auto transition-colors hover:text-sah-red hover:decoration-sah-red"
            >
                Discover More
            </Link>
        </div>
    );
}
