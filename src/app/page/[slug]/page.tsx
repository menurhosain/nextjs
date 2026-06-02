import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_page_by_slug } from "@/services/page.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const page = await get_page_by_slug(slug, locale);
    if (!page) return {};
    return { title: page.title };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log(slug);
    const locale = (await headers()).get("x-locale") ?? "en";
    const page = await get_page_by_slug(slug, locale);

    if (!page) notFound();

    const bg = getStrapiMediaUrl(page.banner?.banner_bg) || "/home-hero.mp4";

    return (
        <>
            <Banner bg={bg} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={page.banner?.banner_label} title={page.banner?.banner_title || page.title} />
                    </div>
                </Left>
                <Right>
                    <div />
                </Right>
            </Banner>

            <div className="container py-16 px-4">
                <div className="prose prose-lg max-w-none rich-content">
                    <BlocksRenderer content={page.content} />
                </div>
            </div>
        </>
    );
}
