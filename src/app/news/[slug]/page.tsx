import { get_news_item_by_slug, get_news_items } from "@/services/news.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import NewsItemView from "./page_view";

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";

    const [news, allPosts] = await Promise.all([
        get_news_item_by_slug(slug, locale),
        get_news_items(locale),
    ]);

    if (!news) notFound();

    const tagNames = news.tags.map((t) => t.name);
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug && p.tags.some((t) => tagNames.includes(t.name)))
        .slice(0, 3);

    // fallback: if no tag matches, show latest 3 posts
    const finalRelated = relatedPosts.length > 0
        ? relatedPosts
        : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

    return <NewsItemView news={news} relatedPosts={finalRelated} />;
}
