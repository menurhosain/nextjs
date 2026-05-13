import Section_Title from "@/components/ui/section-title";
import Cta from "@/components/sections/partner/cta";
import OurValue from "@/components/sections/service-details/our-value";
import FaqSection from "@/components/sections/service/faq";
import TeamSection from "@/components/sections/service-details/team";

const benefits = [
    { code: "001", label: "Structural steel (300 tons or less)" },
    { code: "002", label: "Stair systems & supports" },
    { code: "003", label: "Wall-panel systems" },
    { code: "004", label: "Handrails & guardrails" },
    { code: "005", label: "Pipe racks & supports" },
    { code: "006", label: "Architectural finishes" }
];

export default function ServiceDetails() {

    return (
        <>
            <section className="relative w-full">
                <div className="container border-x border-sah-light-3 pt-27 lg:pb-[140px] pb-[80px]">
                    <div className="grid grid-cols-7 gap-5 items-start">
                        <div className="col-span-3 sticky top-[30px] left-0">
                            <Section_Title
                                title="MEP & Building system"
                                class_name={
                                    {
                                        title: "xl:!text-[80px] xl:!leading-[86px] font-medium text-sah-black !mb-[10px] max-w-[870px] text-[70px] "
                                    }
                                }
                            />
                        </div>
                        <div className="col-span-4">
                            <p className="text-[16px] leading-[28px] font-medium text-sah-gray-2">Offsite, part of the SAH group, is reshaping construction through innovative and scalable offsite manufacturing methods. Backed by more than two decades of experience, we enable clients to achieve faster timelines,
                                improved safety, and smarter building practices. Our goal is to transform how projects are delivered by offering tailored, high-efficiency offsite solutions. Using cutting-edge technology, streamlined processes, and industry expertise, we provide everything from prefabricated elements to
                                complete integrated systems—ensuring speed, accuracy, and dependable results.</p>

                            <div className="w-full mt-[60px]">
                                <div className="flex items-center gap-2 mb-0 pb-4 border-b border-[rgba(229,_229,_229,_0.89))]">
                                    <span className="w-[6px] h-[6px] rounded-full bg-sah-black shrink-0" />
                                    <span className="text-[16px] font-medium uppercase text-sah-black">Benefits</span>
                                </div>

                                <div className="flex flex-col divide-y divide-[rgba(229,_229,_229,_0.89))] border-b border-b-[rgba(229,_229,_229,_0.89))]">
                                    {benefits.map((item, index) => (
                                        <div key={index} className="flex items-center gap-[150px] py-5">
                                            <span className="w-[160px] shrink-0 text-[16px] text-sah-black font-medium">
                                                ({item.code})
                                            </span>
                                            <span className="text-[20px] font-semibold text-sah-black leading-snug">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section Start */}
            <TeamSection />
            {/* Team Section Start */}

            {/* Our Value Section Start */}
            <OurValue />
            {/* Our Value Section End */}

            {/* Cta Section Start */}
            <Cta
                title="Available Nationwide"
            />
            {/* Cta Section End */}

            {/* Faq Section Start */}
            <FaqSection />
            {/* Faq Section End */}
        </>
    );
}
