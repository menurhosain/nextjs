import Link from "next/link";
import TeamCard from "@/components/ui/team-card";

const teams = [
    {
        image: "/team/1.jpg",
        name: "Albert Flores",
        role: "Software Developer",
        email: "hello@example.com",
        phone: "+968 9XXX XXXX"
    },
    {
        image: "/team/2.jpg",
        name: "Jane Cooper",
        role: "Team Leader",
        email: "hello@example.com",
        phone: "+968 9XXX XXXX"
    },
    {
        image: "/team/3.jpg",
        name: "Darrell Steward",
        role: "Project manager",
        email: "hello@example.com",
        phone: "+968 9XXX XXXX"
    }
];

const seniorLeadership = [
    { name: "Arlene McCoy", role: "Chief Administrative Officer" },
    { name: "Wade Warren", role: "Managing Director" },
    { name: "Brooklyn Simmons", role: "Managing Director" },
    { name: "Annette Black", role: "Managing Director" },
    { name: "Jacob Jones", role: "Managing Director" },
    { name: "Devon Lane", role: "Managing Director" },
    { name: "Eleanor Pena", role: "Managing Director" },
    { name: "Albert Flores", role: "Managing Director" },
    { name: "Kathryn Murphy", role: "Managing Director" },
    { name: "Guy Hawkins", role: "Managing Director" },
    { name: "Jerome Bell", role: "Managing Director" },
    { name: "Marvin McKinney", role: "Managing Director" },
    { name: "Floyd Miles", role: "Managing Director" },
    { name: "Bessie Cooper", role: "Managing Director" },
    { name: "Esther Howard", role: "Managing Director" }
]

export default function LeadershipSection() {

    return (
        <section className="section-padding bg-sah-light-4 bg-[url('/mosaic-patternt-bg.png')] bg-contain bg-bottom bg-no-repeat">
            <div className="container pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3 max-[1024px]:!px-4">
                <div className="relative flex max-[768px]:flex-col xl:items-center p-[20px] sm:p-[24px] pr-[30px] 2xl:pr-[135px] gap-[20px] md:gap-[40px] 2xl:gap-[115px] rounded-[6px] bg-white overflow-hidden">
                    <img className="absolute right-[-170px] 2xl:right-0 bottom-0" src="/construction-vector.png" alt="Vector" />
                    <div className="rounded-[6px] overflow-hidden w-full md:w-[280px] lg:w-[350px] xl:w-[522px] shrink-0 relative z-1">
                        <img src="/team/mr-gm.png" alt="Mr. Sojan Varghese" className="rounded-[6px]"/>
                    </div>
                    <div className="relative z-1">
                        <div className="text-[14px] leading-[28px] font-medium uppercase text-[#2B3944] mb-[13px]">Executive Leadership</div>
                        <h3 className="font-geist text-[22px] sm:text-[30px] lg:text-[40px] xl:text-[46px] 2xl:text-[52px] leading-[30px] sm:leading-[40px] lg:leading-[50px] xl:leading-[56px] 2xl:leading-[62px] font-semibold text-[#2B3944] mb-[20px]">Mr. Sojan Varghese</h3>
                        <p className="text-[15px] xl:text-[17px] leading-[24px] xl:leading-[28px] font-normal text-sah-gray-1 mb-[15px] xl:mb-[36px]">Joined as GM, driving innovation, tech adoption, and expanding capabilities. Under his leadership, SAH diversified and scaled to 450 staff with a turnover of OMR 4,800,000 and began executing larger, more complex projects</p>
                        <p className="text-[15px] lg:text-[17px] leading-[28px] font-bold sah-dark-2">Leadership meets trust – SAH chosen to build the future.</p>
                        <div className="flex max-[1024px]:flex-col lg:items-center gap-[0px] lg:gap-[30px] mt-[20px] xl:mt-[62px]">
                            <Link href="tel:+9689XXXXXXX" className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">+968 9XXX XXXX</Link>
                            <Link href="mailto:enquiries@sah.com" className="text-[15px] lg:text-[17px] leading-[28px] font-normal sah-transition text-sah-gray-1 hover:text-sah-red">enquiries@sah.com</Link>
                        </div>
                    </div>
                </div>
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
                <div className="relative px-[20px] sm:px-[40px] 2xl:px-[82px] pt-[40px] 2xl:pt-[82px] pb-[40px] 2xl:pb-[90px] rounded-[16px] bg-white overflow-hidden">
                    <h2 className="font-geist font-medium text-[30px] sm:text-[38px] md:text-[46px] xl:text-[60px] 2xl:text-[80px] leading-[1.2] text-sah-dark-2 mb-[30px] 2xl:mb-[70px]">Senior Leadership</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[25px] 2xl:gap-[40px]">
                        {seniorLeadership.map((item, index) => (
                            <div key={index}>
                                <h4 className="font-geist font-semibold text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[36px] text-sah-dark-2">{item.name}</h4>
                                <span className="text-[16px] leading-[24px] 2xl:leading-[36px] font-medium text-sah-gray-2">{item.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
