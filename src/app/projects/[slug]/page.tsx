export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-4">Project: {slug}</h1>
            <p className="text-muted-foreground">Static project detail page — content coming soon.</p>
        </main>
    );
}
