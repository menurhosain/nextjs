import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FbIcon, InstaIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";

const links = [
    { label: "Our Company", href: "/about-us" },
    { label: "Our Services", href: "/services" },
    { label: "Our Projects", href: "/projects" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

function Links() {
    return (
        <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end gap-7 2xl:gap-15 md:items-center  max-[640px]:w-full">
            <Link href="/">
                <Image src="/logo-white.png" alt="SAH" width={80} height={80} />
            </Link>
            <nav className="flex sm:flex-row flex-wrap max-[768px]:justify-center xl:items-center gap-2.5 sm:gap-4 xl:gap-8">
                {links.map(({ label, href }) => (
                    <a key={label} href={href} className="text-[16px] font-semibold hover:opacity-80 transition-opacity whitespace-nowrap">
                        {label}
                    </a>
                ))}
            </nav>
        </div>
    );
}

function Newsletter() {
    return (
        <div className="flex  flex-col gap-3 sm:gap-2 md:flex-row items-center md:items-center max-[640px]:w-full">
            <Input
                type="email"
                placeholder="Enter your email"
                className=" w-[100%] sm:w-56 h-11 rounded-none bg-sah-white text-sah-black placeholder:text-sah-gray-2 border-0 focus-visible:ring-0 text-sm px-4"
            />
            <Button className="h-11 border-0 rounded-none bg-sah-black hover:bg-sah-dark-1 text-sah-white text-sm font-medium px-6 cursor-pointer  max-[640px]:!w-[100%]">Subscribe</Button>
        </div>
    );
}

function Social() {
    const socials = [
        { icon: <FbIcon />, href: "https://facebook.com", label: "Facebook" },
        { icon: <InstaIcon />, href: "https://instagram.com", label: "Instagram" },
        { icon: <LinkedinIcon />, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: <XIcon />, href: "https://x.com", label: "X" },
    ];
    return (
        <div className="flex items-center gap-3">
            {socials.map(({ icon, href, label }) => (
                <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-sah-overlay-white-30 flex items-center justify-center text-sah-white hover:text-sah-red hover:bg-sah-white hover:border-sah-white transition-colors sm:text-[20px] text-[16px]"
                >
                    {icon}
                </Link>
            ))}
        </div>
    );
}

function Copyright() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 py-6">
            <p className="text-[16px] text-sah-white">© Copyright 2026 SAH</p>
            <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
                <Link href="#" className="text-[16px] text-sah-white">
                    Terms &amp; Agreements
                </Link>
                <Link href="#" className="text-[16px] text-sah-white">
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-sah-red text-sah-white section-padding">
            <div className="container mx-auto !px-0 border-x border-sah-overlay-white-15">
                {/* Row 1: logo + nav | newsletter */}
                <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end xl:justify-between gap-6 py-10 px-[15px] sm:px-[40px] border-b border-sah-overlay-white-15">
                    <Links />
                    <Newsletter />
                </div>

                {/* Row 2: tagline | social */}
                <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-4 px-[15px] sm:px-[40px] py-8 border-b border-sah-overlay-white-15">
                    <p className="text-[16px] text-sah-white max-w-[670px] leading-relaxed text-center xl:text-left">
                        We are a forward-thinking consulting firm dedicated to helping businesses grow through strategic insights, innovative solutions, and measurable results.
                    </p>
                    <Social />
                </div>

                {/* Row 3: copyright */}
                <div className="px-[15px] sm:px-[40px]">
                    <Copyright />
                </div>
            </div>
        </footer>
    );
}
