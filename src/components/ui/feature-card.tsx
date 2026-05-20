import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon?: any;
    step?: string;
    title?: string;
    description?: string;
    className?: string;
}

export default function FeatureCard({ icon, step, title, description, className }: FeatureCardProps) {
    return (
        <div className={cn(
            "flex flex-col group",
            className
        )}>
            <div className="flex items-start justify-between mb-[25px]">
                <div className="bg-white text-sah-dark-2 rounded-[3px] text-[42px] group-hover:bg-sah-red group-hover:text-white sah-transition flex items-center justify-center w-[70px] h-[70px]">
                    {icon}
                </div>
                <span className="text-white text-[16px] leading-[24px] font-medium">{step}</span>
            </div>
            <div className="flex flex-col gap-[18px]">
                <h3 className="text-white font-semibold text-[20px] 2xl:text-[24px] leading-[28px] font-geist">{title}</h3>
                <div className="relative w-[145px] h-px">
                    <div className="w-[70px] h-full bg-white mb-[-1px] sah-transition group-hover:w-full" />
                    <div className="w-full h-full bg-white/30" />
                </div>
                <p className="text-white text-[17px] leading-[28px] font-normal mt-[7px] font-inter">{description}</p>
            </div>
        </div>
    );
}
