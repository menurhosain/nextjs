import { TestimonialQuote } from "@/components/ui/svgs";

type Props = {
    bg?: string;
    quote?: string;
    author_name?: string;
    author_role?: string;
};

export default function Testimonial({ bg, quote, author_name, author_role }: Props) {
    const bgStyle = bg ? { backgroundImage: `url('${bg}')` } : undefined;

    return (
        <>
            <section className="bg-sah-light-4">
                <div
                    className="section-padding !px-[0] flex items-center bg-[url('/testimonial-bg.jpg')] max-[640px]:py-16 sm:h-[615px] bg-cover bg-center relative"
                    style={bgStyle}
                >
                    <div className="container mx-auto max-[640px]:!px-4">
                        <div className="flex flex-col items-end">
                            <div className="relative sm:px-6 sm:max-w-[900px]">
                                <div className="bg-white overflow-hidden mr-[10px] mb-[10px] shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                                    <div className="px-[30px] md:px-[50px] pt-[30px] md:pt-[51px] pb-[30px] md:pb-[55px] relative">
                                        <p className="relative z-10 text-[18px] sm:text-[20px] lg:text-[24px] font-regular leading-[30px] sm:leading-[36px] text-sah-dark-2 mb-6 min-h-[108px]">
                                            {quote || "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum"}
                                        </p>
                                        <div className="h-px bg-sah-light-3 mb-4 sm:mb-7" />
                                        <div className="flex max-[640px]:flex-col sm:items-center justify-between max-[640px]:gap-4">
                                            <div className="flex items-start flex-col gap-0">
                                                <p className="text-[24px] font-bold text-sah-dark-2 leading-snug pb-[5px]">
                                                    {author_name || "Mr. Sojan Varghese"}
                                                </p>
                                                <p className="text-[16px] font-medium text-sah-gray-1">
                                                    {author_role || "Team, Leader"}
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







 




 
