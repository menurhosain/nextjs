import NewsList from "@/components/sections/news/news-list";
import { get_news_categories, get_news_posts } from "@/services/news.service";

export default async function News() {
    const [posts, categories] = await Promise.all([get_news_posts(), get_news_categories()]);

    if (!posts) {
        return (
            <section className="section-padding bg-sah-light-4">
                <div className="container flex items-center justify-center pt-[140px]">
                    <p className="text-sah-dark text-[18px]">Failed to load news. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section-padding bg-sah-light-4">
            <NewsList posts={posts} categories={categories} />
        </section>
    );
}
