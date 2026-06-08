"use client";

import { useState } from "react";
import { AngleArrow } from "@/components/ui/svgs";
import type { Job } from "@/services/job.service";

type Props = {
    job_section_title?: string | null;
    job_section_description?: string | null;
    job_board_image?: string | null;
    jobs?: Job[];
};

const fallbackJobs: Job[] = [
    { id: 1, documentId: "1", title: "Project Manager Consulting", slug: "#", locations: [], deadline: null, experience: null, employment_status: "Full Time" },
    { id: 2, documentId: "2", title: "Project Manager Consulting", slug: "#", locations: [], deadline: null, experience: null, employment_status: "Full Time" },
    { id: 3, documentId: "3", title: "Project Manager Consulting", slug: "#", locations: [], deadline: null, experience: null, employment_status: "Full Time" },
    { id: 4, documentId: "4", title: "Project Manager Consulting", slug: "#", locations: [], deadline: null, experience: null, employment_status: "Full Time" },
];

export default function JobCareers({ job_section_title, job_section_description, job_board_image, jobs }: Props) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const listings = jobs && jobs.length > 0 ? jobs : fallbackJobs;

    return (
        <div id="jobboard" className="section-padding bg-[url('/careers-bg-pattern.png')] max-[1280px]:bg-cover  bg-bottom bg-no-repeat">
            <div className="container !px-[50px] max-[1024px]:!px-4 pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                <div className="max-w-full">
                    <div className="flex flex-col xl:flex-row justify-between items-start mb-[50px] gap-4 xl:gap-8">
                        <div className="w-full xl:w-1/2">
                            <h2 className="text-[26px] sm:text-[38px] md:text-[48px] 2xl:text-[60px] leading-[36px] sm:leading-[44px] xl:leading-[64px] font-medium text-sah-dark-2">
                                {job_section_title || (
                                    <>
                                        Build your future
                                        <br />
                                        through collaboration
                                    </>
                                )}
                            </h2>
                        </div>
                        <div className="w-full xl:w-[605px]">
                            <p className="text-[16px] text-sah-gray-2 font-medium leading-[28px]">
                                {job_section_description ||
                                    "With us, your career is always moving forward. You'll grow through continuous learning, guided by mentorship at every stage, while collaborating with diverse teams to broaden your skills, knowledge, and experience. Our leadership is rooted in strong values. Our culture reflects principles."}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Image + Job Listings */}
                    <div className="flex flex-col xl:flex-row gap-[40px] 2xl:gap-[95px] items-start">
                        {/* Left: Team Photo */}
                        <div className="w-full xl:w-[35%] 2xl:[46%]">
                            <div className="rounded-[6px] overflow-hidden">
                                <img src={job_board_image || "/jobcareers-thumb.jpg"} alt="Team collaboration" className="w-full h-[200px] sm:h-[416px] object-cover object-center" />
                            </div>
                        </div>

                        {/* Right: Job Listings */}
                        <div className="w-full xl:w-[65%] 2xl:[54%] flex flex-col divide-y divide-sah-gray-4 border-t border-t-sah-gray-4 border-b border-b-sah-gray-4">
                            {listings.map((job) => (
                                <div
                                    key={job.id}
                                    onMouseEnter={() => setHoveredId(job.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`group flex max-[640px]:flex-col max-[640px]:text-center max-[640px]:gap-3 items-center justify-between py-[27px] px-0 transition-all duration-300 cursor-pointer ${hoveredId === job.id ? "bg-white max-[768px]:bg-transparent max-[768px]:-mx-0 -mx-3 max-[768px]:px-0 px-6" : ""}`}
                                >
                                    {/* Job Type */}
                                    <span className="text-[17px] text-sah-dark-2 px-[10px] py-[4px] font-regular rounded-[30px] bg-sah-white transition-all duration-300 group-hover:bg-sah-light-4">
                                        {job.employment_status || "Full Time"}
                                    </span>

                                    {/* Job Title */}
                                    <a
                                        href={job.slug ? `/job/${job.slug}` : "#"}
                                        className={`flex-1 text-[18px] 2xl:text-[20px] font-semibold text-gray-900 sm:ml-[30px] transition-colors duration-300 ${hoveredId === job.id ? "text-black" : ""}`}
                                    >
                                        {job.title}
                                    </a>

                                    {/* CTA Button */}
                                    <div className="flex items-center gap-[10px] sm:ml-4 shrink-0">
                                        <a
                                            href={job.slug ? `/job/${job.slug}` : "#"}
                                            className={`flex items-center gap-2 text-[14px] sm:text-[16px] font-medium text-sah-dark-2 pl-2 sm:pl-[30px] pr-[10px] py-2 rounded-full transition-all duration-300 ${hoveredId === job.id ? "bg-sah-dark-2 text-white scale-105" : "bg-white text-gray-700"}`}
                                        >
                                            View Open Positions
                                            <span
                                                className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 ${hoveredId === job.id ? "bg-sah-red text-white" : "bg-sah-dark-2 text-white"}`}
                                            >
                                                <AngleArrow class_name="!w-[9px] h-[9px]" />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative diamond pattern - bottom left */}
                <div className="absolute bottom-0 start-0 pointer-events-none opacity-20">
                    <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
                        {[0, 1, 2, 3, 4].map((col) =>
                            [0, 1, 2].map((row) => {
                                const x = col * 44 + (row % 2 === 0 ? 0 : 22);
                                const y = row * 38;
                                return <polygon key={`${col}-${row}`} points={`${x + 20},${y} ${x + 40},${y + 18} ${x + 20},${y + 36} ${x},${y + 18}`} fill="none" stroke="#9ca3af" strokeWidth="1" />;
                            }),
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}
