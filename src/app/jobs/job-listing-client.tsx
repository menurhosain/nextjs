"use client";

import { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { cn } from "@/lib/utils";
import type { Job } from "@/services/job.service";

function MapPinIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 640 640" className="w-[15px] h-[15px] shrink-0 fill-current">
            <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM224 320C206.3 320 192 334.3 192 352L192 416C192 433.7 206.3 448 224 448L288 448C305.7 448 320 433.7 320 416L320 352C320 334.3 305.7 320 288 320L224 320z" />
        </svg>
    );
}

type Props = {
    jobs: Job[];
    result_singular_label?: string | null;
    result_plural_label?: string | null;
    result_found_label?: string | null;
    employment_type_label?: string | null;
    experience_label?: string | null;
    deadline_label?: string | null;
    location_label?: string | null;
    apply_button_label?: string | null;
    no_details_text?: string | null;
};

export default function JobListingClient({
    jobs,
    result_singular_label,
    result_plural_label,
    result_found_label,
    employment_type_label,
    experience_label,
    deadline_label,
    location_label,
    apply_button_label,
    no_details_text,
}: Props) {
    const [cur_job, set_cur_job] = useState(jobs[0]);

    useEffect(() => {
        set_cur_job(jobs[0]);
    }, [jobs]);

    return (
        <div className="flex gap-6">
            {/* Left column — 30% listing */}
            <div className="w-[30%] shrink-0">
                <p className="text-[14px] text-sah-gray-2 font-medium mb-5">
                    {jobs.length} {jobs.length === 1 ? (result_singular_label ?? "position") : (result_plural_label ?? "positions")} {result_found_label ?? "found"}
                </p>

                <div className="grid grid-cols-1 gap-5">
                    {jobs.map((job) => (
                        <a
                            key={job.id}
                            href={`/jobs/${job.slug}`}
                            className={cn(
                                "group flex flex-col gap-4 bg-white border border-sah-light-3 hover:border-sah-red rounded-[10px] p-6 transition-all duration-300 hover:shadow-md",
                                job.id === cur_job?.id ? "border-sah-red" : "",
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                set_cur_job(job);
                            }}
                        >
                            <div>
                                <h3 className="text-[18px] font-semibold text-sah-red leading-snug group-hover:underline">{job.title}</h3>
                                {job.employment_status && <p className="text-[14px] font-medium text-sah-dark-2 mt-1">{job.employment_status}</p>}
                            </div>

                            {job.locations && job.locations.length > 0 && (
                                <div className="flex items-center gap-2 text-sah-gray-2">
                                    <MapPinIcon />
                                    <span className="text-[14px] font-medium">{job.locations.map((l) => l.name).join(", ")}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-4 pt-2 border-t border-sah-light-3 mt-auto">
                                {job.experience ? (
                                    <div className="flex items-center gap-2 text-sah-gray-2">
                                        <BriefcaseIcon />
                                        <span className="text-[13px] font-medium">{job.experience}</span>
                                    </div>
                                ) : (
                                    <span />
                                )}
                                {job.deadline && (
                                    <div className="flex items-center gap-2 text-sah-gray-2">
                                        <CalendarIcon />
                                        <span className="text-[13px] font-medium">
                                            {new Date(job.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Right column — 70% detail */}
            <div className="flex-1 xl:sticky xl:top-[30px]">
                <section className="section-padding">
                    <div className="container !px-[50px] max-[1024px]:!px-4 pt-[30px] lg:pt-[30px] pb-[30px] lg:pb-[30px] border rounded-lg border-sah-red">
                        <div className="grid grid-cols-1 xl:grid-cols-7 gap-y-5 items-start">
                            <h3 className="col-span-full font-semibold text-[24px]">{cur_job?.title}</h3>

                            <aside className="xl:col-span-full">
                                <div className="flex flex-wrap gap-x-[50px]">
                                    {cur_job?.employment_status && (
                                        <div>
                                            <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">{employment_type_label ?? "Employment Type"}</span>
                                            <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">{cur_job.employment_status}</p>
                                        </div>
                                    )}
                                    {cur_job?.experience && (
                                        <div>
                                            <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">{experience_label ?? "Experience"}</span>
                                            <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">{cur_job.experience}</p>
                                        </div>
                                    )}
                                    {cur_job?.deadline && (
                                        <div>
                                            <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">{deadline_label ?? "Application Deadline"}</span>
                                            <p className="text-[18px] font-semibold text-sah-dark-2 mt-1">
                                                {new Date(cur_job.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </p>
                                        </div>
                                    )}
                                    {cur_job?.locations && cur_job.locations.length > 0 && (
                                        <div>
                                            <span className="text-[12px] uppercase tracking-widest text-sah-gray-2 font-medium">{location_label ?? "Location"}</span>
                                            <div className="flex flex-wrap gap-2">
                                                {cur_job.locations.map((loc) => (
                                                    <p key={loc.id} className="text-[18px] font-semibold text-sah-dark-2 mt-1">{loc.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="w-full" />
                                    <a
                                        href={`/apply-for-recrutement/${cur_job?.slug}`}
                                        className="inline-flex w-[200px] items-center justify-center gap-2 bg-sah-dark-2 text-white text-[16px] font-medium px-8 py-2 rounded-[8px] hover:bg-sah-red transition-colors duration-300 my-4"
                                    >
                                        {apply_button_label ?? "Apply Now"}
                                    </a>
                                </div>
                            </aside>

                            <div className="xl:col-span-full">
                                {cur_job?.details && cur_job.details.length > 0 ? (
                                    <div className="rich-content prose prose-lg max-w-none text-sah-gray-2 text-[16px] leading-[28px] font-medium">
                                        <BlocksRenderer content={cur_job.details} />
                                    </div>
                                ) : (
                                    <p className="text-sah-gray-2 text-[16px] leading-[28px]">{no_details_text ?? "No details available for this position."}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
