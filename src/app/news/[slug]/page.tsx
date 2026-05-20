import { get_news_item_by_slug } from "@/services/news.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import NewsItemView from "./page_view";

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const news = await get_news_item_by_slug(slug, locale);

    if (!news) notFound();

    return <NewsItemView news={news} />;
}
