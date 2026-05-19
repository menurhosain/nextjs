import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/utils";
import { ExecutiveLeaderContent, TeamMember, SeniorLeader } from "@/services/page_content.service";
import TeamGrid from "@/components/sections/leadership/team-grid";


function ExecutiveLeader({ data }: { data?: ExecutiveLeaderContent | null }) {
    const image = getStrapiMediaUrl(data?.image) || "/team/mr-gm.png";
    const label = data?.label || "Executive Leadership";
    const name = data?.name || "Mr. Sojan Varghese";
    const description = data?.description || "Joined as GM, driving innovation, tech adoption, and expanding capabilities. Under his leadership, SAH diversified and scaled to 450 staff with a turnover of OMR 4,800,000 and began executing larger, more complex projects";
    const quote = data?.quote || "Leadership meets trust – SAH chosen to build the future.";
    const phone = data?.phone || "+968 9XXX XXXX";
    const email = data?.email || "enquiries@sah.com";

    return (
        <div className="relative flex max-[768px]:flex-col xl:items-center p-[20px] sm:p-[24px] pr-[30px] 2xl:pr-[135px] gap-[20px] md:gap-[40px] 2xl:gap-[115px] rounded-[6px] bg-white overflow-hidden">
            <img className="absolute right-[-170px] 2xl:right-0 bottom-0" src="/construction-vector.png" alt="Vector" />
            <div className="rounded-[6px] overflow-hidden w-full md:w-[280px] lg:w-[350px] xl:w-[522px] shrink-0 relative z-1">
                <img src={image} alt={name} className="rounded-[6px]" />
            </div>
            <div className="relative z-1">
                <div className="text-[14px] leading-[28px] font-medium uppercase text-[#2B3944] mb-[13px]">{label}</div>
                <h3 className="font-geist text-[22px] sm:text-[30px] lg:text-[40px] xl:text-[46px] 2xl:text-[52px] leading-[30px] sm:leading-[40px] lg:leading-[50px] xl:leading-[56px] 2xl:leading-[62px] font-semibold text-[#2B3944] mb-[20px]">{name}</h3>
                <p className="text-[15px] xl:text-[17px] leading-[24px] xl:leading-[28px] font-normal text-sah-gray-1 mb-[15px] xl:mb-[36px]">{description}</p>
                <p className="text-[15px] lg:text-[17px] leading-[28px] font-bold sah-dark-2">{quote}</p>
                <div className="flex max-[1024px]:flex-col lg:items-center gap-[0px] lg:gap-[30px] mt-[20px] xl:mt-[62px]">
                    <Link href={`tel:${phone}`} className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">{phone}</Link>
                    <Link href={`mailto:${email}`} className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">{email}</Link>
                </div>
            </div>
        </div>
    );
}


const FALLBACK_SENIOR_LEADERSHIP = [
    { id: 1, name: "Arlene McCoy", role: "Chief Administrative Officer" },
    { id: 2, name: "Wade Warren", role: "Managing Director" },
    { id: 3, name: "Brooklyn Simmons", role: "Managing Director" },
    { id: 4, name: "Annette Black", role: "Managing Director" },
    { id: 5, name: "Jacob Jones", role: "Managing Director" },
    { id: 6, name: "Devon Lane", role: "Managing Director" },
    { id: 7, name: "Eleanor Pena", role: "Managing Director" },
    { id: 8, name: "Albert Flores", role: "Managing Director" },
    { id: 9, name: "Kathryn Murphy", role: "Managing Director" },
    { id: 10, name: "Guy Hawkins", role: "Managing Director" },
    { id: 11, name: "Jerome Bell", role: "Managing Director" },
    { id: 12, name: "Marvin McKinney", role: "Managing Director" },
    { id: 13, name: "Floyd Miles", role: "Managing Director" },
    { id: 14, name: "Bessie Cooper", role: "Managing Director" },
    { id: 15, name: "Esther Howard", role: "Managing Director" },
];

function SeniorLeadership({ data, senior_leadership_title }: { data?: SeniorLeader[] | null, senior_leadership_title?:string }) {
    const items = data && data.length > 0 ? data : FALLBACK_SENIOR_LEADERSHIP;

    return (
        <div className="relative px-[20px] sm:px-[40px] 2xl:px-[82px] pt-[40px] 2xl:pt-[82px] pb-[40px] 2xl:pb-[90px] rounded-[16px] bg-white overflow-hidden">
            <h2 className="font-geist font-medium text-[30px] sm:text-[38px] md:text-[46px] xl:text-[60px] 2xl:text-[80px] leading-[1.2] text-sah-dark-2 mb-[30px] 2xl:mb-[70px]">{senior_leadership_title || "Senior Leadership"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[25px] 2xl:gap-[40px]">
                {items.map((item) => (
                    <div key={item.id}>
                        <h4 className="font-geist font-semibold text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[36px] text-sah-dark-2">{item.name}</h4>
                        <span className="text-[16px] leading-[24px] 2xl:leading-[36px] font-medium text-sah-gray-2">{item.role}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function LeadershipSection({ executive_leader, teams, senior_leadership, senior_leadership_title }: { executive_leader?: ExecutiveLeaderContent | null; teams?: TeamMember[]; senior_leadership?: SeniorLeader[] | null, senior_leadership_title?:string }) {
    return (
        <section className="section-padding bg-sah-light-4 bg-[url('/mosaic-patternt-bg.png')] bg-contain bg-bottom bg-no-repeat">
            <div className="container pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3 max-[1024px]:!px-4">
                <ExecutiveLeader data={executive_leader} />
                <TeamGrid data={teams} />
                <SeniorLeadership data={senior_leadership} senior_leadership_title={senior_leadership_title} />
            </div>
        </section>
    );
}