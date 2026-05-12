import { get_projects, get_project_tags } from "@/services/project.service";
import ProjectsView from "./projects-view";

export default async function ProjectsPage() {
    const [projects, tags] = await Promise.all([get_projects(), get_project_tags()]);
    return <ProjectsView projects={projects} tags={tags} />;
}
