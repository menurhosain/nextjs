import Link from "next/link";
import { cn } from "@/lib/utils";

type NewsCardProps = {
    className?: string;
    contentClass?: string;
    href?: string;
    metaParam?: {
        itemClass?: string;
        author?: string;
        category?: string;
        date?: string;
        separator?: boolean;
        separatorClass?: string;
    }
    imageParam?: {
        className?: string;
        src: string;
        alt?: string;
    }
    titleParam?: {
        className?: string;
        linkClass?: string;
        title: string;
    }
    overlayParam?: {
        overlay?: boolean;
        className?: string;
    }
};

export default function NewsCard({ className, contentClass, titleParam, metaParam, imageParam, overlayParam, href = "#" }: NewsCardProps){
    const { separator = true, ...rest } = metaParam || {};
    const { overlay = true, ...overlayRest } = overlayParam || {};
    return (
        <article className={cn("relative w-full h-full overflow-hidden rounded-2xl", className)}>
            <div className="block w-full h-full group">
                <img src={imageParam?.src} alt={imageParam?.alt ?? titleParam?.title} className={cn("h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] object-cover object-center max-[640px]:h-[350px]", imageParam?.className)} />

                { overlay && (
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent", overlayParam?.className)} />
                )}

                <div className={cn("absolute bottom-0 left-0 right-0 z-10 !p-5 xl:p-8 ", contentClass)}>
                    {metaParam && (
                        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                            {metaParam.author && (
                                <div className="flex items-center gap-2 opacity-90">
                                    { separator && (
                                        <span className={cn("h-[6px] w-[6px] shrink-0 rounded-full bg-white", metaParam?.separatorClass)} aria-hidden="true" />
                                    )}
                                    <span className={cn("text-[16px] font-medium capitalize  text-sah-white font-inter", metaParam?.itemClass)}>{metaParam.author}</span>
                                </div>
                            )}
                            {metaParam.category && (
                                <div className="flex items-center gap-2 opacity-90">
                                    { separator && (
                                        <span className={cn("h-[6px] w-[6px] shrink-0 rounded-full bg-white", metaParam?.separatorClass)} aria-hidden="true" />
                                    )}
                                    <span className={cn("text-[16px] font-medium capitalize  text-sah-white font-inter", metaParam?.itemClass)}>{metaParam.category}</span>
                                </div>
                            )}
                            {metaParam.date && (
                                <div className="flex items-center gap-2 opacity-90">
                                    { separator && (
                                        <span className={cn("h-[6px] w-[6px] shrink-0 rounded-full bg-white", metaParam?.separatorClass)} aria-hidden="true" />
                                    )}
                                    <span className={cn("text-[16px] font-medium capitalize  text-sah-white font-inter", metaParam?.itemClass)}>{metaParam.date}</span>
                                </div>
                            )}
                        </div>
                    )}

                    { titleParam?.title && (
                        <h3 className={cn("mb-1 sm:mb-5 font-geist text-[18px] sm:text-[24px] xl:text-[30px] leading-[1.3] font-semibold md:leading-[1.2em] 2xl:pr-[100px] ", titleParam?.className)}>
                            <a href={href} className={cn("text-sah-white hover:text-sah-red transition duration-300 line-clamp-2", titleParam?.linkClass)}>
                                {titleParam?.title}
                            </a>
                        </h3>
                    )}

                    <span className="text-[14px] sm:text-[16px] font-medium capitalize">
                        <a href={href} className="underline underline-offset-4 text-sah-white hover:text-sah-red transition duration-300">Explore More</a>
                    </span>
                </div>
            </div>
        </article>
    );
}
