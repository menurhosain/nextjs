import Section_Title from "@/components/ui/section-title";
import TeamCard from "@/components/ui/team-card";
import { SectionTitle, TeamMember } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

const FALLBACK_TEAMS = [
    { id: 1, image: "/team/1.jpg", name: "Albert Flores", role: "Software Developer" },
    { id: 2, image: "/team/2.jpg", name: "Jane Cooper", role: "Team Leader" },
    { id: 3, image: "/team/3.jpg", name: "Darrell Steward", role: "Project manager" },
    { id: 4, image: "/team/4.jpg", name: "Jenny Wilson", role: "Project Manager" },
];

interface TeamSectionProps {
    section_title?: SectionTitle | null;
    teams?: TeamMember[];
}

export default function TeamSection({ section_title, teams }: TeamSectionProps) {
    const displayTeams = teams && teams.length > 0
        ? teams.map((m) => ({ ...m, image: getStrapiMediaUrl(m.image) || "" }))
        : FALLBACK_TEAMS;

    return (
        <section className="relative w-full section-padding lg:pt-[140px] lg:pb-[110px] py-[80px] bg-sah-dark-2">
            <div className="container">
                <div className="grid grid-cols-6 gap-5 items-start mb-[50px]">
                    <div className="col-span-3">
                        <Section_Title
                            subtitle={section_title?.sub_title || "Our Teams"}
                            class_name={{ subtitle: "text-white mb-[0] capitalize" }}
                        />
                    </div>
                    <div className="col-span-3">
                        <Section_Title
                            title={section_title?.title || "Our leadership teams"}
                            description={section_title?.description || "Our team brings extensive expertise in modular construction, offsite manufacturing, and complex project execution. With a strong focus on innovation, efficiency, and precision, we continuously."}
                            class_name={{
                                title: "xl:!text-[80px] xl:!leading-[86px] font-medium text-white !mb-[15px] max-w-[870px] text-[70px] ",
                                description: "text-white"
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-[30px]">
                    {displayTeams.map((team, index) => (
                        <TeamCard
                            key={team.id || index}
                            image={team.image}
                            name={team.name}
                            role={team.role}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
