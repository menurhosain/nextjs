import NewsCard from "@/components/ui/news-card";

const posts = [
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "Event"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News, Event"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News, Event"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "Event"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "News, Event"
    },
    {
        image: "/news-post-2.jpg",
        title: "Cost Effective Solutions for Building Projects Solutions for Building Projects",
        date: "May 05, 2026",
        category: "Event"
    }
]

export default function News() {

    return (
        <section className="section-padding bg-sah-light-4 bg-[url('/mosaic-patternt-bg.png')] bg-contain bg-bottom bg-no-repeat">
            <div className="container pt-[140px] pb-[140px] border-x border-sah-light-3">
                <div className="grid grid-cols-3 gap-[30px] mt-[50px] mb-[140px]">
                    {posts.map((post, index) => (
                        <NewsCard
                            key={index}
                            className="rounded-[12px]"
                            titleParam={{
                                className: "p-0 md:text-[24px]",
                                title: post.title
                            }}
                            metaParam={{
                                date: post.date,
                                category: post.category
                            }}
                            overlayParam={{
                                className: "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                            }}
                            imageParam={{
                                className: "h-[400px]",
                                src: post.image,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
