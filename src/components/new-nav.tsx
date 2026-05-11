"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useOutsideClick } from "@/hook/use-outside-click";
import { AngleArrow, DownArrow } from "./ui/svgs";

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
            { label: "About Us", href: "#" },
            { label: "Partner", href: "#" },
            { label: "Leadership", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        label: "Our Services",
        parent: true,
        submenus: [
            { label: "Services", href: "#" },
            { label: "Services Details", href: "#" },
        ],
    },
    {
        label: "Our Projects",
        parent: true,
        submenus: [
            { label: "Projects", href: "#" },
            { label: "Project Details", href: "#" },
        ],
    },
    { label: "News", parent: false },
    { label: "Careers", parent: false },
];

export function NavLinks() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const navRef = useOutsideClick<HTMLDivElement>(useCallback(() => setOpenMenu(null), []));

    return (
        <div ref={navRef} className="xl:flex items-center gap-4 2xl:gap-6 py-4 justify-start h-[90px] hidden">
            <a href="/" className="text-white font-geist text-[36px] font-bold mr-[80px] uppercase">
                SHA
            </a>
            {navLinks.map((link) => (
                <div key={link.label} className="relative">
                    <button
                        onClick={() => setOpenMenu(openMenu === link.label ? null : link.label)}
                        className="uppercase flex items-center gap-[6px] text-white text-[15px] text-[16px] font-semibold font-inter cursor-pointer"
                    >
                        {link.label}
                        {link.parent && <DownArrow class_name={`!w-[10.5px] !h-[6px] transition-transform duration-200 ${openMenu === link.label ? "rotate-180" : ""}`} />}
                    </button>

                    {link.parent && (
                        <div
                            className={`absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50 min-w-[160px] transition-all duration-200 ease-out ${openMenu === link.label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                        >
                            {link.submenus?.map((sub) => (
                                <a
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() => setOpenMenu(null)}
                                    className="block px-4 py-2 text-sm font-medium text-sah-black hover:bg-sah-light-4 whitespace-nowrap font-inter"
                                >
                                    {sub.label}
                                </a>
                            ))}
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
    const langRef = useOutsideClick<HTMLDivElement>(useCallback(() => setLangOpen(false), []));

    return (
        <>
            <div className="w-full flex items-center py-4 justify-end gap-[15px] md:gap-[30px] h-[90px] z-10 relative">
                {/* Logo */}
                <a href="/" className="text-white flex-1 text-[36px] font-bold uppercase xl:hidden">
                    SHA
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
                    href="/register"
                    className="sm:flex hidden items-center gap-[14px] bg-sah-black text-sah-white text-[15px] xl:text-[16px] font-inter font-medium px-[24px] py-[12px] rounded-[8px]"
                >
                    Become a Subcontractor
                    <AngleArrow class_name="!w-[10px] !h-[10px]" />
                </Link>

                {/* Hamburger */}
                <button onClick={() => setMenuOpen(true)} className="flex flex-col justify-center items-center gap-[5px] text-white cursor-pointer" aria-label="Open menu">
                    <span className="block w-6 h-[2px] bg-white" />
                    <span className="block w-6 h-[2px] bg-white" />
                    <span className="block w-6 h-[2px] bg-white" />
                </button>
            </div>

            {/* Backdrop */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 z-50 h-full w-[400px] bg-sah-white transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Close button */}
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="absolute top-6 right-6 text-white cursor-pointer">
                    <svg viewBox="0 0 24 24" className="!w-6 !h-6 fill-none stroke-black stroke-2">
                        <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>

                <div className="mt-[200px]">
                    <p className="text-sah-black text-center">No content for now</p>
                </div>
            </div>
        </>
    );
}
