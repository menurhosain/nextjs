"use client";


import { ScrollReveal } from "@/components/ui/scroll-reveal";

const policies = [
  {
    id: 1,
    description:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum.",
    link: "#",
    label: "CODE OF CONDUCT",
  },
];

export default function Subcontractor() {

  return (
    <section className="bg-sah-light-4">
      <div className="container !max-w-[1720px] !px-[50px] pt-[50px] lg:pt-[140px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
        {/* ── Hero / Intro ── */}
        <div className="pb-[20px] flex gap-12 items-start justify-between flex-wrap">
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
        <div className="relative w-full mb-10">
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
        <div className="relative z-10 flex gap-5 justify-center">
            <a
            href="register"
              className="px-4 h-[130px] w-[168px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium  tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
            >
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" className=""><g><path d="M11.894 24a.5.5 0 0 1-.491-.597l.707-3.535a.49.49 0 0 1 .137-.256l7.778-7.778a1.503 1.503 0 0 1 2.121 0l1.414 1.414a1.501 1.501 0 0 1 0 2.121l-7.778 7.778a.497.497 0 0 1-.256.137l-3.535.707a.53.53 0 0 1-.097.009zm1.168-3.789-.53 2.651 2.651-.53 7.671-7.671a.5.5 0 0 0 0-.707L21.44 12.54a.5.5 0 0 0-.707 0zm2.367 2.582h.01zM9.5 21h-7A2.502 2.502 0 0 1 0 18.5v-13C0 4.121 1.121 3 2.5 3h2a.5.5 0 0 1 0 1h-2C1.673 4 1 4.673 1 5.5v13c0 .827.673 1.5 1.5 1.5h7a.5.5 0 0 1 0 1zM16.5 12a.5.5 0 0 1-.5-.5v-6c0-.827-.673-1.5-1.5-1.5h-2a.5.5 0 0 1 0-1h2C15.879 3 17 4.121 17 5.5v6a.5.5 0 0 1-.5.5z" opacity="1" data-original="#000000" className=""></path><path d="M11.5 6h-6C4.673 6 4 5.327 4 4.5v-2a.5.5 0 0 1 .5-.5h1.55C6.282.86 7.293 0 8.5 0s2.218.86 2.45 2h1.55a.5.5 0 0 1 .5.5v2c0 .827-.673 1.5-1.5 1.5zM5 3v1.5c0 .275.225.5.5.5h6c.275 0 .5-.225.5-.5V3h-1.5a.5.5 0 0 1-.5-.5C10 1.673 9.327 1 8.5 1S7 1.673 7 2.5a.5.5 0 0 1-.5.5zM13.5 9h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1zM13.5 12h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1zM13.5 15h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1z" opacity="1" data-original="#000000" className=""></path></g></svg>
              </div>
              New User Registration
            </a>
            <a
            href="login"
              className="px-4 h-[90px] w-[150px] text-center flex items-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white "
            >
              Returning Users
            </a>
            <a
            href="#"
              className="px-4 h-[90px] w-[230px] text-center flex items-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
            >
              Subcontractor Quick Start Guide
            </a>
            <a
            href="#"
              className="px-4 h-[90px] w-[230px] text-center flex items-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
            >
              Subcontractor Navigation Guide
            </a>
            <a
            href="contact"
              className="px-4 h-[90px]  w-[160px] text-center flex items-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
            >
              Email Help Desk
            </a>
        </div>
        {/* ── Important Policies ── */}
        <div className="pt-[135px]">
          <div className="text-center mb-10">
            <h2 className="text-[40px] md:text-[40px] font-bold text-sah-dark-2 mb-4">Important Policies</h2>
            <p className="text-[16px] text-sah-gray-1 max-w-[730px] mx-auto leading-relaxed">
              Please take a moment to review these two important policies carefully. They outline the
              key guidelines, responsibilities, and expected conduct required for all our projects to
              ensure smooth collaboration and successful project delivery.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="flex flex-col md:flex-row gap-4"
              >
                {/* Left image block */}
                <div className="md:w-140 w-full h-48 md:h-auto bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0 relative overflow-hidden rounded-[8px]">
                  <div className="absolute inset-0 bg-[url('/subcontractor-img-2.jpg')] bg-cover bg-center bg-no-repeat" />
                  
                </div>

                {/* Content */}
                <div className="flex-1 p-10 flex flex-col justify-between bg-white rounded-[8px]">
                  <div>
                    <p className="text-[24px] text-sah-dark-2 leading-[36px]">{policy.description}</p>
                  </div>
                  <div className="w-full h-[1px] bg-sah-light-3 mt-[40px]"/>
                  <div className="flex flex-wrap gap-[47px] mt-[50px]">
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
      className={`group flex items-center gap-2 text-[16px] font-medium bg-sah-light-4 text-sah-dark-2 pl-[30px] pr-[10px] py-2 rounded-full transition-all duration-300 hover:bg-sah-red hover:text-white scale-105
        ${secondary
          ? "bg-sah-light-4 border-gray-800 text-gray-800 hover:text-white"
          : "border-[#c0392b] text-[#c0392b] hover:text-white"
        }
      `}
    >
      {label}
        <span
            className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 bg-sah-red text-sah-white group-hover:bg-sah-white group-hover:text-sah-dark-2
              ${secondary
                ? "bg-sah-dark-2 border-gray-800 text-gray-800 hover:text-white"
                : "border-[#c0392b] text-[#c0392b] hover:text-white"
              }
              `}
        >
            <svg width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" className="!w-[9px] h-[9px]">
                <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z"/>
            </svg>
        </span>
    </button>


  );
}