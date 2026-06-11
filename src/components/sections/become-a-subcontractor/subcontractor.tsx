"use client";


import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SubcontractorIcon1, SubcontractorIcon2, SubcontractorIcon3, SubcontractorIcon4, SubcontractorIcon5, AngleArrow } from "@/components/ui/svgs";

const policies = [
  {
    id: 1,
    description:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum commodo nibh hac.",
    link: "#",
  },
];

export default function Subcontractor() {

  return (
    <section className="section-padding bg-sah-light-4 bg-[url('/careers-bg-pattern.png')] bg-bottom bg-no-repeat">
      <div className="container !px-[50px] max-[1024px]:!px-4 pt-[73px] lg:pt-[140px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
        {/* ── Hero / Intro ── */}
        <div className="pb-8 xl:pb-[20px] flex flex-col xl:flex-row xl:gap-12 items-start justify-between">
          <div className="xl:w-[50%]">
            <ScrollReveal toColor="var(--color-sah-dark-2)">
              <h2 className="section-heading mx-auto text-left mb-[30px] max-[1536px]:text-[36px] max-[1024px]:text-[30px] max-[768px]:text-[24px] max-[640px]:text-[20px] max-[1024px]:leading-[40px] max-[768px]:leading-[32px] max-[640px]:leading-[28px] leading-[48px]">
                <span className="text-sah-dark-2">
                  Working with industry leading partners to ensure excellence in {" "}
                </span>
                <span className="text-sah-dark-2/50 scroll-color font-bold">every construction project we deliver</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="xl:w-[560px]">
            <p className="text-[16px] text-sah-gray-1 leading-relaxed">
              Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based
              in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has
              established itself as a trusted name in the construction industry, delivering
              exceptional projects of the highest quality.
            </p>
          </div>
        </div>

        {/* ── Hero Image + Helpful Links Banner ── */}
        <div className="relative w-full">
          <div className="relative rounded-xl overflow-hidden">
            {/* Team photo placeholder */}
            <div className="w-full h-[200px] sm:h-[300px] lg:h-[400px] xl:h-[560px] bg-[url('/subcontractor-img-1.jpg')] bg-cover bg-center bg-no-repeat flex items-end relative">
              {/* Decorative overlay text */}
              <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(35,37,40,0)_28.83%,_#232528_100%)]"></div>
              <div className="max-[640px]:hidden absolute inset-0 flex items-end justify-center pb-14 pointer-events-none select-none gap-[40px]">
                <span className="text-[60px] lg:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Helpful
                </span>
                <span className="text-[60px] lg:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Links
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex max-[1024px]:flex-wrap gap-3 xl:gap-5 justify-center max-[640px]:mt-[40px] mt-[-65px] max-[1280px]:px-3 max-[640px]:px-0">
          <a
            href="/register-contractor"
            className="px-4 h-[130px] w-full sm:w-[168px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[16px] xl:text-[18px] font-medium  tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <SubcontractorIcon1 />
            </div>
            New User Registration
          </a>
          <a
            href="login"
            className="px-4 h-[130px] w-full sm:w-[150px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[16px] xl:text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white "
          >
            <div className="text-[35px]">
              <SubcontractorIcon2 />
            </div>
            Returning Users
          </a>
          <a
            href="/register-contractor"
            className="px-4 h-[130px] w-full sm:w-[230px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[16px] xl:text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <SubcontractorIcon3 />
            </div>
            Subcontractor Quick Start Guide
          </a>
          <a
            href="#"
            className="px-4 h-[130px] w-full sm:w-[230px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[16px] xl:text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <SubcontractorIcon4 />
            </div>
            Subcontractor Navigation Guide
          </a>
          <a
            href="contact"
            className="px-4 h-[130px]  w-full sm:w-[160px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[16px] xl:text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <SubcontractorIcon5 />
            </div>
            Email Help Desk
          </a>
        </div>
        {/* ── Important Policies ── */}
        <div className="pt-[65px] lg:pt-[135px]">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[40px] font-bold text-sah-dark-2 mb-4">Important Policies</h2>
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
                className="flex flex-col lg:flex-row gap-4"
              >
                {/* Left image block */}
                <div className="w-full lg:w-[345px] 2xl:w-[700px] h-60 lg:h-auto bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0 relative overflow-hidden rounded-[8px]">
                  <div className="absolute inset-0 bg-[url('/subcontractor-img-2.jpg')] bg-cover bg-center bg-no-repeat" />

                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 xl:p-10 flex flex-col justify-between bg-white rounded-[8px]">
                  <div>
                    <p className="text-[16px] md:text-[20px] text-sah-dark-2 leading-[26px] sm:leading-[36px]">{policy.description}</p>
                  </div>
                  <div className="w-full h-[1px] bg-sah-light-3 mt-[20px] xl:mt-[40px]" />
                  <div className="flex items-start flex-col xl:flex-row flex-wrap gap-[20px] xl:gap-[47px] mt-[30px] xl:mt-[50px]">
                    <a
                      href="#"
                      className={`group flex items-center gap-2 text-[12px] md:text-[16px] font-medium bg-sah-light-4 text-sah-dark-2 pl-[10px] sm:pl-[30px] pr-[10px] py-2 rounded-[10px] sm:rounded-full transition-all duration-300 hover:bg-sah-red hover:text-white scale-105`}
                    >
                      CODE OF CONDUCT
                      <span
                        className={`max-[640]:hidden flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 bg-sah-red text-sah-white group-hover:bg-sah-white group-hover:text-sah-dark-2`}
                      >
                        <AngleArrow class_name="!w-[9px] h-[9px]" />
                      </span>
                    </a>
                    <a
                      href="#"
                      className={`group flex items-center gap-2 text-[12px] md:text-[16px] font-medium bg-sah-light-4 text-sah-dark-2 pl-[10px] sm:pl-[30px] pr-[10px] py-2 rounded-[10px] sm:rounded-full transition-all duration-300 hover:bg-sah-red hover:text-white scale-105`}
                    >
                      BIAS AND HARASSMENT POLICY
                      <span
                        className={`max-[640]:hidden flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 bg-sah-dark-2 text-sah-white group-hover:bg-sah-white group-hover:text-sah-dark-2`}
                      >
                        <AngleArrow class_name="!w-[9px] h-[9px]" />
                      </span>
                    </a>
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

