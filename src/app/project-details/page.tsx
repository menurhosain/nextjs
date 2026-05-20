"use client";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { ButtonModern } from "@/components/ui/button";
import ProjectGallery from "@/components/ui/project-gallery";
import { useState, useEffect, useCallback } from "react";
import { ProjectCheck ,ProjectArrowLeft ,ProjectArrowRight } from "@/components/ui/svgs";


const projectImages = ["/project-1.jpg", "/project-2.jpg", "/project-3.jpg", "/project-1.jpg", "/project-1.jpg"];

type GalleryImage = {
  id: number;
  src: string;
  thumb: string;
  title: string;
  category: string;
};

const images: GalleryImage[] = [
  {
    id: 1,
    src: "/project-4.jpg",
    thumb: "/project-4.jpg",
    title: "Mountain Peaks",
    category: "Landscape",
  },
  {
    id: 2,
    src: "/project-5.jpg",
    thumb: "/project-5.jpg",
    title: "Aerial Forest",
    category: "Nature",
  },
  {
    id: 3,
    src: "/project-6.jpg",
    thumb: "/project-6.jpg",
    title: "Golden Dunes",
    category: "Desert",
  },
];

export default function ProjectDetailsPage() {

    const [selected, setSelected] = useState<GalleryImage | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const openImage = (img: GalleryImage) => {
        setSelected(img);
        setIsVisible(true);
        document.body.style.overflow = "hidden";
    };
    
    const closeImage = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
        setSelected(null);
        document.body.style.overflow = "";
        }, 250);
    }, []);
    
    const navigate = useCallback(
        (dir: number) => {
        if (!selected) return;
        const idx = images.findIndex((img) => img.id === selected.id);
        const next = (idx + dir + images.length) % images.length;
        setSelected(images[next]);
        },
        [selected]
    );
    
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
        if (!selected) return;
        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowRight") navigate(1);
        if (e.key === "ArrowLeft") navigate(-1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selected, closeImage, navigate]);

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Insights Into Project Work" title={<>Complete Insights Into Project Design And Delivery</>} />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container mx-auto pt-[140px] pb-[150px] border-x border-sah-light-3">
                    <div className="mb-[60px]">
                        <ProjectGallery images={projectImages} />
                    </div>

                    <div className="grid grid-cols-[1fr_370px] place-items-start gap-x-[65px]">
                        <div className="">
                            <h3 className="text-[30px] font-bold font-geist">Building Construction Project</h3>
                            <p className="text-[16px] leading-normal text-sah-gray-2 mt-2">At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo duis turpis lorem elit dui consectetur magnis lacinia odio per placerat feugiat vestibulum volutpat mauris mollis primis imperdiet posu ere ex enim gravida cras congue</p>
                            <p className="text-[16px] leading-normal text-sah-gray-2 mt-6">pellentesque vulputate malesuada dictumst fames interdum cursus an te tellus porta ullamcorper accumsan non eu adipiscing  is the integer venenatis sagittis arcu curae finibus ridi culus aliquam velit lobortis senectus vitae sollicitudin sit consectetuer ultricies rutrum parturient pede nisi nascetur habitant netus quisque elementum inceptos nam felis penatibus feugiat</p>
                            <h3 className="text-[30px] font-bold font-geist mt-8">Project Goals</h3>      
                            <p className="text-[16px] leading-normal text-sah-gray-2 mt-2">At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo duis turpis lorem elit dui consectetur magnis lacinia odio per placerat congue vestibulum volutpat mauris mollis primis imperdiet posu ere ex enim gravida cras</p>
                            <ul className="grid grid-cols-2 gap-4 w-150 mt-5">
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <ProjectCheck/>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Various analysis options.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <ProjectCheck/>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Page Load (time, size, number of requests).</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <ProjectCheck/>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Advance Data analysis operation.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <ProjectCheck/>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Various analysis options.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-sah-red p-[30px] pt-[20px] sticky top-[100px] w-full">
                            <h3 className="font-geist font-bold text-[24px] text-sah-white mb-[20px]">Project Info</h3>
                            <div className="" />

                            {[
                                { label: "Client:", value: "Jhon Son Smith" },
                                { label: "Category:", value: "Constructions" },
                                { label: "Start Date:", value: "2022 June, 2023" },
                                { label: "End Date:", value: "14 October, 2024" },
                            ].map(({ label, value }, index) => (
                                <div className="border-t border-sah-overlay-white-30" key={label}>
                                    <div className="flex justify-between items-center py-[18px]">
                                        <span className="font-semibold text-[16px] text-sah-white">{label}</span>
                                        <span className="font-normal text-[16px] text-sah-white">{value}</span>
                                    </div>
                                </div>
                            ))}

                            <div className="flex mt-[10px]">
                                <ButtonModern link="#" label="Discuss Your Project" variant="solid" class_name="bg-sah-black w-full justify-center gap-[15px]" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-9">
                        {images.map((img) => (
                        <div
                            key={img.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${img.title}`}
                            onClick={() => openImage(img)}
                            onKeyDown={(e) => e.key === "Enter" && openImage(img)}
                            className="group relative overflow-hidden bg-neutral-900 cursor-pointer"
                        >
                            <img
                            src={img.thumb}
                            alt={img.title}
                            loading="lazy"
                            className="w-full h-full object-cover brightness-100 transition-all duration-500 group-hover:scale-105 group-hover:brightness-80"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <div>
                                <p className="text-white text-sm font-medium leading-tight">{img.title}</p>
                                <p className="text-white/60 text-[11px] uppercase tracking-widest mt-0.5">{img.category}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <p className="text-[16px] leading-normal text-sah-gray-2 mt-8">At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum cursus an te tellus porta ullamcorper accumsan non eu adipiscing integer venenatis sagittis arcu curae finibus ridi culus aliquam velit lobortis senectus vitae sollicitudin sit consectetuer ultricies rutrum parturient pede nisi nascetur habitant netus quisque elementum inceptos nam felis penatibus feugiat</p>
                    <div className="flex items-center justify-between border-t border-b border-sah-light-3 pt-4.5 pb-4.5 gap-4 mt-11">

                        
                        <a href="#"
                            className="flex items-center gap-3 flex-1 transition-all group">
                            <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 group-hover:text-sah-red transition-transform">
                                <ProjectArrowLeft/>
                            </span>
                            <div>
                            <p className="text-[16px] font-semibold  text-sah-dark-2 group-hover:text-sah-red mb-1 !m-0  transition-all">Previous Project</p>
                            </div>
                        </a>

                        {/* Next */}
                        <a href="#"
                            className="flex items-center flex-row-reverse gap-3 flex-1 text-right group">
                            <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-[-5px] group-hover:text-sah-red transition-transform">
                                <ProjectArrowRight/>
                            </span>
                            <div>
                            <p className="text-[16px] font-semibold text-sah-dark-2 group-hover:text-sah-red mb-1 !m-0 transition-all">Next Project</p>
                            </div>
                        </a>

                    </div>
                </div>
            </section>
            {/* Lightbox */}
            {selected && (
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
                        className="fixed top-5 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 text-lg hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                    >
                        ✕
                    </button>
            
                    {/* Content */}
                    <div
                        className="relative flex flex-col items-center gap-5 w-full max-w-5xl px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative flex items-center justify-center w-full">
                        {/* Prev */}
                        <button
                            aria-label="Previous image"
                            onClick={() => navigate(-1)}
                            className="absolute left-0 sm:-left-14 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-[24px] hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                        >
                            ←
                        </button>
            
                        <img
                            src={selected.src}
                            alt={selected.title}
                            className="max-w-full max-h-[72vh] object-contain rounded shadow-2xl"
                        />
            
                        {/* Next */}
                        <button
                            aria-label="Next image"
                            onClick={() => navigate(1)}
                            className="absolute right-0 sm:-right-14 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-24px hover:text-white hover:bg-sah-red hover:border-sah-red transition-all duration-200 cursor-pointer"
                        >
                            →
                        </button>
                        </div>
            
                        {/* Caption */}
                        <div className="text-center">
                        <p className="text-white/90 text-base font-light tracking-wide">{selected.title}</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{selected.category}</p>
                        </div>
                    </div>
            
                    {/* Dot indicators */}
                    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
                        {images.map((img) => (
                        <button
                            key={img.id}
                            aria-label={`Go to ${img.title}`}
                            onClick={(e) => {
                            e.stopPropagation();
                            setSelected(img);
                            }}
                            className={`rounded-full transition-all duration-200  cursor-pointer ${
                            img.id === selected.id
                                ? "w-5 h-2 bg-white/90"
                                : "w-2 h-2 bg-white/30 hover:bg-white/50"
                            }`}
                        />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
