import Section_Title from "@/components/ui/section-title";
import ProjectCard from "@/components/ui/project-card";
import { ButtonModern } from "@/components/ui/button";
import { StackCards } from "@/components/ui/stack-cards";

export default function Projects() {
    return (
        <section className="section-padding bg-[linear-gradient(0deg,#f5f5f566_42.16%,#f5f5f5_204.49%),url('/project-section-bg.jpg')] bg-bottom bg-no-repeat">
            <div className="container py-[140px] mx-auto border-x border-sah-light-3">
                <div className="mb-[70px]">
                    <Section_Title
                        subtitle="Latest Projects"
                        title=<>
                            Discover Our Completed <br /> Building Projects
                        </>
                        class_name={{ subtitle: "text-sah-black text-center", title: "text-sah-black text-center" }}
                    />
                </div>

                <div className="flex flex-col gap-[30px] mb-[60px]">
                    <ProjectCard
                        category="Architecture"
                        title="Police College Package C SQAPS Nizwa"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-1.jpg"
                    />
                    <ProjectCard
                        category="Architecture"
                        title="Special Task Force Complex – Al Khabourah"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-2.jpg"
                    />
                    <ProjectCard
                        category="Construction"
                        title="Jabal Akhdar Police Station Complex"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-3.jpg"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <ButtonModern link="#" label="View All Projects" />
                </div>
            </div>
        </section>
    );
}
