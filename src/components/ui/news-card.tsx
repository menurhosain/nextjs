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
                <img src={imageParam?.src} alt={imageParam?.alt ?? titleParam?.title} className={cn("h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", imageParam?.className)} />

                { overlay && (
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent", overlayParam?.className)} />
                )}

                <div className={cn("absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-8", contentClass)}>
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
                        <h3 className={cn("mb-5 font-geist text-[22px] leading-[30px] md:text-[30px] font-semibold md:leading-[38px] pr-[100px]", titleParam?.className)}>
                            <Link href={href} className={cn("text-sah-white hover:text-sah-red transition duration-300 line-clamp-2", titleParam?.linkClass)}>
                                {titleParam?.title}
                            </Link>
                        </h3>
                    )}

                    <span className="text-[16px] font-medium capitalize">
                        <Link href={href} className="underline underline-offset-4 text-sah-white hover:text-sah-red transition duration-300">Explore More</Link>
                    </span>
                </div>
            </div>
        </article>
    );
}
