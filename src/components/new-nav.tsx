"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOutsideClick } from "@/hook/use-outside-click";
import { AngleArrow, DownArrow, SearchIcon } from "./ui/svgs";
import NewsCard from "./ui/news-card";
import { type Menu } from "@/services/mega_menu.service";
import { type OffcanvasContent } from "@/services/offcanvas.service";
import { BASE_URL } from "@/lib/constant";
import { OffcanvasContactForm } from "./ui/contact-form";

const languages = [
    { code: "en", label: "English", flag: "/uk-flag.svg" },
    { code: "ar-om", label: "Arabic", flag: "/oman-flag.svg" },
];

type SubmenuGroup = { label: string; links: { label: string; href: string }[] };

const STATIC_NAV_LINKS = [
    {
        label: "Our Company",
        parent: true,
        link: "",
        id: "",
        card: {
            title: "About Us",
            description: "SAH is a Oman-based, international construction services company and is a leading builder in diverse market segments.",
            cta: { label: "GET TO KNOW US", href: "/about-us" },
        },
        promo: {
            title: "Become a Subcontractor",
            excerpt: "With expertise spanning planning, execution, and project delivery, we provide market needs.",
            image: "/menu/1.jpg",
            cta: { label: "Learn How", href: "/become-a-subcontractor" },
        },
        submenus: [
            {
                label: "Who We Are",
                links: [
                    { label: "About Us", href: "/about-us" },
                    { label: "Our Leadership", href: "/leadership" },
                    { label: "Market Sectors", href: "/market-sectors" },
                ],
            },
            {
                label: "Our Culture",
                links: [
                    { label: "Our Values", href: "/our-values" },
                    { label: "Health, Safety & Environment (HSE)", href: "/hse" },
                    { label: "Innovation & Technology", href: "/innovation-technology" },
                    { label: "Ethics & Compliance", href: "/ethics-compliance" },
                    { label: "Community Engagement", href: "/community-engagement" },
                    { label: "Training", href: "/training" },
                    { label: "Sustainability", href: "/sustainability" },
                ],
            },
            {
                label: "Resources",
                links: [{ label: "General Inquiries", href: "/contact" }],
            },
        ] as SubmenuGroup[],
        latest_news: [] as { title: string; href: string; image: string }[],
    },
    {
        label: "Our Services",
        parent: true,
        link: "",
        id: "",
        card: {
            title: "Our Services",
            description: "We deliver end-to-end construction and engineering solutions across a wide range of industries and sectors.",
            cta: { label: "EXPLORE SERVICES", href: "/services" },
        },
        promo: {
            title: "Our Market Value",
            excerpt: "We provide comprehensive construction and engineering solutions for your need.",
            image: "/menu/2.jpg",
            cta: { href: "/services-details", label: "Join us" },
        },
        submenus: [
            {
                label: "Approach",
                links: [
                    { label: "Pre-construction", href: "/services/pre-construction" },
                    { label: "Construction Management", href: "/services/construction-management" },
                    { label: "Project Management", href: "/services/project-management" },
                ],
            },
            {
                label: "Areas of Expertise",
                links: [
                    { label: "Civil Construction", href: "/services/civil-construction" },
                    { label: "MEP Engineering", href: "/services/mep-engineering" },
                    { label: "Design & Build", href: "/services/design-build" },
                    { label: "HVAC & FCU Systems", href: "/services/hvac-fcu-systems" },
                    { label: "BIM & Virtual Construction", href: "/services/bim-virtual-construction" },
                    { label: "Facility Management", href: "/services/facility-management" },
                ],
            },
        ] as SubmenuGroup[],
        latest_news: [] as { title: string; href: string; image: string }[],
    },
    {
        label: "Careers",
        parent: true,
        link: "/careers",
        id: "",
        card: {
            title: "Careers With Us",
            description: "From iconic stadiums to large-scale infrastructure, explore the projects that define our legacy.",
            cta: { label: "EXPLORE NEW OPPORTUNITY", href: "/careers" },
        },
        promo: {
            title: "Your Career Starts Here",
            excerpt: "SAH is a Oman-based, international construction, Oman-based international construction ",
            image: "/team/2.jpg",
            cta: { label: "Join with us", href: "/careers" },
        },
        submenus: [
            {
                label: "Join Us",
                links: [
                    { label: "Life at SAH", href: "/careers/life-at-sah" },
                    { label: "Careers", href: "/careers" },
                ],
            },
        ] as SubmenuGroup[],
        latest_news: [] as { title: string; href: string; image: string }[],
    },
    {
        label: "News",
        parent: true,
        link: "/news",
        id: "news",
        card: {
            title: "Our Latest News",
            description: "From iconic stadiums to large-scale infrastructure, explore the projects that define our legacy.",
            cta: { href: "/news", label: "Explore our ideas" },
        },
        promo: { title: "", excerpt: "", image: "", cta: { label: "", href: "" } },
        submenus: [] as SubmenuGroup[],
        latest_news: [
            { title: "Cost Effective Solutions for your dream", href: "#", image: "/menu/2.jpg" },
            { title: "Solutions for Building Projects", href: "#", image: "/menu/1.jpg" },
            { title: "Medical Pavilion at Institute Square", href: "#", image: "/menu/3.jpg" },
        ],
    },
    {
        label: "Projects",
        parent: true,
        link: "",
        id: "",
        card: {
            title: "Our Projects",
            description: "From iconic stadiums to large-scale infrastructure, explore the projects that define our legacy.",
            cta: { label: "VIEW ALL PROJECTS", href: "/projects" },
        },
        promo: {
            title: "Police College Package C SQAPS Nizwa",
            excerpt: "SAH is a Oman-based, international construction, Oman-based international construction ",
            image: "/project-1-small.jpg",
            cta: { label: "View Project", href: "/projects" },
        },
        submenus: [
            {
                label: "Flagship Projects",
                links: [
                    { label: "Completed Projects", href: "/projects/completed" },
                    { label: "On-Going Projects", href: "/projects/ongoing" },
                ],
            },
            {
                label: "Categories",
                links: [
                    { label: "Education", href: "/projects/education" },
                    { label: "MOD", href: "/projects/mod" },
                    { label: "MOI", href: "/projects/moi" },
                    { label: "MOC", href: "/projects/moc" },
                ],
            },
        ] as SubmenuGroup[],
        latest_news: [] as { title: string; href: string; image: string }[],
    },
];

