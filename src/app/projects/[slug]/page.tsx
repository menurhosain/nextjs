import { get_project_by_slug } from "@/services/project.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProjectDetailsPage from "./page_view";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const project = await get_project_by_slug(slug, locale);

    if (!project) notFound();

    return <ProjectDetailsPage project_content={project} />;
}
