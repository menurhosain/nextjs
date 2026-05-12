export type Project = {
    tag: string;
    title: string;
    image: string;
    year: string;
    location: string;
    link: string;
};

export type ProjectTag = {
    key: string;
    label: string;
    options: string[];
};

export async function get_projects(): Promise<Project[]> {
    return [
        { tag: "Architecture", title: "Police College Package C SQAPS Nizwa", image: "/project-1.jpg", year: "2021", location: "Nizwa, Oman", link: "#" },
        { tag: "Infrastructure", title: "Al Amerat Highway Development Phase 2", image: "/project-2.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { tag: "Civil Engineering", title: "Royal Hospital Extension Block D", image: "/project-3.jpg", year: "2020", location: "Muscat, Oman", link: "#" },
        { tag: "Commercial", title: "Sohar Industrial Port Facility Upgrade", image: "/project-1.jpg", year: "2023", location: "Sohar, Oman", link: "#" },
        { tag: "Residential", title: "Al Mouj Marina District Housing Complex", image: "/project-3.jpg", year: "2021", location: "Muscat, Oman", link: "#" },
        { tag: "Architecture", title: "Salalah Airport Terminal Expansion Housing", image: "/project-2.jpg", year: "2022", location: "Salalah, Oman", link: "#" },
    ];
}

export async function get_project_tags(): Promise<ProjectTag[]> {
    return [
        {
            key: "location",
            label: "BY LOCATION",
            options: ["Nizwa", "Muscat", "Sohar", "Salalah", "Duqm", "Ibri"],
        },
        {
            key: "scope",
            label: "BY SCOPE OF WORK",
            options: ["Architecture", "Infrastructure", "Civil Engineering", "Commercial", "Residential"],
        },
        {
            key: "industry",
            label: "BY INDUSTRY",
            options: ["Government", "Healthcare", "Transportation", "Industrial", "Hospitality"],
        },
    ];
}
