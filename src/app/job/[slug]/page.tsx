import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { get_job_by_slug } from "@/services/job.service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const job = await get_job_by_slug(slug, locale);
    if (!job) return {};
    return { title: job.title };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const job = await get_job_by_slug(slug, locale);

    if (!job) notFound();

    const applyLink = job.job_for === "applicant"
        ? `/apply-for-recrutement/${job.slug}`
        : `/apply-for-contractor/${job.slug}`;

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Career Opportunity" title={job.title} />
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
                                {job.employment_status && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Employment Type</span>
                                        <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">{job.employment_status}</p>
                                    </div>
                                )}
                                {job.experience && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Experience</span>
                                        <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">{job.experience}</p>
                                    </div>
                                )}
                                {job.deadline && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Application Deadline</span>
                                        <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">
                                            {new Date(job.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                        </p>
                                    </div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">For</span>
                                    <span className={`self-start text-[13px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${job.job_for === "applicant" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                                        {job.job_for === "applicant" ? "Applicant" : "Subcontractor"}
                                    </span>
                                </div>

                                {job.locations && job.locations.length > 0 && (
                                    <div>
                                        <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">Location</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {job.locations.map((loc) => (
                                                <span key={loc.id} className="text-[14px] font-medium text-sah-dark-2 px-3 py-1 rounded-full bg-sah-light-4">
                                                    {loc.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <a
                                    href={applyLink}
                                    className="inline-flex items-center justify-center gap-2 bg-sah-dark-2 text-white text-[16px] font-medium px-8 py-4 rounded-full hover:bg-sah-red transition-colors duration-300 mt-4"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </aside>

                        {/* Job details */}
                        <div className="xl:col-span-5">
                            {job.details && job.details.length > 0 ? (
                                <div className="rich-content prose prose-lg max-w-none text-sah-gray-2 text-[16px] leading-[28px] font-medium">
                                    <BlocksRenderer content={job.details} />
                                </div>
                            ) : (
                                <p className="text-sah-gray-2 text-[16px] leading-[28px]">No details available for this position.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
