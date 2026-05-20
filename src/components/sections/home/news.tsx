import Section_Title from "@/components/ui/section-title";
import NewsCard from "@/components/ui/news-card";
import { ButtonModern } from "@/components/ui/button";
import type { NewsItem } from "@/services/news.service";

interface BlogProps {
    subTitle?: string;
    title?: string;
    description?: string;
    btnLabel?: string;
    btnLink?: string;
    posts?: NewsItem[];
}

const COL_SPANS = ["col-span-1 lg:col-span-2", "col-span-1 lg:col-span-3"];

export default function News({ subTitle, title, description, btnLabel, btnLink, posts = [] }: BlogProps) {
    return (
        <section className="section-padding  bg-[linear-gradient(180deg,#F5F5F5_10.56%,rgba(245,245,245,0.785561)_60.83%,rgba(245,245,245,0)_158.97%),url('/news-section-bg.jpg')] bg-contain bg-bottom bg-no-repeat">
            <div className="container mx-auto pt-[73px] pb-[80px] lg:pt-[140px] lg:pb-[150px] border-x border-sah-light-3 max-[1024px]:!px-4">
                <div className="flex flex-col">
                    <div className="mb-[20px] sm:mb-[40px] flex flex-col items-center text-center">
                        <Section_Title
                            subtitle={subTitle || "Blog & News"}
                            title={title || "Our latest news"}
                            description={description || "Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based."}
                            class_name={{ subtitle: "text-sah-black !mb-[15px]", title: "text-sah-black !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[90px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[90px]", description: "text-sah-gray-1 " }}
                        />
                    </div>
                    <div className="flex items-center justify-center mb-[40px] xl:mb-[70px]">
                        <ButtonModern link={btnLink || "#"} label={btnLabel || "View All News"} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-[300px] sm:grid-rows-[450px] xl:grid-rows-[630px] gap-[20px] md:gap-[30px]">
                        {posts.map((post, index) => (
                            <div key={post.documentId} className={COL_SPANS[index] ?? "col-span-1 lg:col-span-3"}>
                                <NewsCard
                                    href={`/news/${post.slug}`}
                                    imageParam={{ src: post.image }}
                                    metaParam={{
                                        author: post.author,
                                        category: post.tags.map((t) => t.name).join(", "),
                                    }}
                                    titleParam={{ title: post.title }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
