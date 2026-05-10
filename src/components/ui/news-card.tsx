import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
    image: string;
    title: string;
    href?: string;
    author?: string;
    category?: string;
    alt?: string;
};

export default function NewsCard({ image, title, href = "#", author, category, alt }: NewsCardProps) {
    return (
        <article className="relative w-full h-full overflow-hidden rounded-2xl">
            <Link href={href} className="group block w-full h-full">
                <Image src={image} alt={alt ?? title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-8">
                    {(author || category) && (
                        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                            {author && (
                                <div className="flex items-center gap-2">
                                    <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" aria-hidden="true" />
                                    <span className="text-[16px] font-semibold capitalize  text-sah-white">{author}</span>
                                </div>
                            )}
                            {category && (
                                <div className="flex items-center gap-2">
                                    <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" aria-hidden="true" />
                                    <span className="text-[16px] font-semibold capitalize text-sah-white">{category}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <h3 className="mb-5 font-geist text-[22px] leading-[30px] md:text-[30px] font-semibold md:leading-[38px] text-sah-white max-w-[75%]">{title}</h3>
                    <span className="text-[16px] font-medium capitalize text-sah-white underline underline-offset-4 max-w-[75%]">Explore More</span>
                </div>
            </Link>
        </article>
    );
}
