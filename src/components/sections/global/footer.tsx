import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FbIcon, InstaIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";

function Links() {
    return (
        <div className="flex flex-col md:flex-row items-start xl:items-end gap-10 md:items-center">
            <Link href="/">
                <Image src="/logo-white.png" alt="SAH" width={80} height={80} />
            </Link>
            <nav className="flex flex-col md:flex-row items-start xl:items-center gap-4 xl:gap-8">
                {["Our Company", "Our Services", "Our Projects", "News", "Careers", "Contact"].map((item) => (
                    <Link key={item} href="#" className="text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap">
                        {item}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

function Newsletter() {
    return (
        <div className="flex  flex-col gap-2 md:flex-row items-start md:items-center md:gap-0">
            <Input
                type="email"
                placeholder="Enter your email"
                className=" w-[100%] sm:w-56 h-11 rounded-none bg-sah-white text-sah-black placeholder:text-sah-gray-2 border-0 focus-visible:ring-0 text-sm px-4"
            />
            <Button className="h-11 border-0 rounded-none bg-sah-black hover:bg-sah-dark-1 text-sah-white text-sm font-medium px-6 cursor-pointer">Subscribe</Button>
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
                    className="w-10 h-10 rounded-full border border-sah-overlay-white-30 flex items-center justify-center text-sah-white hover:text-sah-red hover:bg-sah-white hover:border-sah-white transition-colors"
                >
                    {icon}
                </Link>
            ))}
        </div>
    );
}

function Copyright() {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6">
            <p className="text-sm text-sah-white">© Copyright 2026 SAH</p>
            <div className="flex items-center gap-6">
                <Link href="#" className="text-sm text-sah-white">
                    Terms &amp; Agreements
                </Link>
                <Link href="#" className="text-sm text-sah-white">
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-sah-red text-sah-white section-padding">
            <div className="container mx-auto border-x border-sah-overlay-white-15">
                {/* Row 1: logo + nav | newsletter */}
                <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 py-10 px-[10px] border-b border-sah-overlay-white-15">
                    <Links />
                    <Newsletter />
                </div>

                {/* Row 2: tagline | social */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-[10px] py-8 border-b border-sah-overlay-white-15">
                    <p className="text-sm text-sah-white max-w-md leading-relaxed">
                        We are a forward-thinking consulting firm dedicated to helping businesses grow through strategic insights, innovative solutions, and measurable results.
                    </p>
                    <Social />
                </div>

                {/* Row 3: copyright */}
                <div className="px-[10px]">
                    <Copyright />
                </div>
            </div>
        </footer>
    );
}