function transformMenus(menus: Menu[]) {
    if (menus.length === 0) return STATIC_NAV_LINKS;
    return menus.map((menu) => ({
        label: menu.nav_label,
        parent: menu.is_parent,
        link: menu.root_link,
        id: menu.featured_news?.length > 0 ? "news" : "",
        card: {
            title: menu.mega_menu_left_info?.label ?? "",
            description: menu.mega_menu_left_info?.excerpt ?? "",
            cta: {
                label: menu.mega_menu_left_info?.action_link_label ?? "",
                href: menu.mega_menu_left_info?.action_link_href ?? "",
            },
        },
        promo: {
            title: menu.mega_menu_right_info?.label ?? "",
            excerpt: menu.mega_menu_right_info?.excerpt ?? "",
            image: menu.mega_menu_right_info?.bg_image ? `${BASE_URL}${menu.mega_menu_right_info.bg_image.url}` : "",
            cta: {
                label: menu.mega_menu_right_info?.action_link_label ?? "",
                href: menu.mega_menu_right_info?.action_link_href ?? "",
            },
        },
        submenus: menu.mega_menu_link_groups?.length
            ? menu.mega_menu_link_groups.map((g) => ({
                  label: g.group_label,
                  links: (g.links ?? []).map((l) => ({ label: l.button_label, href: l.button_link })),
              }))
            : ([] as SubmenuGroup[]),
        latest_news: (menu.featured_news ?? []).map((n) => ({
            title: n.title,
            href: n.link_href,
            image: n.thumbnail ? `${BASE_URL}${n.thumbnail.url}` : "",
        })),
    }));
}

