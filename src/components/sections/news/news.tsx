import NewsList from "@/components/sections/news/news-list";
import type { NewsItem, NewsTag } from "@/services/news.service";

type NewsProps = {
    posts: NewsItem[];
    tags: NewsTag[];
};

export default function News({ posts, tags }: NewsProps) {
    return (
        <section className="section-padding bg-sah-light-4">
            <NewsList posts={posts} tags={tags} />
        </section>
    );
}
