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
        <article className="w-full max-w-[490px] rounded-[30px] p-[10px] sm:p-[15px]">
            <Link href={href} className="group block">
                <div className="relative mb-[36px] aspect-[1.18/1] overflow-hidden rounded-[12px]">
                    <Image src={image} alt={alt ?? title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>

                {(author || category) && (
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-base md:leading-[30px] xl:leading-[40px] text-sah-gray-2">
                        {author && (
                            <div className="grid grid-cols-[1fr_max-content] items-center gap-[10px]">
                                <span className="h-[10px] w-[10px] rounded-full bg-sah-gray-2" aria-hidden="true" />
                                <span className="mr-[30px]">{author}</span>
                            </div>
                        )}

                        {category && (
                            <div className="grid grid-cols-[1fr_max-content] items-center gap-[10px]">
                                <span className="h-[10px] w-[10px] rounded-full bg-sah-gray-2" aria-hidden="true" />
                                <span>{category}</span>
                            </div>
                        )}
                    </div>
                )}

                <h3 className="max-w-[90%] font-geist md:text-[24px] xl:text-[30px] md:leading-[36px] xl:leading-[46px] font-semibold text-sah-black transition-colors duration-300 group-hover:text-sah-red">
                    {title}
                </h3>
            </Link>
        </article>
    );
}
