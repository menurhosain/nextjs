"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useOutsideClick } from "@/hook/use-outside-click";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

const navLinks = ["Our Company", "Our Services", "Our Projects", "News", "Careers"];

export function NavLinks() {
  return (
    <div className="flex items-center gap-6 px-4 py-4 justify-start h-[90px] border-b border-white/20 pl-[130px]">
      <div className="text-white text-[30px] mr-[80px] uppercase">SHA</div>
      {navLinks.map((link) => (
        <a key={link} href="#" className="uppercase text-white text-base font-medium">
          {link}
        </a>
      ))}
    </div>
  );
}

export function NavActions() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useOutsideClick<HTMLDivElement>(useCallback(() => setLangOpen(false), []));

  return (
    <div className="w-full bg-sah-red flex items-center px-4 py-4 justify-end gap-[30px] h-[90px] pr-[130px]">
      {/* Language selector */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-start w-[120px] gap-2 text-white text-sm font-medium cursor-pointer"
        >
          <span>{selectedLang.flag}</span>
          <span>{selectedLang.label}</span>
          <span className="text-xs">&#8964;</span>
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
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CTA button */}
      <Link
        href="/register"
        className="flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-medium px-[24px] py-[12px] rounded-full"
      >
        Become a Subcontractor
        <span className="text-base">&#8599;</span>
      </Link>

      {/* Hamburger */}
      <button className="flex flex-col justify-center items-center gap-[5px] text-white">
        <span className="block w-6 h-[2px] bg-white"></span>
        <span className="block w-6 h-[2px] bg-white"></span>
        <span className="block w-6 h-[2px] bg-white"></span>
      </button>
    </div>
  );
}
