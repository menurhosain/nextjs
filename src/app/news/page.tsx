import { headers } from "next/headers";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import News from "@/components/sections/news/news";
import { get_news_items, get_news_tags } from "@/services/news.service";
import { get_news_page_content } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function NewsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [posts, tags, page] = await Promise.all([get_news_items(), get_news_tags(), get_news_page_content(locale)]);
    const post_count = page?.post_per_page ?? 0;

    const bg = getStrapiMediaUrl(page?.Banner?.banner_bg) || "/home-hero.mp4";
    const subtitle = page?.Banner?.banner_label || "Reliable Business Partners";
    const title = page?.Banner?.banner_title || "Our Latest News";

    return (
        <>
            <Banner bg={bg} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={subtitle} title={title} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <News posts={posts} tags={tags} count={post_count} />
        </>
    );
}
