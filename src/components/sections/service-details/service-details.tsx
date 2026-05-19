import Section_Title from "@/components/ui/section-title";
import { ServiceBenefit } from "@/services/page_content.service";

const FALLBACK_TITLE = "MEP & Building system";
const FALLBACK_DESCRIPTION = "Offsite, part of the SAH group, is reshaping construction through innovative and scalable offsite manufacturing methods. Backed by more than two decades of experience, we enable clients to achieve faster timelines, improved safety, and smarter building practices. Our goal is to transform how projects are delivered by offering tailored, high-efficiency offsite solutions. Using cutting-edge technology, streamlined processes, and industry expertise, we provide everything from prefabricated elements to complete integrated systems—ensuring speed, accuracy, and dependable results.";
const FALLBACK_BENEFITS_LABEL = "Benefits";
const FALLBACK_BENEFITS: ServiceBenefit[] = [
    { id: 1, code: "001", label: "Structural steel (300 tons or less)" },
    { id: 2, code: "002", label: "Stair systems & supports" },
    { id: 3, code: "003", label: "Wall-panel systems" },
    { id: 4, code: "004", label: "Handrails & guardrails" },
    { id: 5, code: "005", label: "Pipe racks & supports" },
    { id: 6, code: "006", label: "Architectural finishes" },
];

interface ServiceDetailsProps {
    title?: string;
    description?: string;
    benefits_label?: string;
    benefits?: ServiceBenefit[];
}

export default function ServiceDetails({ title, description, benefits_label, benefits }: ServiceDetailsProps) {
    const displayBenefits = benefits && benefits.length > 0 ? benefits : FALLBACK_BENEFITS;

    return (
        <section className="relative w-full">
            <div className="container border-x border-sah-light-3 pt-27 lg:pb-[140px] pb-[80px]">
                <div className="grid grid-cols-7 gap-5 items-start">
                    <div className="col-span-3 sticky top-[30px] left-0">
                        <Section_Title
                            title={title || FALLBACK_TITLE}
                            class_name={{ title: "xl:!text-[80px] xl:!leading-[86px] font-medium text-sah-black !mb-[10px] max-w-[870px] text-[70px] " }}
                        />
                    </div>
                    <div className="col-span-4">
                        <p className="text-[16px] leading-[28px] font-medium text-sah-gray-2">{description || FALLBACK_DESCRIPTION}</p>

                        <div className="w-full mt-[60px]">
                            <div className="flex items-center gap-2 mb-0 pb-4 border-b border-[rgba(229,_229,_229,_0.89))]">
                                <span className="w-[6px] h-[6px] rounded-full bg-sah-black shrink-0" />
                                <span className="text-[16px] font-medium uppercase text-sah-black">{benefits_label || FALLBACK_BENEFITS_LABEL}</span>
                            </div>

                            <div className="flex flex-col divide-y divide-[rgba(229,_229,_229,_0.89))] border-b border-b-[rgba(229,_229,_229,_0.89))]">
                                {displayBenefits.map((item) => (
                                    <div key={item.id} className="flex items-center gap-[150px] py-5">
                                        <span className="w-[160px] shrink-0 text-[16px] text-sah-black font-medium">{item.code}</span>
                                        <span className="text-[20px] font-semibold text-sah-black leading-snug">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
