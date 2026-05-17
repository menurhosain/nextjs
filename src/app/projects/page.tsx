import { get_projects, get_project_tags } from "@/services/project.service";
import { get_project_page_content } from "@/services/page_content.service";
import { headers } from "next/headers";
import ProjectsView from "./projects-view";

export default async function ProjectsPage() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [projects, tags, content] = await Promise.all([get_projects(locale), get_project_tags(locale), get_project_page_content(locale)]);
    return <ProjectsView projects={projects} tags={tags} content={content} />;
}
