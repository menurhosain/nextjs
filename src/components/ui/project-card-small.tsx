import Link from "next/link";

type ProjectCardSmallProps = {
    scope: string;
    title: string;
    image: string;
    year: string;
    location: string;
    link: string;
};

export function ProjectCardSmall({ scope, title, image, year, location, link }: ProjectCardSmallProps) {
    return (
        <Link href={link}>
            <div className="bg-white group rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
                {/* Tag + Title */}
                <div className="flex items-start gap-5 min-h-[76px]">
                    <h3 className="font-geist text-[30px] group-hover:text-sah-red transition-colors duration-500 font-medium leading-[38px] text-sah-black">{title}</h3>
                    <span className="flex-shrink-0 border border-sah-light-2 rounded-full px-[14px] py-[5px] font-inter text-[16px] font-medium text-[#111111] whitespace-nowrap">{scope}</span>
                </div>

                {/* Image with info overlay */}
                <div className="relative rounded-xl overflow-hidden">
                    <img src={image} alt={title} className="w-full h-[440px] object-cover group-hover:scale-110 transition-scale duration-500" />
                    <div className="absolute bottom-4 right-4 bg-white rounded-xl px-[24px] py-[20px] grid grid-cols-[max-content_max-content] gap-x-[24px]">
                        <div className="flex flex-col">
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#555555]">Year</span>
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#111111]">{year}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#555555]">Location</span>
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#111111]">{location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
