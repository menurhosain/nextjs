"use client";


import { ScrollReveal } from "@/components/ui/scroll-reveal";

const policies = [
  {
    id: 1,
    title: "Code of Conduct",
    description:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum.",
    link: "#",
    label: "CODE OF CONDUCT",
  },
];

export default function Subcontractor() {

  return (
    <section className="bg-sah-light-4">
      <div className="container !max-w-[1720px] !px-[50px] pt-[50px] lg:pt-[135px] pb-[50px] lg:pb-[142px] border-x border-sah-light-3">
        {/* ── Hero / Intro ── */}
        <div className=" py-16 flex gap-12 items-start justify-between flex-wrap">
          <div className="w-[47%]">
            <ScrollReveal toColor="var(--color-sah-dark-2)">
              <h2 className="section-heading mx-auto text-left leading-[48px] mb-[30px]">
                <span className="text-sah-dark-2">
                  Working with industry leading partners to ensure excellence in {" "}
                </span>
                <span className="text-sah-dark-2/50 scroll-color font-bold">every construction project we deliver</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="w-[530px]">
            <p className="text-[16px] text-sah-gray-1 leading-relaxed">
              Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based
              in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has
              established itself as a trusted name in the construction industry, delivering
              exceptional projects of the highest quality.
            </p>
          </div>
        </div>

        {/* ── Hero Image + Helpful Links Banner ── */}
        <div className="relative w-full mb-16">
          <div className="relative rounded-xl overflow-hidden">
            {/* Team photo placeholder */}
            <div className="w-full h-[560px] md:h-[560px] bg-[url('/subcontractor-img-1.jpg')] bg-cover bg-center bg-no-repeat flex items-end relative">
              {/* Decorative overlay text */}
              <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(35,37,40,0)_28.83%,_#232528_100%)]"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none select-none gap-[40px]">
                <span className="text-[60px] md:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Helpful
                </span>
                <span className="text-[60px] md:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Links
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex gap-2 p-4 justify-center">
            <a
            href="#"
              className={`
              px-5 py-2.5 text-xs font-semibold tracking-wide rounded transition-all duration-200`}
            >
              New User Registration
            </a>
            <a
            href="#"
              className={`
              px-5 py-2.5 text-xs font-semibold tracking-wide rounded transition-all duration-200`}
            >
              Returning Users
            </a>
            <a
            href="#"
              className={`
              px-5 py-2.5 text-xs font-semibold tracking-wide rounded transition-all duration-200`}
            >
              Subcontractor Quick Start Guide
            </a>
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
        ${secondary
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