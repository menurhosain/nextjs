"use client";
 
import { useState } from "react";
 
const jobListings = [
  { id: 1, type: "Full Time", title: "Project Manager Consulting", accent: false },
  { id: 2, type: "Full Time", title: "Project Manager Consulting", accent: true },
  { id: 3, type: "Full Time", title: "Project Manager Consulting", accent: false },
  { id: 4, type: "Full Time", title: "Project Manager Consulting", accent: false },
];
 
export default function JobCareers() {
  const [hoveredId, setHoveredId] = useState(null);
 
  return (
    <div className="bg-sah-light-4 bg-[url('/careers-bg.png')] bg-cover bg-bottom bg-no-repeat">
      <div className="container !max-w-[1720px] !px-[50px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
        <div className="max-w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-[50px] gap-8">
            <div className="lg:w-1/2">
              <h1 className="text-[60px] font-medium text-sah-dark-2 leading-[68px]">
                Build your future<br />through collaboration
              </h1>
            </div>
            <div className="lg:w-[605px]">
              <p className="text-[16px] text-sah-gray-2 font-medium leading-[28px]">
                With us, your career is always moving forward. You'll grow through continuous
                learning, guided by mentorship at every stage, while collaborating with diverse
                teams to broaden your skills, knowledge, and experience. Our leadership is
                rooted in strong values. Our culture reflects principles.
              </p>
            </div>
          </div>
 
          {/* Bottom Section: Image + Job Listings */}
          <div className="flex flex-col lg:flex-row gap-[95px] items-start">
 
            {/* Left: Team Photo */}
            <div className="lg:w-[46%]">
              <div className="rounded-[6px] overflow-hidden">
                <img
                  src="/jobcareers-thumb.jpg"
                  alt="Team collaboration"
                  className="w-full h-[416px] object-cover object-center"
                />
              </div>
            </div>
 
            {/* Right: Job Listings */}
            <div className="lg:w-[54%] flex flex-col divide-y divide-sah-gray-4 border-t border-t-sah-gray-4 border-b border-b-sah-gray-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredId(job.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group flex items-center justify-between py-[27px] px-0 transition-all duration-300 cursor-pointer
                    ${hoveredId === job.id ? "bg-white -mx-3 px-6" : ""}
                  `}
                >
                  {/* Job Type */}
                  <span className="text-[17px] text-sah-dark-2 px-[10px] py-[4px] font-regular rounded-[30px] bg-sah-white transition-all duration-300 group-hover:bg-sah-light-4">
                    {job.type}
                  </span>
 
                  {/* Job Title */}
                  <span
                    className={`flex-1 text-[24px] font-semibold text-gray-900 ml-[30px] transition-colors duration-300
                      ${hoveredId === job.id ? "text-black" : ""}
                    `}
                  >
                    {job.title}
                  </span>
 
                  {/* CTA Button */}
                  <div className="flex items-center gap-[10px] ml-4 shrink-0">
                    <button
                      className={`flex items-center gap-2 text-[16px] font-medium text-sah-dark-2 pl-[30px] pr-[10px] py-2 rounded-full transition-all duration-300
                        ${hoveredId === job.id
                          ? "bg-sah-dark-2 text-white scale-105"
                          : "bg-white text-gray-700"
                        }
                      `}
                    >
                      View Open Positions
                      <span
                        className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300
                          ${job.accent
                            ? hoveredId === job.id
                              ? "bg-sah-red text-white"
                              : "bg-sah-red text-white"
                            : hoveredId === job.id
                            ? "bg-sah-red text-sah-dark-2"
                            : "bg-sah-dark-2 text-white"
                          }
                        `}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="!w-[9px] h-[9px]">
                            <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z" fill="white"/>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Decorative diamond pattern - bottom left */}
        <div className="absolute bottom-0 left-0 pointer-events-none opacity-20">
          <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
            {[0, 1, 2, 3, 4].map((col) =>
              [0, 1, 2].map((row) => {
                const x = col * 44 + (row % 2 === 0 ? 0 : 22);
                const y = row * 38;
                return (
                  <polygon
                    key={`${col}-${row}`}
                    points={`${x + 20},${y} ${x + 40},${y + 18} ${x + 20},${y + 36} ${x},${y + 18}`}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}