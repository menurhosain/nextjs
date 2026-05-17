import { get_projects, get_project_tags } from "@/services/project.service";
import { get_project_page_content } from "@/services/page_content.service";
import ProjectsView from "./projects-view";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
    const { locale } = await searchParams;
    const [projects, tags, content] = await Promise.all([get_projects(), get_project_tags(), get_project_page_content(locale)]);
    return <ProjectsView projects={projects} tags={tags} content={content} />;
}
