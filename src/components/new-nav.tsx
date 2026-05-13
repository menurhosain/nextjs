"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useOutsideClick } from "@/hook/use-outside-click";
import { AngleArrow, DownArrow, SearchIcon } from "./ui/svgs";

const languages = [
    { code: "en", label: "English", flag: "/uk-flag.png" },
    { code: "ar", label: "Arabic", flag: "/katar-flag.png" },
];

//const navLinks = ["Our Company", "Our Services", "Our Projects", "News", "Careers"];
const navLinks = [
    {
        label: "Our Company",
        parent: true,
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
        submenus: [
            { label: "Services", href: "/services" },
            { label: "Services Details", href: "/services-details" },
        ],
    },
    {
        label: "Our Projects",
        parent: true,
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
                        <div className="absolute top-full left-1/2 min-h-[300px] -translate-x-1/2 w-screen bg-white shadow-lg z-50 transition-all duration-200 ease-out opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                            <div className="container">
                                <div className="py-6 flex gap-8">
                                    {link.submenus?.map((sub) => (
                                        <a key={sub.label} href={sub.href} className="text-sm font-medium text-sah-black hover:text-sah-red whitespace-nowrap font-inter">
                                            {sub.label}
                                        </a>
                                    ))}
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
    const [openMenu, setOpenMenu] = useState<string | null>(null);
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
                <div className="flex flex-1 h-full overflow-hidden px-[60px] relative">
                    <div className="absolute top-[100px] h-[1px] left-0 right-0 bg-sah-light-3" />
                    {/* Column 1 — 20% */}
                    <div className="w-[20%] h-full">
                        <div className="flex items-center h-[100px]">
                            <div className="flex items-center gap-2">
                                <img src="/logo-red-2.png" alt="SAH logo" className="w-8 h-8 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Column 2 — 60% (main content) */}
                    <div className="w-[60%] h-full flex flex flex-col overflow-y-auto border-x border-sah-light-3">
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

                        <div className="pt-5 flex-col justify-between">
                            <div className="flex flex-col px-[60px] ">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="border-b border-sah-light-3">
                                        {link.parent ? (
                                            <>
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === link.label ? null : link.label)}
                                                    className="w-full flex text-[40px] items-center justify-between py-4 text-sah-black font-inter font-normal capitalize cursor-pointer transition-colors duration-500 hover:text-sah-red"
                                                >
                                                    {link.label}
                                                    <DownArrow class_name={`!w-[14px] !h-[10px] transition-transform duration-300 !fill-sah-red ${openMenu === link.label ? "rotate-180" : ""}`} />
                                                </button>
                                                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMenu === link.label ? "max-h-[400px] pb-3" : "max-h-0"}`}>
                                                    {link.submenus?.map((sub) => (
                                                        <a key={sub.label} href={sub.href} className="py-2 pl-4 text-sah-black font-inter text-sm hover:text-sah-red">
                                                            {sub.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <a href={link.href} className="flex text-[40px] items-center py-4 text-sah-black font-inter font-normal capitalize">
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
                    <div className="w-[20%] h-full">
                        <div className="flex items-center justify-end h-[100px] pl-[20px]">
                            <a href="" className="py-2 pl-4 text-sah-black font-inter text-[20px] hover:text-sah-red transition-colors duration-500 uppercase">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
