import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Links() {
    return (
        <div className="flex items-end gap-10">
            <Link href="/">
                <Image src="/logo-white.png" alt="SAH" width={80} height={80} />
            </Link>
            <nav className="flex items-center gap-8">
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
        <div className="flex items-center gap-0">
            <Input type="email" placeholder="Enter your email" className="w-56 h-11 rounded-none bg-sah-white text-sah-black placeholder:text-sah-gray-2 border-0 focus-visible:ring-0 text-sm px-4" />
            <Button className="h-11 rounded-none bg-sah-black hover:bg-sah-dark-1 text-sah-white text-sm font-medium px-6 cursor-pointer">Subscribe</Button>
        </div>
    );
}

function Social() {
    const socials = [
        { label: "f", href: "https://facebook.com" },
        { label: "in", href: "https://instagram.com" },
        { label: "li", href: "https://linkedin.com" },
        { label: "x", href: "https://x.com" },
    ];
    return (
        <div className="flex items-center gap-3">
            {socials.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-sah-overlay-white-30 flex items-center justify-center hover:border-sah-white transition-colors text-xs font-bold"
                >
                    {label}
                </Link>
            ))}
        </div>
    );
}

function Copyright() {
    return (
        <div className="flex items-center justify-between gap-4 py-6">
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
        <footer className="bg-sah-red text-sah-white">
            <div className="container mx-auto border-x border-sah-overlay-white-15">
                {/* Row 1: logo + nav | newsletter */}
                <div className="flex items-end justify-between gap-8 px-8 py-10 border-b border-sah-overlay-white-15">
                    <Links />
                    <Newsletter />
                </div>

                {/* Row 2: tagline | social */}
                <div className="flex items-center justify-between gap-8 px-8 py-8 border-b border-sah-overlay-white-15">
                    <p className="text-sm text-sah-white max-w-md leading-relaxed">
                        We are a forward-thinking consulting firm dedicated to helping businesses grow through strategic insights, innovative solutions, and measurable results.
                    </p>
                    <Social />
                </div>

                {/* Row 3: copyright */}
                <div className="px-8">
                    <Copyright />
                </div>
            </div>
        </footer>
    );
}
