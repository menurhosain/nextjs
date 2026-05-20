import { get_project_by_slug } from "@/services/project.service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = (await headers()).get("x-locale") ?? "en";
    const project = await get_project_by_slug(slug, locale);

    if (!project) notFound();

    return (
        <main className="container mx-auto px-4 py-12">
            {project.content.length > 0 && (
                <div className="prose prose-neutral max-w-none mb-10">
                    <BlocksRenderer content={project.content} />
                </div>
            )}
        </main>
    );
}
