"use client";
 
import { useState } from "react";
 
const jobListings = [
  { id: 1, type: "Full Time", title: "Project Manager Consulting", positions: 2, accent: false },
  { id: 2, type: "Full Time", title: "Project Manager Consulting", positions: 1, accent: true },
  { id: 3, type: "Full Time", title: "Project Manager Consulting", positions: 3, accent: false },
  { id: 4, type: "Full Time", title: "Project Manager Consulting", positions: 1, accent: false },
];
 
export default function JobCareers() {
  const [hoveredId, setHoveredId] = useState(null);
 
  return (
    <div className="min-h-screen bg-[#f2f2f0] font-sans">
      {/* Decorative background diamonds - bottom left */}
      <div className="relative overflow-hidden">
        {/* Main content wrapper */}
        <div className="max-w-7xl mx-auto px-10 py-16">
 
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
            {/* Left: Heading */}
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Build your future<br />through collaboration
              </h1>
            </div>
 
            {/* Right: Description */}
            <div className="lg:w-2/5">
              <p className="text-sm text-gray-500 leading-relaxed">
                With us, your career is always moving forward. You'll grow through continuous
                learning, guided by mentorship at every stage, while collaborating with diverse
                teams to broaden your skills, knowledge, and experience. Our leadership is
                rooted in strong values. Our culture reflects principles.
              </p>
            </div>
          </div>
 
          {/* Bottom Section: Image + Job Listings */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
 
            {/* Left: Team Photo */}
            <div className="lg:w-[42%]">
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[280px] object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
 
            {/* Right: Job Listings */}
            <div className="lg:w-[58%] flex flex-col divide-y divide-gray-200">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredId(job.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex items-center justify-between py-5 px-3 transition-all duration-300 rounded-lg cursor-pointer
                    ${hoveredId === job.id ? "bg-white shadow-sm -mx-3 px-6" : ""}
                  `}
                >
                  {/* Job Type */}
                  <span className="text-xs text-gray-400 w-20 shrink-0 font-medium tracking-wide">
                    {job.type}
                  </span>
 
                  {/* Job Title */}
                  <span
                    className={`flex-1 text-base font-bold text-gray-900 ml-4 transition-colors duration-300
                      ${hoveredId === job.id ? "text-black" : ""}
                    `}
                  >
                    {job.title}
                  </span>
 
                  {/* CTA Button */}
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button
                      className={`flex items-center gap-2 border text-xs font-medium px-4 py-2 rounded-full transition-all duration-300
                        ${hoveredId === job.id
                          ? "bg-gray-900 text-white border-gray-900 shadow-md scale-105"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }
                      `}
                    >
                      View Open Positions
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all duration-300
                          ${job.accent
                            ? hoveredId === job.id
                              ? "bg-red-600 text-white"
                              : "bg-red-500 text-white"
                            : hoveredId === job.id
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                          }
                        `}
                      >
                        {job.positions}
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