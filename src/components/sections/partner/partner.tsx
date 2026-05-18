import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DownLongArrow } from "@/components/ui/svgs";

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

export default function Partner() {

    return (
        <section className="section-padding !px-[0]  bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center  relative z-[5]">
            <div className="container !px-[50px] pt-[50px] lg:pt-[140px] pb-[250px] lg:pb-[410px] border-x border-sah-light-3">
                <div className="flex flex-col">
                    <div className="mb-[23px]" >
                        <div className="flex items-center justify-center gap-6 mb-[38px]">
                            <span className="text-sah-black flex items-center gap-[6px] text-[16px] font-medium !tracking-normal uppercase font-inter">
                                [ Our Partners ]
                                <DownLongArrow class_name="!w-[14px] !h-[14px]" />
                            </span>
                        </div>
                        <ScrollReveal toColor="var(--color-sah-dark-2)">
                            <h2 className="section-heading mx-auto text-center leading-[48px] mb-[30px]">
                                <span className="text-sah-dark-2">
                                    Working with industry leading partners to <br/> ensure excellence in {" "}
                                </span>
                                <span className="text-sah-dark-2/50 scroll-color font-bold">every construction <br/> project we deliver</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                    <div className="grid grid-cols-6 gap-3">
                    {partners.map((partner, index) => (
                        <div key={index} className="px-5 py-10 rounded-[20px] hover:rounded-[100px] flex justify-center bg-sah-white hover:bg-sah-red sah-transition-all duration-600 group">
                            <img src={partner.image} className="brightness-90 invert group-hover:brightness-0 sah-transition-all duration-600" alt="logo" />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
