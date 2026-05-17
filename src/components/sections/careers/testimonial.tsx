import { TestimonialQuote } from "@/components/ui/svgs";

export default function Testimonial() {
    return (
        <>
            <section className="bg-sah-light-4">
                <div className="section-padding !px-[0] flex items-center bg-[url('/testimonial-bg.jpg')] h-[615px] bg-cover bg-center">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-end">
                            <div className="relative px-6 max-w-[900px]">         
                                <div className="bg-white overflow-hidden mr-[10px] mb-[10px] shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                                    <div className="px-[50px] pt-[51px] pb-[55px] relative">   
                                        <p className="relative z-10 text-[24px] font-regular leading-[36px] text-sah-dark-2 mb-6 min-h-[108px]">
                                            At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum
                                        </p>
                                        <div className="h-px bg-sah-light-3 mb-7" />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start flex-col gap-0">
                                                <p className="text-[24px] font-bold text-sah-dark-2 leading-snug pb-[5px]">
                                                    Mr. Sojan Varghese
                                                </p>
                                                <p className="text-[16px] font-medium text-sah-gray-1">
                                                    Team, Leader
                                                </p>
                                            </div>
                                            <div className="flex gap-[3px] items-end opacity-75 ">
                                                <TestimonialQuote/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



 
