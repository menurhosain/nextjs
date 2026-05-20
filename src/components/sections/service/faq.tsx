import Section_Title from "@/components/ui/section-title";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SectionTitle, FaqItem } from "@/services/page_content.service";

type Props = {
    section_title?: SectionTitle | null;
    items?: FaqItem[];
};

const FALLBACK_ITEMS = [
    { id: 1, question: "What the first step of the home buying process?", answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement." },
    { id: 2, question: "How long does it take to buy a home?", answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement." },
    { id: 3, question: "How much do I need for a down payment?", answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement." },
    { id: 4, question: "What is earnest money?", answer: "We focus on providing a high standard of quality in each project. Our game studio carefully selects the right technology to meet any project requirement." },
];

export default function FaqSection({ section_title, items }: Props) {
    const accordionItems = (items && items.length > 0 ? items : FALLBACK_ITEMS).map((item) => ({
        question: item.question,
        answer: item.answer,
    }));

    return (
        <section className="section-padding lg:py-[140px] py-[80px] bg-[url('/faq_sec_bg.jpg')] bg-cover bg-bottom bg-no-repeat">
            <div className="container  max-[1536px]:!px-0">
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-5 lg:gap-10 items-start">
                    <div className="col-span-4">
                        <Section_Title
                            subtitle={section_title?.sub_title || "Life at SAH"}
                            title={section_title?.title || "Frequently Asked Questions"}
                            description={section_title?.description || "Real stories from homeowners and investors who trusted us to guide their real estate journey."}
                            class_name={{
                                subtitle: "text-sah-black !mb-[15px]",
                                title: "xl:!text-[66px] 2xl:!text-[80px] !leading-[36px] sm:!leading-[50px] xl:!leading-[76px] 2xl:!leading-[86px] text-sah-black !mb-[20px] 2xl:!mb-[60px] ",
                                description: "text-sah-gray-1 max-w-[453px]",
                            }}
                        />
                    </div>
                    <div className="col-span-4">
                        <FaqAccordion
                            items={accordionItems}
                            mode="exclusive"
                            showControls={false}
                            defaultOpen={0}
                            descClass="pr-3 sm:pr-[60px] max-[640px]:pl-3"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
