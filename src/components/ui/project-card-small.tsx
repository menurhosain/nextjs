import Link from "next/link";

type ProjectCardSmallProps = {
    scope: string[];
    title: string;
    slug: string;
    image: string;
    year: string;
    location: string[];
    link: string;
    yearLabel?: string;
    locationLabel?: string;
};

export function ProjectCardSmall({ scope, title, image, year, location, link, yearLabel = "Year", locationLabel = "Location" }: ProjectCardSmallProps) {
    return (
        <Link href={link}>
            <div className="bg-white group rounded-2xl p-3 sm:p-5 flex flex-col gap-5 shadow-sm">
                {/* Tag + Title */}
                <div className="min-h-[80px] relative">
                    <h3 className="font-geist text-[18px] max-[640px]:leading-[24px] sm:text-[22px] xl:text-[26px] 2xl:text-[30px] group-hover:text-sah-red transition-colors duration-500 font-medium leading-[38px] text-sah-black max-[640px]:mb-2">
                        {title}
                    </h3>
                    <span className="border sm:absolute end-0 bottom-0 border-sah-light-2 rounded-full px-[14px] py-[5px] font-inter text-[16px] font-medium text-[#111111] whitespace-nowrap">
                        {scope[0]}
                    </span>
                </div>

                {/* Image with info overlay */}
                <div className="relative rounded-xl overflow-hidden">
                    <img src={image} alt={title} className="w-full h-[300px] sm:h-[340px] xl:h-[440px] object-cover group-hover:scale-110 transition-scale duration-500" />
                    <div className="absolute bottom-4 end-4 bg-white rounded-xl px-[24px] py-[20px] max-[640px]:block grid grid-cols-[max-content_max-content] gap-x-[24px]">
                        <div className="flex flex-col max-[640px]:mb-2">
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#555555]">{yearLabel}</span>
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#111111]">{year}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#555555]">{locationLabel}</span>
                            <span className="font-inter text-[16px] font-medium leading-[24px] text-[#111111]">{location[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
