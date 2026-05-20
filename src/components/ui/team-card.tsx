import { cn } from "@/lib/utils";
import Link from "next/link";

interface TeamCardProps {
    className?: string;
    titleClass?: string;
    roleClass?: string;
    image?: string;
    name?: string;
    role?: string;
    showContact? : boolean;
    email?: string;
    phone?: string;
}

export default function TeamCard(
    {
        className,
        titleClass,
        roleClass,
        image,
        name,
        role,
        showContact = false,
        email,
        phone,
    }: TeamCardProps) {

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
                <h4 className={cn("text-white font-geist font-semibold text-[20px] xl:text-[24px] leading-[30px]", titleClass)}>{name}</h4>
                <span className={cn("text-white text-[16px] font-normal", roleClass)}>{role}</span>
                {showContact &&
                    <div className="flex 2xl:items-center flex-col 2xl:flex-row gap-[10px] 2xl:gap-[30px] mt-[10px] md:mt-[20px]">
                        <Link href={`mailto:${email}`} className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">{email}</Link>
                        <Link href={`tel:${phone}`} className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">{phone}</Link>
                    </div>
                }
            </div>
        </div>
    );
}
