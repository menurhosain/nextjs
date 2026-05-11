import Section_Title from "@/components/ui/section-title";


export default function WhyChoose() {
    return (
        <section className="section-padding relative pt-27 lg:pb-[140px] pb-[80px] bg-sah-dark-2">
            <div className="container mx-auto !px-0">
                <div className="flex flex-col items-center">
                    <div className="mb-[50px] flex flex-col items-start w-[580px]">
                        <Section_Title
                            subtitle="Why Choose us"
                            title=<> What makes us different </>
                            description="It’s not just about creating something good; it’s about designing, innovating, and collaborating to forge remarkable and unparalleled experiences."
                            class_name={{ subtitle: "text-sah-black !mb-[15px] text-left text-sah-white", title: "xl:!text-[80px] xl:!leading-[86px] text-sah-black !mb-[10px] text-center max-w-[870px] text-[70px] text-left text-sah-white", description: "text-sah-gray-1 text-center max-w-[870px] text-left text-sah-white" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}