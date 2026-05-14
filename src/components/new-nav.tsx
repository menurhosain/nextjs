"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useOutsideClick } from "@/hook/use-outside-click";
import { AngleArrow, DownArrow, SearchIcon } from "./ui/svgs";

const languages = [
    { code: "en", label: "English", flag: "/uk-flag.svg" },
    { code: "ar", label: "Arabic", flag: "/oman-flag.svg" },
];

const navLinks = [
    {
        label: "Our Company",
        parent: true,
        card: {
            title: "About Us",
            description: "SAH is a Oman-based, international construction services company and is a leading builder in diverse market segments.",
            cta: { label: "GET TO KNOW US", href: "/about-us" },
        },
        promo: {
            title: "Become a Subcontractor",
            image: "/menu/1.jpg",
            cta: { label: "Learn How", href: "/become-a-subcontractor" },
        },
        submenus: [
            { label: "About Us", href: "/about-us" },
            { label: "Partner", href: "/partner" },
            { label: "Leadership", href: "/leadership" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        label: "Our Services",
        parent: true,
        card: {
            title: "Our Services",
            description: "We deliver end-to-end construction and engineering solutions across a wide range of industries and sectors.",
            cta: { label: "EXPLORE SERVICES", href: "/services" },
        },
        promo: {
            title: "Our Market Value",
            image: "/menu/2.jpg",
            cta: { label: "Learn How", href: "/services-details" },
        },
        submenus: [
            { label: "Services", href: "/services" },
            { label: "Services Details", href: "/services-details" },
        ],
    },
    {
        label: "Our Projects",
        parent: true,
        card: {
            title: "Our Projects",
            description: "From iconic stadiums to large-scale infrastructure, explore the projects that define our legacy.",
            cta: { label: "VIEW ALL PROJECTS", href: "/projects" },
        },
        promo: {
            title: "Our Wordclass projects",
            image: "/menu/3.jpg",
            cta: { label: "All Projects", href: "/projects" },
        },
        submenus: [
            { label: "Projects", href: "/projects" },
            { label: "Project Details", href: "/project-details" },
        ],
    },
    { label: "News", parent: false, href: "/news" },
    { label: "Careers", parent: false, href: "/careers" },
];

export function NavLinks() {
    return (
        <div className="xl:flex items-center gap-4 2xl:gap-6 py-4 justify-start h-[90px] hidden">
            <a href="/" className="text-white font-geist text-[36px] font-bold mr-[80px] uppercase">
                SAH
            </a>
            {navLinks.map((link) => (
                <div key={link.label} className="group">
                    {link.parent ? (
                        <button className="uppercase h-[90px] flex items-center gap-[6px] text-white text-[15px] text-[16px] font-semibold font-inter cursor-pointer">
                            {link.label}
                            <DownArrow class_name="!w-[10.5px] !h-[6px] transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                    ) : (
                        <a href={link.href} className="uppercase flex items-center gap-[6px] text-white text-[15px] text-[16px] font-semibold font-inter">
                            {link.label}
                        </a>
                    )}

                    {link.parent && (
                        <div className="absolute top-full left-0 h-[350px] w-screen bg-white shadow-lg z-50 transition-all duration-200 ease-out opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                            <div className="container h-full relative">
                                {/* Red bg bleeds from screen left edge to end of 30% column */}
                                <div className="absolute inset-y-0 bg-sah-red" style={{ left: "calc((100% - 100vw) / 2)", width: "calc(30% + (100vw - 100%) / 2)" }} />

                                {/* Image bg bleeds from right column to right screen edge */}
                                <div
                                    className="absolute inset-y-0 bg-cover bg-top"
                                    style={{ right: "calc((100% - 100vw) / 2)", width: "calc(30% + (100vw - 100%) / 2)", backgroundImage: `url(${link.promo?.image})` }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black to-transparent" />
                                </div>

                                <div className="flex h-full relative">
                                    <div className="w-[30%] flex flex-col justify-start gap-[20px] px-10 py-6 z-10">
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-sah-white font-geist text-[22px] font-semibold leading-snug">{link.card?.title}</h3>
                                            <p className="text-sah-white font-inter text-[16px] leading-[1.6]">{link.card?.description}</p>
                                        </div>
                                        <a href={link.card?.cta.href} className="flex items-center gap-3 text-white font-inter text-[13px] font-semibold tracking-widest uppercase">
                                            {link.card?.cta.label}
                                            <AngleArrow class_name="!w-[14px] !h-[14px]" />
                                        </a>
                                    </div>

                                    <div className="w-[40%] flex flex-col justify-start gap-4 py-6 px-10">
                                        {link.submenus?.map((sub) => (
                                            <a key={sub.label} href={sub.href} className="text-sm font-medium text-sah-black hover:text-sah-red whitespace-nowrap font-inter">
                                                {sub.label}
                                            </a>
                                        ))}
                                    </div>

                                    <div className="w-[30%] z-10 px-10 pb-6 flex flex-col justify-end">
                                        <a href={link.promo?.cta.href}>
                                            <p className="font-inter text-[26px] font-semibold text-white">{link.promo?.title}</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export function NavActions() {
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const [langOpen, setLangOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
    const langRef = useOutsideClick<HTMLDivElement>(useCallback(() => setLangOpen(false), []));

    return (
        <>
            <div className="w-full flex items-center py-4 justify-end gap-[15px] md:gap-[30px] h-[90px] z-10 relative">
                {/* Logo */}
                <a href="/" className="text-white flex-1 text-[36px] font-bold uppercase xl:hidden">
                    SAH
                </a>

                {/* Language selector */}
                <div className="relative" ref={langRef}>
                    <button onClick={() => setLangOpen(!langOpen)} className="flex items-center w-[120px] gap-[8px] text-sah-white cursor-pointer">
                        <img className="w-[20px] h-[20px]" src={selectedLang.flag} alt={selectedLang.label} />
                        <span className="font-inter text-[16px] font-semibold leading-[28px]">{selectedLang.label}</span>
                        <DownArrow class_name="!w-[12px] !h-[12px]" />
                    </button>
                    {langOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang);
                                        setLangOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-sah-black hover:bg-sah-light-4 whitespace-nowrap"
                                >
                                    <img className="w-[20px] h-[20px]" src={lang.flag} alt={lang.label} />
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* CTA button */}
                <Link
                    href="/become-a-subcontractor"
                    className="sm:flex hidden items-center gap-[14px] bg-sah-black text-sah-white text-[15px] xl:text-[16px] font-inter font-medium px-[24px] py-[12px] rounded-[8px]"
                >
                    Become a Subcontractor
                    <AngleArrow class_name="!w-[10px] !h-[10px]" />
                </Link>

                {/* Hamburger */}
                <button onClick={() => setMenuOpen(true)} className="group flex flex-col justify-center items-center gap-[5px] text-white cursor-pointer" aria-label="Open menu">
                    <span className="block w-6 h-[2px] bg-sah-white origin-right transition-transform duration-300 group-hover:scale-x-[0.7]" />
                    <span className="block w-6 h-[2px] bg-sah-white origin-right transition-transform duration-300 group-hover:scale-x-[0.8]" />
                    <span className="block w-6 h-[2px] bg-sah-white" />
                </button>
            </div>

            {/* Backdrop */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 z-50 h-full w-full bg-sah-white transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-1 h-full overflow-hidden relative">
                    <div className="absolute top-[100px] h-[1px] left-0 right-0 bg-sah-light-3 z-10" />
                    {/* Column 1 — 20% */}
                    <div className="w-[20%] h-full bg-sah-red relative overflow-hidden">
                        {/* Scrolling text — spans full column height including behind logo */}
                        <div className="absolute inset-0 overflow-hidden flex justify-center">
                            <div className="nav-scroll-up flex flex-col items-center">
                                {[...Array(2)].map((_, copy) =>
                                    [...Array(8)].map((_, i) => (
                                        <span key={`${copy}-${i}`} className="text-white font-bold select-none px-10" style={{ fontSize: "250px", writingMode: "vertical-rl", opacity: 0.2 }}>
                                            SAH
                                        </span>
                                    )),
                                )}
                            </div>
                        </div>

                        {/* Logo — sits on top of scrolling text */}
                        <div className="relative z-10 flex items-center h-[100px] pl-[60px]">
                            <a href="/">
                                <img src="/logo-white.png" alt="SAH logo" className="size-[70px] object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 — 60% (main content) */}
                    <div className="w-[60%] h-full flex flex flex-col border-x border-sah-light-3">
                        <div className="flex items-center justify-between h-[100px]">
                            {/* Search bar */}
                            <div className="flex items-center gap-3 px-6 py-3 group">
                                <SearchIcon class_name="!size-[24px] shrink-0 text-sah-dark !fill-sah-black group-hover:rotate-90 transition-rotate duration-500" />
                                <input type="text" placeholder="Search your query" className="flex-1 min-w-0 outline-none font-inter text-[14px] text-sah-dark placeholder:text-sah-dark/50" />
                            </div>

                            {/* Close button */}
                            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="cursor-pointer h-full w-[100px] flex items-center justify-center border-l border-sah-light-3">
                                <svg viewBox="0 0 24 24" className="!w-6 !h-6 fill-none stroke-black stroke-2">
                                    <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="pt-5 pb-[90px] flex-col justify-between overflow-y-scroll no-scrollbar flex-1" data-lenis-prevent>
                            <div className="flex flex-col px-[60px] ">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="border-b border-sah-light-3">
                                        {link.parent ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setOpenMenus((prev) => {
                                                            const next = new Set(prev);
                                                            next.has(link.label) ? next.delete(link.label) : next.add(link.label);
                                                            return next;
                                                        })
                                                    }
                                                    className="w-full flex text-[40px] items-center justify-between py-4 text-sah-black font-inter font-normal capitalize cursor-pointer transition-colors duration-500 hover:text-sah-red"
                                                >
                                                    {link.label}
                                                    <DownArrow class_name={`!w-[14px] !h-[10px] transition-transform duration-300 !fill-sah-red ${openMenus.has(link.label) ? "rotate-180" : ""}`} />
                                                </button>
                                                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMenus.has(link.label) ? "max-h-[400px] pb-3" : "max-h-0"}`}>
                                                    {link.submenus?.map((sub) => (
                                                        <a key={sub.label} href={sub.href} className="py-2 pl-4 text-sah-black font-inter text-sm hover:text-sah-red">
                                                            {sub.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="flex text-[40px] items-center py-4 text-sah-black font-inter font-normal capitalize transition-colors duration-500 hover:text-sah-red"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </div>
                                ))}

                                <div className="py-8">
                                    <Link
                                        href="/become-a-subcontractor"
                                        className="flex items-center justify-center gap-[14px] bg-sah-black text-sah-white font-inter font-medium px-[24px] py-[14px] rounded-[8px]"
                                    >
                                        Become a Subcontractor
                                        <AngleArrow class_name="!w-[10px] !h-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 — 20% */}
                    <div className="w-[20%] h-full flex flex-col overflow-hidden">
                        {/* Header row — matches other columns */}
                        <div className="flex items-center justify-end h-[100px] pr-[60px] shrink-0">
                            <a href="/contact" className="py-2 pl-4 text-sah-black font-inter text-[20px] hover:text-sah-red transition-colors duration-500 uppercase">
                                Contact Us
                            </a>
                        </div>

                        {/* Featured project */}
                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            <p className="font-inter text-[15px] font-semibold tracking-widest uppercase text-sah-red mb-4">Featured Project</p>
                            <Link href="#">
                                <div className="bg-white group rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                                    <span className="self-start border border-sah-light-2 rounded-full px-[12px] py-[4px] font-inter text-[13px] font-medium text-[#111111] whitespace-nowrap">
                                        Infrastructure
                                    </span>
                                    <h3 className="font-geist text-[18px] group-hover:text-sah-red transition-colors duration-500 font-medium leading-[24px] text-sah-black">Lusail Iconic Stadium</h3>
                                    <div className="relative rounded-xl overflow-hidden">
                                        <img src="/project-1.jpg" alt="Lusail Iconic Stadium" className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute bottom-3 right-3 bg-white rounded-xl px-[14px] py-[10px] grid grid-cols-[max-content_max-content] gap-x-[16px]">
                                            <div className="flex flex-col">
                                                <span className="font-inter text-[12px] font-medium leading-[18px] text-[#555555]">Year</span>
                                                <span className="font-inter text-[12px] font-medium leading-[18px] text-[#111111]">2022</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-inter text-[12px] font-medium leading-[18px] text-[#555555]">Location</span>
                                                <span className="font-inter text-[12px] font-medium leading-[18px] text-[#111111]">Lusail, Qatar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer — absolute bottom, same 3-col layout */}
                <div className="absolute bottom-0 left-0 right-0 flex h-[80px] border-t border-sah-light-3">
                    <div className="w-[20%] flex items-center pl-[60px]">
                        <a href="mailto:info@example.com" className="font-inter text-[14px] font-medium text-sah-white hover:text-sah-white/60 transition-colors duration-300">
                            info@example.com
                        </a>
                    </div>
                    <div className="w-[60%] bg-sah-white flex items-center gap-8 px-[60px] border-x border-sah-light-3">
                        <a href="#" className="font-inter text-[14px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            Facebook
                        </a>
                        <a href="#" className="font-inter text-[14px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            Instagram
                        </a>
                        <a href="#" className="font-inter text-[14px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            LinkedIn
                        </a>
                        <a href="#" className="font-inter text-[14px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            YouTube
                        </a>
                    </div>
                    <div className="w-[20%] flex items-center justify-start px-[60px]">
                        <a href="/projects" className="font-inter text-[14px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            View all projects
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
