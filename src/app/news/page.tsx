import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import News from "@/components/sections/news/news";
import { get_news_items, get_news_tags } from "@/services/news.service";

export default async function NewsPage() {
    const [posts, tags] = await Promise.all([get_news_items(), get_news_tags()]);

    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Reliable Business Partners" title="Our Latest News" />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <News posts={posts} tags={tags} />
        </>
    );
}
