import TeamCard from "@/components/ui/team-card";
import { TeamMember } from "@/services/page_content.service";
import { getStrapiMediaUrl } from "@/lib/utils";

const FALLBACK_TEAMS = [
    { id: 0, image: "/team/1.jpg", name: "Albert Flores", role: "Software Developer", email: "hello@example.com", phone: "+968 9XXX XXXX" },
    { id: 0, image: "/team/2.jpg", name: "Jane Cooper", role: "Team Leader", email: "hello@example.com", phone: "+968 9XXX XXXX" },
    { id: 0, image: "/team/3.jpg", name: "Darrell Steward", role: "Project manager", email: "hello@example.com", phone: "+968 9XXX XXXX" },
];

export default function TeamGrid({ data }: { data?: TeamMember[] }) {
    const teams = data && data.length > 0 ? data.map((m) => ({ ...m, image: getStrapiMediaUrl(m.image) || "" })) : FALLBACK_TEAMS;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[50px] mb-[80px] lg:mb-[150px]">
            {teams.map((team, index) => (
                <TeamCard
                    key={index}
                    className="bg-transparent border border-sah-light-3 pb-[30px]"
                    titleClass="text-sah-dark-2"
                    roleClass="text-sah-dark-2"
                    image={team.image}
                    name={team.name}
                    role={team.role}
                    showContact={true}
                    email={team.email}
                    phone={team.phone}
                />
            ))}
        </div>
    );
}
