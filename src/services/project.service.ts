export type Project = {
    scope: string;
    industry: string;
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
        { scope: "Architecture", industry: "Government", title: "Police College Package C SQAPS Nizwa", image: "/project-1.jpg", year: "2021", location: "Nizwa, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Transportation", title: "Al Amerat Highway Development Phase 2", image: "/project-2.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Healthcare", title: "Royal Hospital Extension Block D", image: "/project-3.jpg", year: "2020", location: "Muscat, Oman", link: "#" },
        { scope: "Commercial", industry: "Industrial", title: "Sohar Industrial Port Facility Upgrade", image: "/project-1.jpg", year: "2023", location: "Sohar, Oman", link: "#" },
        { scope: "Residential", industry: "Hospitality", title: "Al Mouj Marina District Housing Complex", image: "/project-3.jpg", year: "2021", location: "Muscat, Oman", link: "#" },
        { scope: "Architecture", industry: "Hospitality", title: "Salalah Airport Terminal Expansion Housing", image: "/project-2.jpg", year: "2022", location: "Salalah, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Government", title: "Duqm Special Economic Zone Road Network", image: "/project-1.jpg", year: "2023", location: "Duqm, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Industrial", title: "Ibri Cement Plant Structural Works", image: "/project-2.jpg", year: "2021", location: "Ibri, Oman", link: "#" },
        { scope: "Architecture", industry: "Healthcare", title: "Nizwa Regional Medical Centre Phase 1", image: "/project-3.jpg", year: "2022", location: "Nizwa, Oman", link: "#" },
        { scope: "Commercial", industry: "Hospitality", title: "Salalah Beach Resort & Spa Complex", image: "/project-1.jpg", year: "2023", location: "Salalah, Oman", link: "#" },
        { scope: "Residential", industry: "Government", title: "Ministry of Housing Staff Quarters Muscat", image: "/project-2.jpg", year: "2020", location: "Muscat, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Transportation", title: "Sohar Port Access Road Widening Project", image: "/project-3.jpg", year: "2022", location: "Sohar, Oman", link: "#" },
        { scope: "Architecture", industry: "Industrial", title: "Duqm Refinery Administration Building", image: "/project-1.jpg", year: "2023", location: "Duqm, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Transportation", title: "Ibri Interchange & Flyover Construction", image: "/project-2.jpg", year: "2021", location: "Ibri, Oman", link: "#" },
        { scope: "Commercial", industry: "Government", title: "Muscat Municipality Complex Renovation", image: "/project-3.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { scope: "Residential", industry: "Hospitality", title: "Salalah Garden Villas Phase 3", image: "/project-1.jpg", year: "2023", location: "Salalah, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Industrial", title: "Sohar Industrial Estate Drainage Network", image: "/project-2.jpg", year: "2020", location: "Sohar, Oman", link: "#" },
        { scope: "Architecture", industry: "Transportation", title: "Nizwa Bus Terminal & Depot Facility", image: "/project-3.jpg", year: "2021", location: "Nizwa, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Healthcare", title: "Duqm Field Hospital Structural Package", image: "/project-1.jpg", year: "2022", location: "Duqm, Oman", link: "#" },
        { scope: "Commercial", industry: "Industrial", title: "Ibri Logistics Hub Warehouse Complex", image: "/project-2.jpg", year: "2023", location: "Ibri, Oman", link: "#" },
        { scope: "Residential", industry: "Government", title: "Royal Oman Police Officers Housing Sohar", image: "/project-3.jpg", year: "2021", location: "Sohar, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Healthcare", title: "Muscat Tertiary Hospital Utility Networks", image: "/project-1.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { scope: "Architecture", industry: "Government", title: "Salalah Governorate Headquarters Building", image: "/project-2.jpg", year: "2020", location: "Salalah, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Hospitality", title: "Nizwa Heritage Hotel Structural Refurbishment", image: "/project-3.jpg", year: "2023", location: "Nizwa, Oman", link: "#" },
        { scope: "Commercial", industry: "Transportation", title: "Duqm Airport Retail & Commercial Zone", image: "/project-1.jpg", year: "2022", location: "Duqm, Oman", link: "#" },
        { scope: "Residential", industry: "Industrial", title: "Ibri Workers Accommodation Village Block B", image: "/project-2.jpg", year: "2021", location: "Ibri, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Government", title: "Muscat Ring Road Southern Section Upgrade", image: "/project-3.jpg", year: "2023", location: "Muscat, Oman", link: "#" },
        { scope: "Architecture", industry: "Hospitality", title: "Sohar Grand Hotel Tower Design & Build", image: "/project-1.jpg", year: "2022", location: "Sohar, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Industrial", title: "Salalah Free Zone Factory Slab Package", image: "/project-2.jpg", year: "2020", location: "Salalah, Oman", link: "#" },
        { scope: "Commercial", industry: "Healthcare", title: "Nizwa Medical Mall & Outpatient Centre", image: "/project-3.jpg", year: "2021", location: "Nizwa, Oman", link: "#" },
        { scope: "Residential", industry: "Transportation", title: "Duqm Port Community Housing Phase 1", image: "/project-1.jpg", year: "2022", location: "Duqm, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Hospitality", title: "Ibri Tourism Zone Utilities & Roads", image: "/project-2.jpg", year: "2023", location: "Ibri, Oman", link: "#" },
        { scope: "Architecture", industry: "Healthcare", title: "Muscat Specialist Clinic & Pharmacy Hub", image: "/project-3.jpg", year: "2021", location: "Muscat, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Government", title: "Sohar Royal Court Annex Civil Package", image: "/project-1.jpg", year: "2022", location: "Sohar, Oman", link: "#" },
        { scope: "Commercial", industry: "Hospitality", title: "Salalah Waterfront Mixed-Use Development", image: "/project-2.jpg", year: "2023", location: "Salalah, Oman", link: "#" },
        { scope: "Residential", industry: "Healthcare", title: "Nizwa Doctors Residential Compound Block A", image: "/project-3.jpg", year: "2020", location: "Nizwa, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Industrial", title: "Duqm Petrochemical Plant Pipeline Network", image: "/project-1.jpg", year: "2021", location: "Duqm, Oman", link: "#" },
        { scope: "Architecture", industry: "Transportation", title: "Ibri Truck Rest Area & Service Station", image: "/project-2.jpg", year: "2022", location: "Ibri, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Hospitality", title: "Muscat Corniche Promenade Hardscape Works", image: "/project-3.jpg", year: "2023", location: "Muscat, Oman", link: "#" },
        { scope: "Commercial", industry: "Government", title: "Sohar Customs & Immigration Terminal", image: "/project-1.jpg", year: "2021", location: "Sohar, Oman", link: "#" },
        { scope: "Residential", industry: "Industrial", title: "Salalah Technician Village Expansion", image: "/project-2.jpg", year: "2022", location: "Salalah, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Transportation", title: "Nizwa to Bahla Highway Rehabilitation", image: "/project-3.jpg", year: "2020", location: "Nizwa, Oman", link: "#" },
        { scope: "Architecture", industry: "Industrial", title: "Duqm Dry Dock Operations Control Building", image: "/project-1.jpg", year: "2021", location: "Duqm, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Transportation", title: "Ibri Rail Station Civil & Structural Works", image: "/project-2.jpg", year: "2023", location: "Ibri, Oman", link: "#" },
        { scope: "Commercial", industry: "Industrial", title: "Muscat Technology Park Phase 2 Shell & Core", image: "/project-3.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { scope: "Residential", industry: "Hospitality", title: "Sohar Beachfront Apartment Tower C", image: "/project-1.jpg", year: "2021", location: "Sohar, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Healthcare", title: "Salalah Central Hospital MEP Infrastructure", image: "/project-2.jpg", year: "2022", location: "Salalah, Oman", link: "#" },
        { scope: "Architecture", industry: "Government", title: "Nizwa Wilayat Council Administrative Centre", image: "/project-3.jpg", year: "2023", location: "Nizwa, Oman", link: "#" },
        { scope: "Civil Engineering", industry: "Industrial", title: "Duqm Ship Repair Yard Hardstand Package", image: "/project-1.jpg", year: "2020", location: "Duqm, Oman", link: "#" },
        { scope: "Commercial", industry: "Healthcare", title: "Ibri Pharmaceutical Distribution Centre", image: "/project-2.jpg", year: "2021", location: "Ibri, Oman", link: "#" },
        { scope: "Residential", industry: "Government", title: "Muscat Armed Forces Officers Villas Phase 4", image: "/project-3.jpg", year: "2022", location: "Muscat, Oman", link: "#" },
        { scope: "Infrastructure", industry: "Transportation", title: "Sohar Container Terminal Road Linkage", image: "/project-1.jpg", year: "2023", location: "Sohar, Oman", link: "#" },
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
