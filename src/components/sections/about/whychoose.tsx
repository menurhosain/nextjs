"use client";
import Section_Title from "@/components/ui/section-title";
import ChooseCard from "@/components/ui/choose-card";
import ChoooseImageCard from "@/components/ui/choose-image-card";
import { WhyChoose1, WhyChoose2, WhyChoose3, WhyChoose4 } from "@/components/ui/svgs";
import { getStrapiMediaUrl } from "@/lib/utils";

const FALLBACK_SUBTITLE = "Why Choose us";
const FALLBACK_TITLE = "What makes us different";
const FALLBACK_DESCRIPTION =
    "It’s not just about creating something good; it’s about designing, innovating, and collaborating to forge remarkable and unparalleled experiences.";

const FALLBACK_CARDS = [
    { id: 1, icon: null, title: "Affordable Realty Options", description: "We prioritize clear communication and simplicity, making your property journey smooth and stress-free." },
    { id: 2, icon: null, title: "Building For Long-Term Value", description: "Every project we develop is built with quality and vision, designed to benefit generations to come." },
    { id: 3, icon: null, title: "Hassle-Free Process", description: "We prioritize clear communication and simplicity, making your property journey smooth and stress-free." },
    { id: 4, icon: null, title: "Expertise You Can Trust", description: "Our experienced real estate experts guide you through every step with knowledge, care, and dedication." },
];

const FALLBACK_ICON_COMPONENTS = [<WhyChoose1 key={1} />, <WhyChoose2 key={2} />, <WhyChoose3 key={3} />, <WhyChoose4 key={4} />];

const FALLBACK_IMAGES = [
    { id: 1, src: "/choose-item-1.jpg", alt: "Luxury villa" },
    { id: 2, src: "/choose-item-2.jpg", alt: "Tropical resort with palms" },
];

interface WhyChooseSectionTitle {
    sub_title?: string;
    title?: string;
    description?: string;
}
interface WhyChooseCardItem {
    id: number;
    icon?: string | null;
    title: string;
    description: string;
}
interface WhyChooseImageCardItem {
    id: number;
    image?: { url: string } | null;
    alt?: string;
}

interface WhyChooseProps {
    section?: WhyChooseSectionTitle;
    cards?: WhyChooseCardItem[];
    image_cards?: WhyChooseImageCardItem[];
}

export default function WhyChoose({ section, cards, image_cards }: WhyChooseProps) {
    const displayCards = cards && cards.length > 0 ? cards : FALLBACK_CARDS;
    const displayImages = image_cards && image_cards.length > 0 ? image_cards : null;

    const getIcon = (card: WhyChooseCardItem, index: number) => {
        if (card.icon) return <span dangerouslySetInnerHTML={{ __html: card.icon }} />;
        return FALLBACK_ICON_COMPONENTS[index] ?? null;
    };

    const getImageSrc = (index: number) => {
        if (displayImages) return getStrapiMediaUrl(displayImages[index]?.image) || FALLBACK_IMAGES[index].src;
        return FALLBACK_IMAGES[index].src;
    };

    const getImageAlt = (index: number) => {
        if (displayImages) return displayImages[index]?.alt ?? FALLBACK_IMAGES[index].alt;
        return FALLBACK_IMAGES[index].alt;
    };

    return (
        <section className="section-padding relative lg:pt-[143px] pt-[73px] lg:pb-[150px] pb-[80px] bg-sah-dark-2 bg-[url('/whychoose-shape.png')] bg-no-repeat bg-bottom">
            <div className="container mx-auto !px-0">
                <div className="flex flex-col items-center">
                    <div className="mb-[50px] flex flex-col items-start w-full sm:w-[580px]">
                        <Section_Title
                            subtitle={section?.sub_title || FALLBACK_SUBTITLE}
                            title={<>{section?.title || FALLBACK_TITLE}</>}
                            description={section?.description || FALLBACK_DESCRIPTION}
                            class_name={{ subtitle: "!mb-[15px] text-left text-sah-white !tracking-normal text-[14px] sm:text-[16px]", title: "text-sah-white text-left !mb-[10px] text-[30px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[1.1em] xl:leading-[70px] 2xl:leading-[86px]", description: "text-sah-gray-1 text-center max-w-[870px] text-left text-sah-white" }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] auto-rows-auto">

                    {/* Row 1 */}
                    <div className="lg:col-span-1 lg:row-span-1  max-[1024px]:order-1">
                        <ChoooseImageCard src={getImageSrc(0)} alt={getImageAlt(0)} />
                    </div>

                    <div className="lg:col-span-1 lg:row-span-1 max-[1024px]:order-0">
                        <ChooseCard
                            icon={getIcon(displayCards[0], 0)}
                            title={displayCards[0].title}
                            desc={displayCards[0].description}
                            accent
                        />
                    </div>

                    {/* Tall image spanning 2 rows */}
                    <div className="lg:col-span-1 lg:row-span-2 relative max-[1024px]:order-1">
                        <ChoooseImageCard src={getImageSrc(1)} alt={getImageAlt(1)} tall />
                        <div className="lg:col-span-1 lg:col-start-3 lg:row-start-3 absolute bottom-[10px] left-[10px] right-[10px]">
                            <ChooseCard
                                icon={getIcon(displayCards[1], 1)}
                                title={displayCards[1].title}
                                desc={displayCards[1].description}
                                dark
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="lg:col-span-1 max-[1024px]:order-0">
                        <ChooseCard
                            icon={getIcon(displayCards[2], 2)}
                            title={displayCards[2].title}
                            desc={displayCards[2].description}
                        />
                    </div>

                    <div className="lg:col-span-1 max-[1024px]:order-1">
                        <ChooseCard
                            icon={getIcon(displayCards[3], 3)}
                            title={displayCards[3].title}
                            desc={displayCards[3].description}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
