import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_subcontracted_by_slug } from "@/services/subcontracted.service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const item = await get_subcontracted_by_slug(slug, locale);
    if (!item) return {};
    return { title: item.title };
}

export default async function SubcontractedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const item = await get_subcontracted_by_slug(slug, locale);

    if (!item) notFound();

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Subcontracted Project" title={item.title} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[143px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    <div className="grid grid-cols-1 xl:grid-cols-7 gap-10 xl:gap-16 items-start">
                        {/* Sidebar meta */}
                        <aside className="xl:col-span-2 xl:sticky xl:top-[30px]">
                            <div className="flex flex-col gap-6">
                                {item.experience && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Experience</span>
                                        <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">{item.experience}</p>
                                    </div>
                                )}
                                {item.deadline && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Deadline</span>
                                        <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">
                                            {new Date(item.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                        </p>
                                    </div>
                                )}
                                {item.locations && item.locations.length > 0 && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Location</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {item.locations.map((loc) => (
                                                <span key={loc.id} className="text-[14px] font-medium text-sah-dark-2 px-3 py-1 rounded-full bg-sah-light-4">
                                                    {loc.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <a
                                    href={`/apply-contractor/${item.slug}`}
                                    className="inline-flex items-center justify-center gap-2 bg-sah-dark-2 text-white text-[16px] font-medium px-8 py-4 rounded-full hover:bg-sah-red transition-colors duration-300 mt-4"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </aside>

                        {/* Project details */}
                        <div className="xl:col-span-5">
                            {item.details && item.details.length > 0 ? (
                                <div className="rich-content prose prose-lg max-w-none text-sah-gray-2 text-[16px] leading-[28px] font-medium">
                                    <BlocksRenderer content={item.details} />
                                </div>
                            ) : (
                                <p className="text-sah-gray-2 text-[16px] leading-[28px]">No details available for this project.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
