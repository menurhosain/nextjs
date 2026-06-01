import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Section_Title from "@/components/ui/section-title";
import { BenefitListItem } from "@/services/service.service";

const FALLBACK_TITLE = "MEP & building system";
const FALLBACK_BENEFITS_LABEL = "Benefits";
const FALLBACK_BENEFITS: BenefitListItem[] = [
    { id: 1, list_number: "001", list_value: "Structural steel (300 tons or less)" },
    { id: 2, list_number: "002", list_value: "Stair systems & supports" },
    { id: 3, list_number: "003", list_value: "Wall-panel systems" },
    { id: 4, list_number: "004", list_value: "Handrails & guardrails" },
    { id: 5, list_number: "005", list_value: "Pipe racks & supports" },
    { id: 6, list_number: "006", list_value: "Architectural finishes" },
];

interface ServiceDetailsProps {
    title?: string;
    description?: BlocksContent;
    benefits_label?: string;
    benefits?: BenefitListItem[];
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
                        <div className="text-[16px] leading-[28px] font-medium text-sah-gray-2 max-[640px]:text-center">
                            <BlocksRenderer content={description} />
						</div>

                        <div className="w-full mt-[60px]">
                            <div className="flex max-[640px]:justify-center items-center gap-2 mb-0 pb-4 border-b border-[rgba(229,_229,_229,_0.89))]">
                                <span className="w-[6px] h-[6px] rounded-full bg-sah-black shrink-0" />
                                <span className="text-[16px] font-medium uppercase text-sah-black">{benefits_label || FALLBACK_BENEFITS_LABEL}</span>
                            </div>

                            <div className="flex flex-col divide-y divide-[rgba(229,_229,_229,_0.89))] border-b border-b-[rgba(229,_229,_229,_0.89))]">
                                {displayBenefits.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-[20px] sm:gap-[150px] py-5 max-[640px]:text-center">
                                        <span className="w-[100px] md:w-[160px] shrink-0 text-[16px] text-sah-black font-medium">{item.list_number}</span>
                                        <span className="text-[18px] md:text-[20px] font-semibold text-sah-black leading-snug">{item.list_value}</span>
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
