"use client";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { ButtonModern } from "@/components/ui/button";
import ProjectGallery from "@/components/ui/project-gallery";
import { useState, useEffect, useCallback } from "react";
import { ProjectCheck, ProjectArrowLeft, ProjectArrowRight } from "@/components/ui/svgs";
import { ProjectDetail } from "@/services/project.service";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ProjectDetailsPage({ project_content }: { project_content: ProjectDetail }) {
    const gallery = project_content.imageGallerySecond;
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const openImage = (idx: number) => {
        setSelectedIdx(idx);
        setIsVisible(true);
        document.body.style.overflow = "hidden";
    };

    const closeImage = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            setSelectedIdx(null);
            document.body.style.overflow = "";
        }, 250);
    }, []);

    const navigate = useCallback(
        (dir: number) => {
            if (selectedIdx === null) return;
            setSelectedIdx((selectedIdx + dir + gallery.length) % gallery.length);
        },
        [selectedIdx, gallery.length],
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (selectedIdx === null) return;
            if (e.key === "Escape") closeImage();
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "ArrowLeft") navigate(-1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIdx, closeImage, navigate]);

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="" title={project_content.title} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container mx-auto pt-[80px] lg:pt-[150px] lg:pb-[150px] pb-[80px] border-x border-sah-light-3 max-[1024px]:!px-4">
                    <div className="lg:mb-[60px] mb-[30px]">
                        <ProjectGallery images={project_content.imageGallery} />
                    </div>

                    <div className="lg:grid 2xl:grid-cols-[1fr_370px] xl:grid-cols-[1fr_303px] lg:place-items-start gap-x-[30px] 2xl:gap-x-[65px]">
                        <div className="rich-content">
                            <BlocksRenderer content={project_content.content} />

                            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full sm:w-150 mt-5">
                                {project_content.highlited_lists?.map((item, index) => (
                                    <li key={item.id} className="flex items-center">
                                        <div className="bg-sah-red  rounded-full min-w-4 h-4 w-4 text-[10px] flex items-center justify-center">
                                            <ProjectCheck />
                                        </div>
                                        <p className="text-sah-dark-2 text-[16px] font-medium ms-2">{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-sah-red max-[640px]:px-4 p-[30px] pt-[20px] sticky top-[100px] w-full mt-8 xl:mt-0">
                            <h3 className="font-geist font-bold text-[24px] text-sah-white mb-[20px]">Project Info</h3>
                            <div className="" />

                            {[
                                { label: "Client:", value: project_content.clientName },
                                { label: "Category:", value: project_content.scopes[0] },
                                { label: "Start Date:", value: project_content.startDate },
                                { label: "End Date:", value: project_content.endDate },
                            ].map(({ label, value }, index) => (
                                <div className="border-t border-sah-overlay-white-30" key={label}>
                                    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center py-[18px]">
                                        <span className="font-semibold text-[16px] text-sah-white">{label}</span>
                                        <span className="font-normal text-[16px] text-sah-white">{value}</span>
                                    </div>
                                </div>
                            ))}

                            <div className="flex mt-[10px]">
                                <ButtonModern
                                    link="#"
                                    label="Discuss Your Project"
                                    variant="solid"
                                    class_name="bg-sah-black w-full justify-center gap-[15px] max-[1536px]:text-[14px] max-[640px]:text-[13px] max-[640px]:px-3"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid  md:grid-cols-3 grid-cols-1 gap-6 mt-9">
                        {gallery.map((src, idx) => (
                            <div
                                key={idx}
                                role="button"
                                tabIndex={0}
                                onClick={() => openImage(idx)}
                                onKeyDown={(e) => e.key === "Enter" && openImage(idx)}
                                className="group relative overflow-hidden bg-neutral-900 cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`${project_content.title} image ${idx + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover brightness-100 transition-all duration-500 group-hover:scale-105 group-hover:brightness-80"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rich-content">
                        <BlocksRenderer content={project_content.end_content} />
                    </div>

                    <div className="flex sm:flex-row flex-col items-center justify-between border-t border-b border-sah-light-3 pt-4.5 pb-4.5 gap-4 mt-11">
                        {project_content.prev ? (
                            <a href={`/projects/${project_content.prev.slug}`} className="flex items-center gap-3 flex-1 transition-all group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowLeft />
                                </span>
                                <div>
                                    <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red mb-1 !m-0 transition-all">Previous Project</p>
                                    <p className="text-[13px] text-sah-dark-2/60 !m-0">{project_content.prev.title}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {project_content.next && (
                            <a href={`/projects/${project_content.next.slug}`} className="flex items-center flex-row-reverse rtl:flex-row gap-3 flex-1 text-end group">
                                <span className="text-[20px] text-sah-dark-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:text-sah-red transition-transform">
                                    <ProjectArrowRight />
                                </span>
                                <div>
                                    <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red mb-1 !m-0 transition-all">Next Project</p>
                                    <p className="text-[13px] text-sah-dark-2/60 !m-0">{project_content.next.title}</p>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedIdx !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                    onClick={closeImage}
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-[250ms] ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {/* Close */}
                    <button
                        aria-label="Close"
                        onClick={closeImage}
                        className="fixed top-5 end-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 text-lg hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                    >
                        ✕
                    </button>

                    {/* Content */}
                    <div className="relative flex flex-col items-center gap-5 w-full max-w-5xl px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex items-center justify-center w-full">
                            {/* Prev */}
                            <button
                                aria-label="Previous image"
                                onClick={() => navigate(-1)}
                                className="absolute start-15 xl:-start-14 max-[1024px]:hidden z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-[24px] hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                            >
                                ←
                            </button>

                            <img src={gallery[selectedIdx]} alt={`${project_content.title} image ${selectedIdx + 1}`} className="max-w-full max-h-[72vh] object-contain rounded shadow-2xl" />

                            {/* Next */}
                            <button
                                aria-label="Next image"
                                onClick={() => navigate(1)}
                                className="absolute end-15 xl:-end-14 max-[1024px]:hidden z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-[24px] hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="fixed bottom-7 max-[1024px]:hidden left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
                        {gallery.map((_, idx) => (
                            <button
                                key={idx}
                                aria-label={`Go to image ${idx + 1}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIdx(idx);
                                }}
                                className={`rounded-full transition-all duration-200 cursor-pointer ${idx === selectedIdx ? "w-5 h-2 bg-white/90" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
