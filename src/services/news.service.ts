export type NewsPost = {
    image: string;
    title: string;
    date: string;
    category: string[];
};

export async function get_news_posts(): Promise<NewsPost[] | null> {
    try {
        return [
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["Event"]
            },
            {
                image: "/news-post-1.jpg",
                title: "Test Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["Summit"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News", "Event"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News", "Event"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["Event"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["News", "Event"]
            },
            {
                image: "/news-post-2.jpg",
                title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
                date: "May 05, 2026",
                category: ["Event"]
            }
        ];
    } catch {
        return [];
    }
}

export async function get_news_categories(): Promise<string[]> {
    const posts = await get_news_posts();
    if (!posts || posts.length === 0) return [];

    return [...new Set(posts.flatMap((post) => post.category))];
}