export function NavLinks({ menus }: { menus: Menu[] }) {
    const navLinks = transformMenus(menus);
    return (
        <div className="xl:flex items-center gap-4 2xl:gap-6 py-4 justify-start h-[90px] hidden">
            <a href="/" className="text-white font-geist text-[36px] font-bold mr-[20px] 2xl:mr-[80px] uppercase">
                SAH
            </a>
            {navLinks.map((link) => (
                <div key={link.label} className="group">
                    {link.parent ? (
                        <a href={link.link} className="uppercase h-[90px] flex items-center gap-[6px] text-white text-[14px] 2xl:text-[16px] font-semibold font-inter cursor-pointer">
                            {link.label}
                            <DownArrow class_name="!w-[10.5px] !h-[6px] transition-transform duration-200 group-hover:rotate-180" />
                        </a>
                    ) : (
                        <a href={link.link} className="uppercase flex items-center gap-[6px] text-white text-[15px] text-[16px] font-semibold font-inter">
                            {link.label}
                        </a>
                    )}

                    {link.parent && (
                        <div className="absolute top-full left-0 h-[350px] w-screen bg-white shadow-lg z-50 transition-all duration-200 ease-out opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                            <div className="container h-full relative">
                                {/* Red bg bleeds from screen left edge to end of 30% column */}
                                <div className="absolute inset-y-0 bg-sah-red" style={{ left: "calc((100% - 100vw) / 2)", width: "calc(30% + (100vw - 100%) / 2)" }} />

                                {link.id === "news" ? (
                                    /* 2-column layout for news & career */
                                    <div className="flex h-full relative">
                                        <div className="w-[30%] flex flex-col justify-start gap-[20px] px-10 py-6 z-10 max-[1536px]:pl-0">
                                            <div className="flex flex-col gap-4">
                                                <h3 className="text-sah-white font-geist text-[22px] font-semibold leading-snug">{link.card?.title}</h3>
                                                <p className="text-sah-white font-inter text-[16px] leading-[1.6]">{link.card?.description}</p>
                                            </div>
                                            <a href={link.card?.cta.href} className="flex items-center gap-3 text-white font-inter text-[13px] font-semibold tracking-widest uppercase">
                                                {link.card?.cta.label}
                                                <AngleArrow class_name="!w-[14px] !h-[14px]" />
                                            </a>
                                        </div>

                                        <div className={`w-[70%] grid gap-4 py-[20px] grid-cols-3`}>
                                            {link.id === "news" &&
                                                link.latest_news?.map((item, i) => (
                                                    <NewsCard
                                                        key={i}
                                                        href={item.href}
                                                        imageParam={{ src: item.image, className: "w-full" }}
                                                        titleParam={{ title: item.title, className: "!text-[22px] leading-[28px] md:mb-1 pr-0 font-medium !pr-0" }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* 3-column layout for standard menus */
                                    <>
                                        {/* Image bg bleeds from right column to right screen edge */}
                                        <div
                                            className="absolute inset-y-0 bg-cover bg-top"
                                            style={{ right: "calc((100% - 100vw) / 2)", width: "calc(30% + (100vw - 100%) / 2)", backgroundImage: `url(${link.promo?.image})` }}
                                        >
                                            <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-t from-black to-transparent" />
                                        </div>

                                        <div className="flex h-full relative">
                                            <div className="w-[30%] flex flex-col justify-start gap-[20px] px-10 py-6 z-10 max-[1536px]:pl-0">
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-sah-white font-geist text-[22px] font-semibold leading-snug">{link.card?.title}</h3>
                                                    <p className="text-sah-white font-inter text-[16px] leading-[1.6]">{link.card?.description}</p>
                                                </div>
                                                <a href={link.card?.cta.href} className="flex items-center gap-3 text-white font-inter text-[13px] font-semibold tracking-widest uppercase">
                                                    {link.card?.cta.label}
                                                    <AngleArrow class_name="!w-[14px] !h-[14px]" />
                                                </a>
                                            </div>

                                            <div className="w-[40%] flex justify-start gap-[30px] py-[30px] px-[15px] max-[1536px]:pl-5">
                                                {link.submenus?.map((group) => (
                                                    <div key={group.label} className="flex flex-col gap-3">
                                                        {group.label && <p className="font-inter text-[16px] font-semibold uppercase text-sah-black">{group.label}</p>}
                                                        {group.links.map((sub) => (
                                                            <a key={sub.label} href={sub.href} className="text-[14px] font-medium text-sah-black hover:text-sah-red whitespace-nowrap font-inter">
                                                                {sub.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="w-[30%] z-10 px-10 pb-6 flex flex-col justify-end">
                                                <a href={link.promo?.cta.href}>
                                                    <p className="font-inter text-[26px] font-semibold mb-[20px] text-white">{link.promo?.title}</p>
                                                </a>
                                                <p className="font-inter mb-[20px] text-[14px] font-normal text-white">{link.promo?.excerpt}</p>
                                                <a href={link.promo?.cta.href} className="flex items-center gap-3 text-white font-inter text-[13px] font-semibold tracking-widest uppercase">
                                                    {link.promo?.cta.label}
                                                    <AngleArrow class_name="!w-[14px] !h-[14px]" />
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const DEFAULT_SOCIAL_LINKS = [
    { button_label: "Facebook", button_link: "#" },
    { button_label: "Instagram", button_link: "#" },
    { button_label: "LinkedIn", button_link: "#" },
    { button_label: "YouTube", button_link: "#" },
];

export function NavActions({
    locale,
    menus,
    offcanvas,
    light_logo_url,
    recaptcha_site_key,
}: {
    locale: string;
    menus: Menu[];
    offcanvas?: OffcanvasContent | null;
    light_logo_url?: string;
    recaptcha_site_key?: string;
}) {
    const navLinks = transformMenus(menus);
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState(() => {
        return languages.find((l) => l.code === locale) ?? languages[0];
    });
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
                    <button onClick={() => setLangOpen(!langOpen)} className="flex max-[640px]:justify-end items-center w-[120px] gap-[8px] text-sah-white cursor-pointer">
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
                                        document.cookie = `locale=${lang.code};path=/;max-age=31536000`;
                                        router.refresh();
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
                <a
                    href={offcanvas?.menu_button?.button_link || "/become-a-subcontractor"}
                    className="sm:flex hidden items-center gap-[14px] bg-sah-black text-sah-white text-[15px] xl:text-[16px] font-inter font-medium px-[24px] py-[12px] rounded-[8px]"
                >
                    {offcanvas?.menu_button?.button_label || "Become a Subcontractor"}
                    <AngleArrow class_name="!w-[10px] !h-[10px]" />
                </a>

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
                    <div className="absolute top-[100px] right-0 h-[1px] bg-sah-light-3 z-10 w-[80%]  max-[1024]:w-[87.5%] max-[640px]:w-[81%]" />
                    <div className="absolute top-[100px] left-0 h-[1px] bg-sah-white/15 z-10 w-[20%] max-[640px]:w-[22%] max-[640px]:min-w-[70px]" />
                    {/* Column 1 — 20% */}
                    <div className="w-[20%] max-[1024]:w-[12.5%] max-[640px]:w-[17%] max-[640px]:min-w-[70px] h-full bg-sah-red relative overflow-hidden">
                        {/* Scrolling text — spans full column height including behind logo */}
                        <div className="absolute inset-0 overflow-hidden flex justify-center">
                            <div className="nav-scroll-up flex flex-col items-center">
                                {[...Array(2)].map((_, copy) =>
                                    [...Array(8)].map((_, i) => (
                                        <span
                                            key={`${copy}-${i}`}
                                            className="text-white font-bold select-none px-10 text-[250px] max-[1024px]:text-[90px] max-[768px]:text-[70px]"
                                            style={{ writingMode: "vertical-rl", opacity: 0.2 }}
                                        >
                                            {offcanvas?.vertical_text || "SAH"}
                                        </span>
                                    )),
                                )}
                            </div>
                        </div>

                        {/* Logo — sits on top of scrolling text */}
                        <div className="relative z-10 flex items-center h-[100px] pl-[60px] max-[1280]:pl-[10px] max-[640px]:pl-0 max-[640px]:justify-center bg-sah-red">
                            <a href="/">
                                <img src={light_logo_url || "/logo-white.png"} alt="SAH logo" className="size-[70px] object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 — 60% (main content) */}
                    <div className="w-[50%] 2xl:w-[50%]  max-[1024]:w-[88%] max-[640px]:w-[81%] h-full flex flex flex-col border-x border-sah-light-3">
                        <div className="flex items-center justify-between h-[100px]">
                            {/* Search bar */}
                            <div className="flex items-center gap-3 px-2 sm:px-6 py-3 group">
                                <SearchIcon class_name="!size-[24px] shrink-0 text-sah-dark !fill-sah-black group-hover:rotate-90 transition-rotate duration-500" />
                                <input
                                    type="text"
                                    placeholder={offcanvas?.search_placeholder || "Search your query"}
                                    className="flex-1 max-[640px]:w-[8%] min-w-[8%] sm:min-w-0 outline-none font-inter text-[16px] text-sah-dark placeholder:text-sah-dark/50"
                                />
                            </div>

                            {/* Close button */}
                            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="cursor-pointer h-full w-[100px] flex items-center justify-center border-l border-sah-light-3">
                                <svg viewBox="0 0 24 24" className="!w-6 !h-6 fill-none stroke-sah-red stroke-2">
                                    <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="pt-5 pb-[90px] flex-col justify-between overflow-y-scroll no-scrollbar flex-1" data-lenis-prevent>
                            <div className="flex flex-col px-[30px] 2xl:px-[60px] max-[640px]:px-[15px]">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="border-b border-sah-light-3">
                                        {link.parent && link.id !== "news" ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setOpenMenus((prev) => {
                                                            const next = new Set(prev);
                                                            next.has(link.label) ? next.delete(link.label) : next.add(link.label);
                                                            return next;
                                                        })
                                                    }
                                                    className="w-full flex text-[40px] max-[1280px]:text-[30px] max-[768px]:text-[24px] max-[640px]:text-[18px] items-center justify-between py-4 text-sah-black font-inter font-normal capitalize cursor-pointer transition-colors duration-500 hover:text-sah-red"
                                                >
                                                    {link.label}
                                                    <DownArrow class_name={`!w-[14px] !h-[10px] transition-transform duration-300 !fill-sah-black ${openMenus.has(link.label) ? "rotate-180" : ""}`} />
                                                </button>
                                                <div className={`flex gap-8 overflow-hidden transition-all duration-300 ${openMenus.has(link.label) ? "max-h-[400px] pb-3" : "max-h-0"}`}>
                                                    {link.submenus?.map((group) => (
                                                        <div key={group.label} className="flex flex-col gap-1">
                                                            {group.label && <p className="py-1 pl-4 font-inter text-[16px] font-semibold uppercase text-sah-black">{group.label}</p>}
                                                            {group.links.map((sub) => (
                                                                <a key={sub.label} href={sub.href} className="py-2 pl-4 text-sah-black font-inter text-[14px] hover:text-sah-red">
                                                                    {sub.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <a
                                                href={link.link}
                                                className="flex text-[40px] max-[1280px]:text-[30px] max-[768px]:text-[24px] max-[640px]:text-[18px] items-center py-4 text-sah-black font-inter font-normal capitalize transition-colors duration-500 hover:text-sah-red"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </div>
                                ))}

                                <div className="py-8">
                                    <Link
                                        href={offcanvas?.menu_button?.button_link || "/become-a-subcontractor"}
                                        className="flex items-center justify-center gap-[14px] bg-sah-black text-sah-white font-inter font-medium px-[24px] py-[14px] rounded-[8px] max-[640px]:text-[14px] max-[380px]:text-[12px] max-[640px]:px-[10px]"
                                    >
                                        {offcanvas?.menu_button?.button_label || "Become a Subcontractor"}
                                        <AngleArrow class_name="!w-[10px] !h-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 — 20% */}
                    <div className="w-[30%]  2xl:w-[30%] h-full flex flex-col overflow-hidden overflow-y-scroll no-scrollbar flex-1 max-[1024]:hidden" data-lenis-prevent>
                        {/* Header row — matches other columns */}
                        <div className="flex items-center justify-end h-[100px] pr-[60px] shrink-0">
                            <a href={offcanvas?.contact_us_link || "/contact"} className="py-2 pl-4 text-sah-black font-inter text-[20px] hover:text-sah-red transition-colors duration-500 uppercase">
                                {offcanvas?.contact_us_label || "Contact Us"}
                            </a>
                        </div>

                        {/* Featured project */}

                        <OffcanvasContactForm
                            title={offcanvas?.form_title || "Start the Conversation"}
                            placeholderFirstName={offcanvas?.placeholder_first_name || "First Name*"}
                            placeholderLastName={offcanvas?.placeholder_last_name || "Last Name*"}
                            placeholderEmail={offcanvas?.placeholder_email || "Email Address"}
                            placeholderPhone={offcanvas?.placeholder_phone || "Phone"}
                            placeholderMessage={offcanvas?.placeholder_message || "Write Message*"}
                            submitLabel={offcanvas?.form_submit_label || "Message Now"}
                            recaptchaSiteKey={recaptcha_site_key ?? ""}
                        />
                    </div>
                </div>

                {/* Footer — absolute bottom, same 3-col layout */}
                <div className="absolute bottom-0 left-0 right-0 flex h-[80px] max-[640px]:h-[60px]">
                    <div className="w-[20%] max-[1024]:w-[12.5%] flex items-center bg-sah-red pl-[72px] max-[1280px]:pl-[20px]  border-t border-sah-white/15 max-[640px]:hidden">
                        <a
                            href={`mailto:${offcanvas?.email || "info@sah.om"}`}
                            className="font-inter text-[16px] font-medium text-sah-white hover:text-sah-white/60 transition-colors duration-300 max-[1024]:hidden"
                        >
                            {offcanvas?.email || "info@sah.om"}
                        </a>
                    </div>
                    <div className="w-[50%] 2xl:w-[50%] max-[1024]:w-[58%] bg-sah-white flex items-center gap-8 px-[60px] max-[1024]:px-[20px] border-t border-x border-sah-light-3 max-[768]:hidden">
                        {(offcanvas?.social_links?.length ? offcanvas.social_links : DEFAULT_SOCIAL_LINKS).map((link) => (
                            <a key={link.button_label} href={link.button_link} className="font-inter text-[16px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                                {link.button_label}
                            </a>
                        ))}
                    </div>
                    <div className="w-[30%] 2xl:w-[30%] max-[768]:w-[87.5%] max-[640px]:w-full bg-sah-white flex items-center justify-start px-[60px] max-[1024]:px-[20px] max-[1024]:justify-center border-t border-sah-light-3">
                        <a href={offcanvas?.view_all_projects_link || "/projects"} className="font-inter text-[16px] font-medium text-sah-black hover:text-sah-red transition-colors duration-300">
                            {offcanvas?.view_all_projects_label || "View all projects"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
