import Section_Title from "@/components/ui/section-title";
import { ServiceBenefit } from "@/services/page_content.service";

const FALLBACK_TITLE = "MEP & building system";
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
        <section className="section-padding relative w-full">
            <div className="container border-x border-sah-light-3 pt-[73px] lg:pt-[143px] lg:pb-[150px] pb-[80px] max-[1024px]:!px-4">
                <div className="grid grid-cols-1 xl:grid-cols-7 xl:gap-5 items-start">
                    <div className="col-span-3 xl:sticky xl:top-[30px] left-0 max-[640px]:text-center">
                        <Section_Title
                            title={title || FALLBACK_TITLE}
                            class_name={{ title: "xl:!text-[60px] 2xl:!text-[80px] xl:!leading-[66px] 2xl:!leading-[86px] font-medium text-sah-black !mb-[10px] max-w-[870px] max-[640]:!leading-[36px]" }}
                        />
                    </div>
                    <div className="col-span-4">
                        <p className="text-[16px] leading-[28px] font-medium text-sah-gray-2 max-[640px]:text-center">{description || FALLBACK_DESCRIPTION}</p>

                        <div className="w-full mt-[60px]">
                            <div className="flex max-[640px]:justify-center items-center gap-2 mb-0 pb-4 border-b border-[rgba(229,_229,_229,_0.89))]">
                                <span className="w-[6px] h-[6px] rounded-full bg-sah-black shrink-0" />
                                <span className="text-[16px] font-medium uppercase text-sah-black">{benefits_label || FALLBACK_BENEFITS_LABEL}</span>
                            </div>

                            <div className="flex flex-col divide-y divide-[rgba(229,_229,_229,_0.89))] border-b border-b-[rgba(229,_229,_229,_0.89))]">
                                {displayBenefits.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-[20px] sm:gap-[150px] py-5 max-[640px]:text-center">
                                        <span className="w-[100px] md:w-[160px] shrink-0 text-[16px] text-sah-black font-medium">{item.code}</span>
                                        <span className="text-[18px] md:text-[20px] font-semibold text-sah-black leading-snug">{item.label}</span>
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
