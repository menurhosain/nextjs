import Section_Title from "@/components/ui/section-title";
import ProjectCard from "@/components/ui/project-card";

export default function Projects() {
    return (
        <section className="py-[140px] section-padding bg-sah-light-4">
            <div className="container">
                <div className="mb-[70px]">
                    <Section_Title
                        subtitle="Latest Projects"
                        title=<>
                            Discover Our Completed <br /> Building Projects
                        </>
                        class_name={{ subtitle: "sah-black text-center", title: "sah-black text-center" }}
                    />
                </div>

                <div className="flex flex-col gap-[40px]">
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
                        image="/project-1.jpg"
                    />
                    <ProjectCard
                        category="Construction"
                        title="Jabal Akhdar Police Station Complex"
                        description="Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures"
                        handover="2021"
                        location="Nizwa, Oman"
                        image="/project-1.jpg"
                    />
                </div>
            </div>
        </section>
    );
}
