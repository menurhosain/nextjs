"use client";
 
import { useState } from "react";
 
const policies = [
  {
    id: 1,
    title: "Code of Conduct",
    description:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum.",
    link: "#",
    label: "CODE OF CONDUCT",
  },
  {
    id: 2,
    title: "Bias and Harassment Policy",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.",
    link: "#",
    label: "BIAS AND HARASSMENT POLICY",
  },
];
 
const tabs = ["New User Registration", "Returning Users", "Subcontractor Quick Start Guide"];
 
export default function Subcontractor() {
  const [activeTab, setActiveTab] = useState("Returning Users");
 
  return (
    <section className="w-full bg-[#f5f5f3] font-sans">
      {/* ── Hero / Intro ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Working with industry leading partners to ensure excellence in{" "}
            <span className="text-[#c0392b]">every construction project we deliver</span>
          </h1>
        </div>
        <div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Saif Salim Essa Al Harasi &amp; Co. LLC. (SAH) is a renowned construction company based
            in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has
            established itself as a trusted name in the construction industry, delivering
            exceptional projects of the highest quality.
          </p>
        </div>
      </div>
 
      {/* ── Hero Image + Helpful Links Banner ── */}
      <div className="relative w-full max-w-6xl mx-auto px-6 mb-16">
        <div className="relative rounded-xl overflow-hidden">
          {/* Team photo placeholder */}
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 flex items-end">
            {/* Decorative overlay text */}
            <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none select-none">
              <span className="text-5xl md:text-7xl font-black text-white/10 tracking-widest uppercase">
                Helpful
              </span>
              <span className="text-5xl md:text-7xl font-black text-white/10 tracking-widest uppercase">
                Links
              </span>
            </div>
 
            {/* Tab bar */}
            <div className="relative z-10 flex gap-2 p-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-5 py-2.5 text-xs font-semibold tracking-wide rounded transition-all duration-200
                    ${
                      activeTab === tab
                        ? "bg-[#c0392b] text-white shadow-lg scale-105"
                        : "bg-white/90 text-gray-800 hover:bg-white hover:scale-105 hover:shadow-md"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* ── Important Policies ── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Important Policies</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Please take a moment to review these two important policies carefully. They outline the
            key guidelines, responsibilities, and expected conduct required for all our projects to
            ensure smooth collaboration and successful project delivery.
          </p>
        </div>
 
        <div className="flex flex-col gap-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row"
            >
              {/* Left image block */}
              <div className="md:w-80 w-full h-48 md:h-auto bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/30 text-6xl font-black">0{policy.id}</span>
                </div>
              </div>
 
              {/* Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{policy.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{policy.description}</p>
                </div>
 
                <div className="flex flex-wrap gap-3 mt-6">
                  <PolicyButton label={policy.label} />
                  {policy.id === 1 && <PolicyButton label="BIAS AND HARASSMENT POLICY" secondary />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── Subcontractor Quick Start Guide ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Title column */}
            <div className="md:col-span-1">
              <div className="inline-block bg-[#c0392b] text-white text-xs font-bold px-3 py-1 rounded mb-4 tracking-widest">
                SUBCONTRACTORS
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                Quick Start Guide
              </h2>
              <div className="mt-4 h-1 w-12 bg-[#c0392b] rounded" />
            </div>
 
            {/* Steps column */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  step: "01",
                  title: "Register Your Account",
                  desc: "Complete the new subcontractor registration form with your company details and required documentation.",
                },
                {
                  step: "02",
                  title: "Review Policies",
                  desc: "Read and acknowledge the Code of Conduct and Bias & Harassment Policy before proceeding.",
                },
                {
                  step: "03",
                  title: "Submit Credentials",
                  desc: "Upload valid licences, insurance certificates, and any required trade qualifications.",
                },
                {
                  step: "04",
                  title: "Begin Collaboration",
                  desc: "Once approved, access the subcontractor portal to view project briefs and submit bids.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative p-6 rounded-xl border border-gray-100 hover:border-[#c0392b]/40 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <span className="text-4xl font-black text-gray-100 group-hover:text-[#c0392b]/20 transition-colors duration-300 select-none">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 mt-2 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#c0392b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded" />
                </div>
              ))}
            </div>
          </div>
 
          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <RegisterButton />
            <LearnMoreButton />
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* ── Reusable Buttons ── */
 
function PolicyButton({ label, secondary = false }: { label: string; secondary?: boolean }) {
  return (
    <button
      className={`
        group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-widest
        border rounded overflow-hidden transition-all duration-300
        ${
          secondary
            ? "border-gray-800 text-gray-800 hover:text-white"
            : "border-[#c0392b] text-[#c0392b] hover:text-white"
        }
      `}
    >
      {/* Sliding fill */}
      <span
        className={`
          absolute inset-0 translate-x-[-101%] group-hover:translate-x-0
          transition-transform duration-300 ease-out
          ${secondary ? "bg-gray-800" : "bg-[#c0392b]"}
        `}
      />
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
        ↗
      </span>
    </button>
  );
}
 
function RegisterButton() {
  return (
    <button className="group relative inline-flex items-center gap-3 bg-[#c0392b] text-white px-8 py-4 text-sm font-bold tracking-widest rounded overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#c0392b]/30 hover:-translate-y-0.5">
      <span className="absolute inset-0 bg-[#a93226] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10">NEW USER REGISTRATION</span>
      <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform duration-200">
        →
      </span>
    </button>
  );
}
 
function LearnMoreButton() {
  return (
    <button className="group inline-flex items-center gap-3 border-2 border-gray-900 text-gray-900 px-8 py-4 text-sm font-bold tracking-widest rounded overflow-hidden relative transition-all duration-300 hover:text-white hover:-translate-y-0.5 hover:shadow-lg">
      <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10">RETURNING USERS</span>
      <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform duration-200">
        →
      </span>
    </button>
  );
}