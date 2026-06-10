"use client";

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

type Props = { jobs: Job[] };

export default function JobListingClient({ jobs }: Props) {
    return (
        <div>
            <p className="text-[14px] text-sah-gray-2 font-medium mb-5">
                {jobs.length} {jobs.length === 1 ? "position" : "positions"} found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {jobs.map((job) => (
                    <a
                        key={job.id}
                        href={`/jobs/${job.slug}`}
                        className="group flex flex-col gap-4 bg-white border border-sah-light-3 hover:border-sah-red rounded-[10px] p-6 transition-all duration-300 hover:shadow-md"
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
    );
}
