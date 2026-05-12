import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { ButtonModern } from "@/components/ui/button";
import ProjectGallery from "@/components/ui/project-gallery";

const projectImages = ["/project-1.jpg", "/project-2.jpg", "/project-3.jpg", "/project-1.jpg", "/project-1.jpg"];

export default function ProjectDetailsPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Insights Into Project Work" title=<>Complete Insights Into Project Design And Delivery</> />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container mx-auto py-[140px] border-x border-sah-light-3">
                    <div className="mb-[60px]">
                        <ProjectGallery images={projectImages} />
                    </div>

                    <div className="grid grid-cols-[1fr_370px] gap-x-[65px]">
                        <div className="bg-sah-light-3">content</div>
                        <div className="bg-sah-red p-[30px]">
                            <h3 className="font-geist font-bold text-[24px] text-sah-white mb-[20px]">Project Info</h3>
                            <div className="border-t border-sah-overlay-white-30" />

                            {[
                                { label: "Client:", value: "Jhon Son Smith" },
                                { label: "Category:", value: "Constructions" },
                                { label: "Start Date:", value: "2022 June, 2023" },
                                { label: "End Date:", value: "14 October, 2024" },
                            ].map(({ label, value }, index) => (
                                <div key={label}>
                                    <div className="flex justify-between items-center py-[18px]">
                                        <span className="font-semibold text-[16px] text-sah-white">{label}</span>
                                        <span className="font-normal text-[16px] text-sah-white">{value}</span>
                                    </div>
                                    <div className="border-t border-sah-overlay-white-30" />
                                </div>
                            ))}

                            <div className="flex mt-[20px]">
                                <ButtonModern link="#" label="Discuss Your Project" variant="solid" class_name="bg-sah-black w-full justify-center gap-[15px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
