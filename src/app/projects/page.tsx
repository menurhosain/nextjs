import Banner from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { SearchIcon, SettingIcon } from "@/components/ui/svgs";
import { ProjectCardSmall } from "@/components/ui/project-card-small";

const projects = [
    { tag: "Architecture", title: "Police College Package C SQAPS Nizwa", image: "/project-1.jpg", year: "2021", location: "Nizwa, Oman", link: "#" },
    { tag: "Infrastructure", title: "Al Amerat Highway Development Phase 2", image: "/project-2.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
    { tag: "Civil Engineering", title: "Royal Hospital Extension Block D", image: "/project-3.jpg", year: "2020", location: "Muscat, Oman", link: "#" },
    { tag: "Commercial", title: "Sohar Industrial Port Facility Upgrade", image: "/project-1.jpg", year: "2023", location: "Sohar, Oman", link: "#" },
    { tag: "Residential", title: "Al Mouj Marina District Housing Complex", image: "/project-3.jpg", year: "2021", location: "Muscat, Oman", link: "#" },
    { tag: "Architecture", title: "Salalah Airport Terminal Expansion Housing", image: "/project-2.jpg", year: "2022", location: "Salalah, Oman", link: "#" },
];

export default function ProjectsPage() {
    return (
        <>
            <Banner bg="/home-hero.mp4">
                <Banner.Left class_name="flex flex-col justify-center">
                    <div className="flex flex-col justify-center mt-[188px]">
                        <Banner_Title subtitle="Explore Our Recent Projects" title=<>Showcasing our latest construction projects and achievements</> />
                    </div>
                    <div className="flex gap-4 self-start w-[90%] py-[70px] relative  mt-auto">
                        <div className="absolute bg-sah-white/20 top-0 h-[1px] w-[120vw] ml-[calc(50%-50vw)]"></div>
                        {/* Search */}
                        <div className="flex-1 flex items-center gap-[20px] justify-between bg-sah-gray-5 px-6 cursor-pointer transition-colors duration-200 pr-[14px]">
                            <input
                                type="text"
                                className="text-sah-white h-[65px] flex-1 border-none outline-none font-inter text-[16px] font-medium placeholder:text-sah-white"
                                placeholder="Find a project"
                            />
                            <div className="size-[40px] flex items-center justify-center">
                                <SearchIcon class_name="!size-[18px]" />
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="flex-1 flex items-center gap-[20px] justify-between bg-sah-gray-5 px-6 cursor-pointer transition-colors duration-200 pr-[14px]">
                            <input
                                type="text"
                                className="text-sah-white h-[65px] flex-1 border-none outline-none font-inter text-[16px] font-medium placeholder:text-sah-white"
                                placeholder="Refined Your Search"
                            />
                            <div className="size-[40px] flex items-center justify-center">
                                <SettingIcon class_name="!size-[18px]" />
                            </div>
                        </div>
                    </div>
                </Banner.Left>

                <Banner.Right>
                    <div>Hello</div>
                </Banner.Right>
            </Banner>

            <section className="section-padding bg-sah-light-4">
                <div className="container py-[140px] border-x border-sah-light-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <ProjectCardSmall key={project.title} {...project} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
