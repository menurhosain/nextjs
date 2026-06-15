"use client";

import { useState, useCallback, useEffect } from "react";
import { useOutsideClick } from "@/hook/use-outside-click";
import { DownArrow } from "./ui/svgs";
import ProfileMenu from "@/components/profile-menu";
import type { Menu } from "@/services/mega_menu.service";

const languages = [
    { code: "en", label: "English", flag: "/uk-flag.svg" },
    { code: "ar-OM", label: "Arabic", flag: "/oman-flag.svg" },
];

export function NavLinks() {
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
    isLoggedIn = false,
    displayName = null,
    pictureUrl = null,
    menu,
}: {
    locale: string;
    isLoggedIn?: boolean;
    displayName?: string | null;
    pictureUrl?: string | null;
    menu: Menu | null;
}) {
    const [selectedLang, setSelectedLang] = useState(() => {
        return languages.find((l) => l.code === locale) ?? languages[0];
    });
    const [langOpen, setLangOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const langRef = useOutsideClick<HTMLDivElement>(useCallback(() => setLangOpen(false), []));

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const loginHref = menu ? menu.login_link : "/login";
    const signupHref = menu ? menu.signup_link : "/register-applicant";
    const loginLabel = menu ? menu.login_label : "Login";
    const signupLabel = menu ? menu.signup_label : "Signup";

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

                {/* Auth */}
                {isLoggedIn ? (
                    <ProfileMenu displayName={displayName} pictureUrl={pictureUrl} />
                ) : (
                    <>
                        {/* Desktop login/signup — hidden below 500px */}
                        <a
                            href={loginHref}
                            className="max-[499px]:hidden flex items-center gap-[7px] font-inter text-[16px] font-semibold text-sah-white hover:text-sah-white/70 transition-colors duration-200"
                        >
                            <svg viewBox="0 0 640 640" className="w-[18px] h-[18px] fill-current">
                                <path d="M256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72zM226.3 368L285.7 368C289.6 368 293.6 368.1 297.5 368.4C281.3 396.6 272 429.2 272 464C272 505.8 285.4 544.5 308 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368zM320 464C320 384.5 384.5 320 464 320C543.5 320 608 384.5 608 464C608 543.5 543.5 608 464 608C384.5 608 320 543.5 320 464zM464 384C455.2 384 448 391.2 448 400L448 464C448 472.8 455.2 480 464 480L512 480C520.8 480 528 472.8 528 464C528 455.2 520.8 448 512 448L480 448L480 400C480 391.2 472.8 384 464 384z" />
                            </svg>
                            {loginLabel}
                        </a>
                        <a
                            href={signupHref}
                            className="max-[499px]:hidden flex items-center gap-[7px] font-inter text-[16px] font-semibold text-sah-white hover:text-sah-white/70 transition-colors duration-200"
                        >
                            <svg viewBox="0 0 640 640" className="w-[18px] h-[18px] fill-current">
                                <path d="M285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368L285.7 368zM528 144C541.3 144 552 154.7 552 168L552 216L600 216C613.3 216 624 226.7 624 240C624 253.3 613.3 264 600 264L552 264L552 312C552 325.3 541.3 336 528 336C514.7 336 504 325.3 504 312L504 264L456 264C442.7 264 432 253.3 432 240C432 226.7 442.7 216 456 216L504 216L504 168C504 154.7 514.7 144 528 144zM256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312z" />
                            </svg>
                            {signupLabel}
                        </a>

                        {/* Hamburger — visible only below 500px */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            className="min-[500px]:hidden flex flex-col justify-center items-center gap-[5px] w-[36px] h-[36px] cursor-pointer"
                            aria-label="Open menu"
                        >
                            <span className="block w-[22px] h-[2px] bg-white rounded" />
                            <span className="block w-[22px] h-[2px] bg-white rounded" />
                            <span className="block w-[22px] h-[2px] bg-white rounded" />
                        </button>
                    </>
                )}
            </div>

            {/* Offcanvas overlay — mobile only, not logged in */}
            {!isLoggedIn && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setMenuOpen(false)}
                        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 min-[500px]:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    />

                    {/* Drawer */}
                    <div
                        className={`fixed top-0 right-0 h-full w-[260px] bg-[#1a1a2e] z-50 flex flex-col px-6 py-8 gap-6 transition-transform duration-300 min-[500px]:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                            className="self-end text-white hover:text-white/70 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                            </svg>
                        </button>

                        {/* Nav links */}
                        <a
                            href={loginHref}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 font-inter text-[16px] font-semibold text-sah-white hover:text-sah-white/70 transition-colors duration-200"
                        >
                            <svg viewBox="0 0 640 640" className="w-[18px] h-[18px] fill-current shrink-0">
                                <path d="M256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72zM226.3 368L285.7 368C289.6 368 293.6 368.1 297.5 368.4C281.3 396.6 272 429.2 272 464C272 505.8 285.4 544.5 308 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368zM320 464C320 384.5 384.5 320 464 320C543.5 320 608 384.5 608 464C608 543.5 543.5 608 464 608C384.5 608 320 543.5 320 464zM464 384C455.2 384 448 391.2 448 400L448 464C448 472.8 455.2 480 464 480L512 480C520.8 480 528 472.8 528 464C528 455.2 520.8 448 512 448L480 448L480 400C480 391.2 472.8 384 464 384z" />
                            </svg>
                            {loginLabel}
                        </a>
                        <a
                            href={signupHref}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 font-inter text-[16px] font-semibold text-sah-white hover:text-sah-white/70 transition-colors duration-200"
                        >
                            <svg viewBox="0 0 640 640" className="w-[18px] h-[18px] fill-current shrink-0">
                                <path d="M285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368L285.7 368zM528 144C541.3 144 552 154.7 552 168L552 216L600 216C613.3 216 624 226.7 624 240C624 253.3 613.3 264 600 264L552 264L552 312C552 325.3 541.3 336 528 336C514.7 336 504 325.3 504 312L504 264L456 264C442.7 264 432 253.3 432 240C432 226.7 442.7 216 456 216L504 216L504 168C504 154.7 514.7 144 528 144zM256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312z" />
                            </svg>
                            {signupLabel}
                        </a>
                    </div>
                </>
            )}
        </>
    );
}
