import { ServiceCardTwo } from "@/components/ui/service-card2";
import Section_Title from "@/components/ui/section-title";
import { SectionTitle } from "@/services/page_content.service";
import { Service as ServiceCard } from "@/services/service.service";
import { getStrapiMediaUrl } from "@/lib/utils";

type Props = {
    section_title?: SectionTitle | null;
    cards?: ServiceCard[];
    className?: string;
    containerClass?: string;
    bgShape?: boolean;
};

export default function Service({ section_title, cards }: Props) {
    return (
        <section className="section-padding relative pt-[73px] lg:pt-[143px] lg:pb-[140px] pb-[80px] bg-[var(--color-sah-light-4)] bg-[url('/page_service_bg.jpg')] bg-contain bg-bottom bg-no-repeat">
            <div className="container max-[1536px]:!px-0">
                <div className="sm:grid grid-cols-1 xl:grid-cols-7 gap-5 lg:gap-10 items-start">
                    <div className="col-span-3 xl:sticky xl:top-[30px] left-0 max-[640px]:mb-6">
                        <Section_Title
                            subtitle={section_title?.sub_title || "Our Culture"}
                            title={section_title?.title || "What we offer"}
                            description={section_title?.description || "Offsite, part of the SAH group, is reshaping construction through innovative and scalable offsite manufacturing methods. Backed by more than two decades of experience, we enable clients to achieve faster timelines, improved safety, and smarter building practices. Our goal is to transform how projects."}
                            class_name={{
                                subtitle: "text-sah-black !mb-[15px] text-[14px] md:text-[16px]",
                                title: "xl:!text-[70px] 2xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[10px] max-w-[870px]",
                                description: "text-sah-gray-1 max-w-[870px] text-[14px] md:text-[16px]",
                            }}
                        />
                    </div>
                    <div className="col-span-4 flex flex-col gap-[30px]">
                        {cards?.map((card) => (
                            <ServiceCardTwo
                                key={card.slug}
                                icon={card.svg ? <span dangerouslySetInnerHTML={{ __html: card.svg }} /> : undefined}
                                title={card.title}
                                description={card.description}
                                image={getStrapiMediaUrl(card.image) || "/service-card/1.jpg"}
                                href={`/service/${card.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
