import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DownLongArrow } from "@/components/ui/svgs";
import { getStrapiMediaUrl } from "@/lib/utils";

interface partnerProps {
    subtitle?: string;
    titleNormal?: string;
    titleAnimated?: string;
    logos?: string[];
}

const partners = [
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
    { image: "/partner/5.png" },
    { image: "/partner/6.png" },
    { image: "/partner/7.png" },
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
    { image: "/partner/5.png" },
    { image: "/partner/6.png" },
    { image: "/partner/7.png" },
    { image: "/partner/1.png" },
    { image: "/partner/2.png" },
    { image: "/partner/3.png" },
    { image: "/partner/4.png" },
];

export default function Partner({logos, subtitle, titleNormal, titleAnimated}: partnerProps) {
    const hasLogos = Array.isArray(logos) && logos.length > 0;

    const partnerItems = hasLogos
        ? logos.map((media) => ({
            image: getStrapiMediaUrl(media),
        }))
        : partners;

    return (
        <section className="section-padding  bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center  relative z-[5]">
            <div className="container !px-[50px] pt-[73px] lg:pt-[143px] pb-[350px] lg:pb-[410px] border-x border-sah-light-3  max-[1024px]:!px-4">
                <div className="flex flex-col">
                    <div className="mb-[23px]" >
                        <div className="flex items-center justify-center gap-6 mb-[20px] md:mb-[38px]">
                            <span className="text-sah-black flex items-center gap-[6px] text-[16px] font-medium !tracking-normal uppercase font-inter">
                                [ {subtitle || "Our Partners"} ]
                                <DownLongArrow class_name="!w-[14px] !h-[14px]" />
                            </span>
                        </div>
                        <ScrollReveal toColor="var(--color-sah-dark-2)">
                            <h2 className="section-heading max-[1280px]:text-[36px] max-[1024px]:text-[30px] max-[768px]:text-[24px] max-[640px]:text-[20px] max-[1024px]:leading-[40px] max-[768px]:leading-[32px] max-[640px]:leading-[28px] mx-auto text-center leading-[48px] mb-[10px] lg:mb-[35px] max-w-[800px]">
                                <span className="text-sah-dark-2">
                                    {titleNormal || "Working with industry leading partners to ensure excellence in"} {" "}
                                </span>
                                <span className="text-sah-dark-2/50 scroll-color font-bold">{titleAnimated || "every construction project we deliver"}</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {partnerItems.map((partner, index) => (
                            <div key={index} className="px-3 2xl:px-5 py-7 2xl:py-10 rounded-[20px] hover:rounded-[100px] flex justify-center bg-sah-white hover:bg-sah-red sah-transition-all duration-600 group">
                                <img src={partner.image} className="brightness-90 invert group-hover:brightness-0 sah-transition-all duration-600 max-[1536px]:h-[23px] max-[450px]:h-[17px]" alt="logo" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
