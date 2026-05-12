import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamCardProps {
    image?: string;
    name?: string;
    role?: string;
    className?: string;
}

export default function TeamCard({ image, name, role, className }: TeamCardProps) {
    return (
        <div className={cn(
            "bg-sah-dark-3 rounded-[12px] p-[12px] pb-[20px] group",
            className
        )}>
            { image && (
            <div className="relative w-full rounded-[8px] mb-[20px] overflow-hidden">
                <img className="sah-transition group-hover:scale-107" src={image} alt={name ? name : "Team"} />
            </div>
            )}
            <div className="flex flex-col gap-1 px-[10px]">
                <span className="text-white font-semibold text-[24px] leading-[30px]">{name}</span>
                <span className="text-white text-[16px] font-normal">{role}</span>
            </div>
        </div>
    );
}
