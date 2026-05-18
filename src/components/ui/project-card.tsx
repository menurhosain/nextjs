import { cn } from "@/lib/utils";
import Image from "next/image";

type ProjectCardProps = {
    category: string;
    title: string;
    description: string;
    handover: string;
    location: string;
    image: string;
    class_name?: string;
};

export default function ProjectCard({ category, title, description, handover, location, image, class_name }: ProjectCardProps) {
    return (
        <div className={cn(
            "project-card group flex flex-col max-[1280px]:mb-6 md:flex-row border border-sah-light-3 rounded-sm overflow-hidden bg-sah-white",
            class_name
        )}>
            <div className="project-card-content flex flex-col justify-between w-[100%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-[1024px]:p-[20px] p-[36px] border-r border-sah-light-3 transition-colors duration-500">
                <div className="flex flex-col">
                    <span className="inline-flex w-fit mb-[14px] text-[16px] font-medium text-sah-black border border-sah-light-1 rounded-full px-[13px] py-[5px] transition-colors duration-500 group-hover:text-sah-white group-hover:border-sah-white/30">
                        {category}
                    </span>
                    <a href="#">
                        <h3 className="font-geist !font-medium text-sah-black text-[20px] 2xl:text-[30px] leading-[30px] 2xl:leading-[38px] mb-[20px] transition-colors duration-500 group-hover:text-sah-white pr-[30px]">{title}</h3>
                    </a>
                    <p className="font-inter md:opacity-0 transition-all group-hover:opacity-100 text-[15px] md:text-[17px] font-normal leading-[30px] text-sah-black mb-[30px] md:mb-[40px] duration-500 group-hover:text-sah-white">
                        {description}
                    </p>
                </div>
                <div className="flex max-[640px]:flex-col max-[640px]:gap-3 gap-10">
                    <div className="flex flex-col gap-1 max-[640px]:text-[15px] text-[18px] font-inter font-medium leading-[24px]">
                        <span className="text-sah-gray-2 transition-colors duration-500 group-hover:text-sah-white/70">Handover</span>
                        <span className="text-sah-black transition-colors duration-500 group-hover:text-sah-white">{handover}</span>
                    </div>
                    <div className="flex flex-col gap-1 max-[640px]:text-[15px] text-[18px] font-inter font-medium leading-[24px]">
                        <span className="text-sah-gray-2 transition-colors duration-500 group-hover:text-sah-white/70">Location</span>
                        <span className="text-sah-black transition-colors duration-500 group-hover:text-sah-white">{location}</span>
                    </div>
                </div>
            </div>

            <div className="w-[100%] md:w-[60%] lg:w-[60%] xl:w-[70%] md:min-h-[500px] max-[1024px]:!p-[20px] p-[36px] md:pl-[40px] lg:pl-[80px]">
                <div className="relative w-full h-full overflow-hidden">
                    <Image src={image} alt={title} fill className="object-cover !relative sm:absolute transition-transform duration-500 group-hover:scale-105" />
                </div>
            </div>
        </div>
    );
}
