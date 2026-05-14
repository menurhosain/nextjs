"use client";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import { ButtonModern } from "@/components/ui/button";
import ProjectGallery from "@/components/ui/project-gallery";
import { useState, useEffect, useCallback } from "react";


const projectImages = ["/project-1.jpg", "/project-2.jpg", "/project-3.jpg", "/project-1.jpg", "/project-1.jpg"];

const images = [
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

    const [selected, setSelected] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const openImage = (img) => {
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
        (dir) => {
        if (!selected) return;
        const idx = images.findIndex((img) => img.id === selected.id);
        const next = (idx + dir + images.length) % images.length;
        setSelected(images[next]);
        },
        [selected]
    );
    
    useEffect(() => {
        const handleKey = (e) => {
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
            <Banner bg="/home-hero.mp4">
                <Left class_name="">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Insights Into Project Work" title=<>Complete Insights Into Project Design And Delivery</> />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding">
                <div className="container mx-auto py-[140px] border-x border-sah-light-3">
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
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 0.75C10.5 0.960938 10.4062 1.14844 10.2656 1.28906L4.26562 7.28906C4.125 7.42969 3.9375 7.5 3.75 7.5C3.53906 7.5 3.35156 7.42969 3.21094 7.28906L0.210938 4.28906C0.0703125 4.14844 0 3.96094 0 3.75C0 3.32812 0.328125 3 0.75 3C0.9375 3 1.125 3.09375 1.26562 3.23438L3.75 5.69531L9.21094 0.234375C9.35156 0.09375 9.53906 0 9.75 0C10.1484 0 10.5 0.328125 10.5 0.75Z" fill="white"/>
                                        </svg>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Various analysis options.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 0.75C10.5 0.960938 10.4062 1.14844 10.2656 1.28906L4.26562 7.28906C4.125 7.42969 3.9375 7.5 3.75 7.5C3.53906 7.5 3.35156 7.42969 3.21094 7.28906L0.210938 4.28906C0.0703125 4.14844 0 3.96094 0 3.75C0 3.32812 0.328125 3 0.75 3C0.9375 3 1.125 3.09375 1.26562 3.23438L3.75 5.69531L9.21094 0.234375C9.35156 0.09375 9.53906 0 9.75 0C10.1484 0 10.5 0.328125 10.5 0.75Z" fill="white"/>
                                        </svg>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Page Load (time, size, number of requests).</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 0.75C10.5 0.960938 10.4062 1.14844 10.2656 1.28906L4.26562 7.28906C4.125 7.42969 3.9375 7.5 3.75 7.5C3.53906 7.5 3.35156 7.42969 3.21094 7.28906L0.210938 4.28906C0.0703125 4.14844 0 3.96094 0 3.75C0 3.32812 0.328125 3 0.75 3C0.9375 3 1.125 3.09375 1.26562 3.23438L3.75 5.69531L9.21094 0.234375C9.35156 0.09375 9.53906 0 9.75 0C10.1484 0 10.5 0.328125 10.5 0.75Z" fill="white"/>
                                        </svg>
                                    </div>
                                    <p className="text-sah-dark-2 text-[16px] font-medium ml-2">Advance Data analysis operation.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-sah-red  rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 0.75C10.5 0.960938 10.4062 1.14844 10.2656 1.28906L4.26562 7.28906C4.125 7.42969 3.9375 7.5 3.75 7.5C3.53906 7.5 3.35156 7.42969 3.21094 7.28906L0.210938 4.28906C0.0703125 4.14844 0 3.96094 0 3.75C0 3.32812 0.328125 3 0.75 3C0.9375 3 1.125 3.09375 1.26562 3.23438L3.75 5.69531L9.21094 0.234375C9.35156 0.09375 9.53906 0 9.75 0C10.1484 0 10.5 0.328125 10.5 0.75Z" fill="white"/>
                                        </svg>
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
                            className="w-full h-full object-cover brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <div>
                                <p className="text-white text-sm font-medium leading-tight">{img.title}</p>
                                <p className="text-white/60 text-[11px] uppercase tracking-widest mt-0.5">{img.category}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <p className="text-[16px] leading-normal text-sah-gray-2 mt-8">At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum cursus an te tellus porta ullamcorper accumsan non eu adipiscing integer venenatis sagittis arcu curae finibus ridi culus aliquam velit lobortis senectus vitae sollicitudin sit consectetuer ultricies rutrum parturient pede nisi nascetur habitant netus quisque elementum inceptos nam felis penatibus feugiat</p>
                    <div className="flex items-center justify-between border-t border-b border-sah-light-3 pt-4.5 pb-4.5 gap-4 mt-6">

                        
                        <a href="#"
                            className="flex items-center gap-3 flex-1 transition-all group">
                            <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path></svg>
                            </span>
                            <div>
                            <p className="text-[16px] font-semibold  text-sah-dark-2 mb-1 !m-0">Previous Project</p>
                            </div>
                        </a>

                        {/* Next */}
                        <a href="#"
                            className="flex items-center flex-row-reverse gap-3 flex-1 text-right">
                            <span className="text-[20px] text-sah-dark-2 group-hover:-translate-x-1 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"></path></svg>
                            </span>
                            <div>
                            <p className="text-[16px] font-semibold text-sah-dark-2 mb-1 !m-0">Next Project</p>
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
                        className="fixed top-5 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 text-lg hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
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
                            className="absolute left-0 sm:-left-14 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-xl hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
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
                            className="absolute right-0 sm:-right-14 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/60 text-xl hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
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
                            className={`rounded-full transition-all duration-200 ${
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
