import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DownLongArrow } from "@/components/ui/svgs";



export default function Partner() {

    return (
        <section className="section-padding  bg-[linear-gradient(0deg,#f5f5f58f_42.16%,#fff0_204.49%),url('/home_service_bg.jpg')] bg-cover bg-center">
            <div className="container mx-auto py-[50px] lg:py-[140px] border-x border-sah-light-3">
                <div className="flex flex-col">
                    <div className="mb-[23px]" >
                        <div className="flex items-center justify-center gap-6 mb-[38px]">
                            <span className="text-sah-black flex items-center gap-[6px] text-[16px] font-medium tracking-widest uppercase font-inter">
                                [ Our Partners ]
                                <DownLongArrow class_name="!w-[14px] !h-[14px]" />
                            </span>
                        </div>
                        <ScrollReveal toColor="var(--color-sah-dark-2)">
                            <h2 className="section-heading mx-auto text-center leading-[48px] mb-[60px]">
                                <span className="text-sah-dark-2">
                                    Working with industry leading partners to <br/> ensure excellence in {" "}
                                </span>
                                <span className="text-sah-dark-2/50 scroll-color font-bold">every construction <br/> project we deliver</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
