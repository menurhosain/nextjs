import Image from "next/image";

type ProjectCardProps = {
    category: string;
    title: string;
    description: string;
    handover: string;
    location: string;
    image: string;
};

export default function ProjectCard({ category, title, description, handover, location, image }: ProjectCardProps) {
    return (
        <div className="group flex border border-sah-light-3 rounded-sm overflow-hidden bg-sah-white">
            <div className="flex flex-col justify-between w-[30%] p-[36px] border-r border-sah-light-3 transition-colors duration-500 group-hover:bg-sah-red">
                <div className="flex flex-col">
                    <span className="inline-flex w-fit mb-[24px] text-base font-medium text-sah-black border border-sah-light-1 rounded-full px-[13px] py-[5px] transition-colors duration-500 group-hover:text-sah-white group-hover:border-sah-white/30">
                        {category}
                    </span>
                    <a href="#">
                        <h3 className="font-geist font-semibold text-sah-black text-[30px] leading-[38px] mb-[30px] transition-colors duration-500 group-hover:text-sah-white">{title}</h3>
                    </a>
                    <p className="font-inter text-[18px] font-normal leading-[30px] text-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:text-sah-white">
                        {description}
                    </p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-1 text-base font-inter font-medium leading-[24px]">
                        <span className="text-sah-gray-2 transition-colors duration-500 group-hover:text-sah-white/70">Handover</span>
                        <span className="text-sah-black transition-colors duration-500 group-hover:text-sah-white">{handover}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-base font-inter font-medium leading-[24px]">
                        <span className="text-sah-gray-2 transition-colors duration-500 group-hover:text-sah-white/70">Location</span>
                        <span className="text-sah-black transition-colors duration-500 group-hover:text-sah-white">{location}</span>
                    </div>
                </div>
            </div>
            <div className="w-[70%] min-h-[500px] p-[36px] md:pl-[80px]">
                <div className="relative w-full h-full">
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>
            </div>
        </div>
    );
}
