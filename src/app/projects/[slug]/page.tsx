import type { Metadata } from "next";
import { get_project_by_slug } from "@/services/project.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProjectDetailsPage from "./page_view";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const project = await get_project_by_slug(slug, locale);

    if (!project) return {};

    return {
        title: project.title,
        description: project.excerpt || undefined,
        openGraph: {
            title: project.title,
            description: project.excerpt || undefined,
            ...(project.featuredImage && { images: [{ url: project.featuredImage }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.excerpt || undefined,
            ...(project.featuredImage && { images: [project.featuredImage] }),
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const project = await get_project_by_slug(slug, locale);

    if (!project) notFound();

    return <ProjectDetailsPage project_content={project} />;
}
