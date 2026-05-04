import Link from "next/link";

interface ServiceCardProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    href?: string;
}

export function ServiceCard({ icon, title, description, href = "#" }: ServiceCardProps) {
    return (
        <div className="relative bg-sah-white border border-sah-light-3 rounded-3xl p-10 flex flex-col gap-8">
            {/* Top-right corner bracket */}
            <div className="absolute top-5 right-5 w-3.5 h-3.5 border-t border-r border-sah-gray-3" />

            {/* Icon box — 60×60, user drops SVG inside */}
            <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">{icon}</div>

            {/* Title */}
            <h3 className="text-sah-black font-bold font-geist text-[22px] leading-[1.3]">{title}</h3>

            {/* Description */}
            <p className="text-sah-gray-2 text-[15px] leading-relaxed">{description}</p>

            {/* CTA */}
            <Link
                href={href}
                className="text-sah-black font-medium text-[15px] underline underline-offset-4 decoration-sah-black w-fit mt-auto transition-colors hover:text-sah-red hover:decoration-sah-red"
            >
                Discover More
            </Link>
        </div>
    );
}
