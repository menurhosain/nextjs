import type { Metadata } from "next";
import { get_news_item_by_slug, get_news_items } from "@/services/news.service";
import { get_news_details_page_content } from "@/services/page_content.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import NewsItemView from "./page_view";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const news = await get_news_item_by_slug(slug, locale);

    if (!news) return {};

    return {
        title: news.title,
        description: news.excerpt || undefined,
        openGraph: {
            title: news.title,
            description: news.excerpt || undefined,
            ...(news.featuredImage && { images: [{ url: news.featuredImage }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: news.title,
            description: news.excerpt || undefined,
            ...(news.featuredImage && { images: [news.featuredImage] }),
        },
    };
}

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";

    const [news, allPosts, pageContent] = await Promise.all([
        get_news_item_by_slug(slug, locale),
        get_news_items(locale),
        get_news_details_page_content(locale),
    ]);

    if (!news) notFound();

    const tagNames = news.tags.map((t) => t.name);
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug && p.tags.some((t) => tagNames.includes(t.name)))
        .slice(0, 3);

    const finalRelated = relatedPosts.length > 0
        ? relatedPosts
        : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

    return (
        <NewsItemView
            news={news}
            relatedPosts={finalRelated}
            related_posts_label={pageContent?.related_posts_label ?? null}
            share_label={pageContent?.share_label ?? null}
            previous_article_label={pageContent?.previous_article_label ?? null}
            next_article_label={pageContent?.next_article_label ?? null}
        />
    );
}
