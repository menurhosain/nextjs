"use client";

import { useState, useCallback } from "react";
import { useOutsideClick } from "@/hook/use-outside-click";
import { DownArrow } from "./ui/svgs";
import { type Menu } from "@/services/mega_menu.service";
import { type OffcanvasContent } from "@/services/offcanvas.service";
import { BASE_URL } from "@/lib/constant";

const languages = [
    { code: "en", label: "English", flag: "/uk-flag.svg" },
    { code: "ar-OM", label: "Arabic", flag: "/oman-flag.svg" },
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
            cta: { label: "Learn How", href: "/register-subcontractor" },
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
        </div>
    );
}

export function NavActions({
    locale,
    menus,
    offcanvas,
    light_logo_url,
    recaptcha_site_key,
    isLoggedIn = false,
}: {
    locale: string;
    menus: Menu[];
    offcanvas?: OffcanvasContent | null;
    light_logo_url?: string;
    recaptcha_site_key?: string;
    isLoggedIn?: boolean;
}) {
    const [selectedLang, setSelectedLang] = useState(() => {
        return languages.find((l) => l.code === locale) ?? languages[0];
    });
    const [langOpen, setLangOpen] = useState(false);
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
                        <div className="absolute top-full start-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang);
                                        setLangOpen(false);
                                        document.cookie = `locale=${lang.code};path=/;max-age=31536000`;
                                        window.location.reload();
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


            </div>
        </>
    );
}
