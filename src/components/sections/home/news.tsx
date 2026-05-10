import Section_Title from "@/components/ui/section-title";
import NewsCard from "@/components/ui/news-card";
import { ButtonModern } from "@/components/ui/button";

export default function News() {
    return (
        <section className="section-padding  bg-[linear-gradient(180deg,#F5F5F5_10.56%,rgba(245,245,245,0.785561)_60.83%,rgba(245,245,245,0)_158.97%),url('/news-section-bg.jpg')] bg-contain bg-bottom bg-no-repeat">
            <div className="container mx-auto py-[50px] lg:py-[140px] border-x border-sah-light-3">
                <div className="flex flex-col">
                    <div className="mb-[60px] flex flex-col items-center ">
                        <Section_Title
                            subtitle="Blog & News"
                            title=<> Our Latest News </>
                            description="Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based."
                            class_name={{ subtitle: "text-sah-black", title: "text-sah-black", description: "text-sah-gray-1" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-[400px_400px] md:grid-rows-[600px] gap-[20px] md:gap-[30px]">
                        <div className="md:col-span-2">
                            <NewsCard image="/news-post-1.jpg" author="Wade Warren" category="Architecture" title="Cost Effective Solutions for Building Projects" />
                        </div>
                        <div className="md:col-span-3">
                            <NewsCard image="/news-post-2.jpg" author="Wade Warren" category="Architecture" title="Cost Effective Solutions for Building Projects Solutions for Building Projects" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
