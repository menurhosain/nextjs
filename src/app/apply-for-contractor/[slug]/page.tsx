import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import ApplyForm from "../apply-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_apply_contractor_content } from "@/services/apply_contractor.service";
import { get_job_by_slug } from "@/services/job.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const job = await get_job_by_slug(slug, locale);
    if (!job) return {};
    return { title: `Apply for ${job.title}` };
}

export default async function ApplyForContractorJobPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const headersList = await headers();
    const locale = headersList.get("x-locale") ?? "en";
    const [job, content] = await Promise.all([
        get_job_by_slug(slug, locale),
        get_apply_contractor_content(locale),
    ]);

    if (!job) notFound();

    return (
        <>
            <Banner bg={getStrapiMediaUrl(content?.banner?.banner_bg) || "/home-hero.mp4"} class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title
                            subtitle={content?.banner?.banner_label || "Career Opportunity"}
                            title={content?.banner?.banner_title || "Apply for Contractor"}
                        />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    <div className="w-full bg-white lg:max-w-[750px] max-[640px]:px-4 p-10 flex flex-col rounded-[6px] overflow-hidden mx-auto">
                        <div className="bg-sah-red max-[640px]:-mx-4 -mx-10 -mt-10 px-4 xl:px-10 pt-[30px] xl:pt-[50px] pb-[30px] xl:pb-[50px] mb-8">
                            <p className="text-red-200 text-[13px] font-medium uppercase tracking-widest mb-1">
                                Applying for
                            </p>
                            <h2 className="text-[26px] sm:text-[36px] font-medium text-white leading-[36px] sm:leading-[46px]">
                                {job.title}
                            </h2>
                            <p className="text-red-100 text-[17px] mt-2">
                                {content?.form_subtitle || "Submit your company details and supporting documents."}
                            </p>
                        </div>

                        <ApplyForm content={content} />
                    </div>
                </div>
            </section>
        </>
    );
}
