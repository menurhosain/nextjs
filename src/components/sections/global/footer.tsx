import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col gap-2 md:flex-row items-start md:items-center gap-0">
            <Input type="email" placeholder="Enter your email" className="w-56 h-11 rounded-none bg-sah-white text-sah-black placeholder:text-sah-gray-2 border-0 focus-visible:ring-0 text-sm px-4" />
            <Button className="h-11 rounded-none bg-sah-black hover:bg-sah-dark-1 text-sah-white text-sm font-medium px-6 cursor-pointer">Subscribe</Button>
        </div>
    );
}

function FbIcon() {
    return (
        <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.17464 9.1875L8.62827 6.23155L5.79195 6.23155V4.31334C5.79195 3.50465 6.18816 2.71637 7.45846 2.71637H8.7479V0.199701C8.7479 0.199701 7.57777 0 6.459 0C4.12321 0 2.59643 1.41577 2.59643 3.9787L2.59643 6.23155H0L0 9.1875H2.59643L2.59643 16.3333H5.79195L5.79195 9.1875H8.17464Z" fill="currentColor" />
        </svg>
    );
}

function InstaIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.2887 4.80204C16.2504 3.93417 16.1101 3.33756 15.909 2.82054C15.7016 2.27177 15.3825 1.78046 14.9645 1.37201C14.5561 0.957218 14.0615 0.634891 13.5191 0.430748C12.9991 0.229732 12.4056 0.0893404 11.5377 0.0511155C10.6634 0.00957218 10.3858 0 8.16826 0C5.95071 0 5.67315 0.00957218 4.80204 0.0478609C3.9342 0.0861496 3.33756 0.226605 2.8207 0.427494C2.27177 0.634891 1.78046 0.953964 1.37201 1.37201C0.957218 1.78043 0.63505 2.27499 0.430748 2.81741C0.229732 3.33756 0.0893723 3.93098 0.0511155 4.79879C0.00960409 5.67315 0 5.95071 0 8.16826C0 10.3858 0.00960409 10.6634 0.0478609 11.5345C0.0861496 12.4024 0.226605 12.999 0.427653 13.516C0.63505 14.0648 0.957218 14.5561 1.37201 14.9645C1.78046 15.3793 2.27502 15.7016 2.81744 15.9058C3.33753 16.1068 3.93094 16.2472 4.79895 16.2854C5.66989 16.3238 5.94761 16.3333 8.16517 16.3333C10.3827 16.3333 10.6603 16.3238 11.5314 16.2854C12.3992 16.2472 12.9959 16.1068 13.5127 15.9058C14.0556 15.6959 14.5486 15.3749 14.9602 14.9634C15.3717 14.5518 15.6928 14.0588 15.9027 13.516C16.1036 12.9959 16.2441 12.4023 16.2823 11.5345C16.3206 10.6634 16.3302 10.3858 16.3302 8.16826C16.3302 5.95071 16.3269 5.67311 16.2887 4.80204ZM14.8178 11.4707C14.7827 12.2683 14.6487 12.6991 14.537 12.9863C14.2626 13.6978 13.6978 14.2626 12.9863 14.537C12.6991 14.6487 12.2653 14.7827 11.4707 14.8177C10.6092 14.8561 10.3508 14.8655 8.17152 14.8655C5.99222 14.8655 5.73061 14.8561 4.87221 14.8177C4.07453 14.7827 3.64378 14.6487 3.35661 14.537C3.00254 14.4061 2.68024 14.1987 2.4186 13.9275C2.14739 13.6627 1.93999 13.3436 1.80911 12.9895C1.69744 12.7023 1.56346 12.2683 1.52845 11.4739C1.49004 10.6124 1.48059 10.3539 1.48059 8.17461C1.48059 5.99531 1.49004 5.73371 1.52845 4.87546C1.56346 4.07778 1.69744 3.64703 1.80911 3.35987C1.93999 3.00563 2.14739 2.6834 2.42186 2.4217C2.68656 2.15049 3.00563 1.94309 3.35987 1.81237C3.64703 1.70069 4.08104 1.56668 4.87546 1.53155C5.73696 1.49326 5.99547 1.48369 8.17461 1.48369C10.3572 1.48369 10.6155 1.49326 11.4739 1.53155C12.2716 1.56671 12.7023 1.70066 12.9895 1.81233C13.3436 1.94309 13.6659 2.15049 13.9275 2.4217C14.1987 2.68656 14.4061 3.00563 14.537 3.35987C14.6487 3.64703 14.7827 4.08088 14.8178 4.87546C14.8561 5.73696 14.8657 5.99531 14.8657 8.17461C14.8657 10.3539 14.8561 10.6092 14.8178 11.4707Z" fill="currentColor" />
            <path d="M8.16749 3.97353C5.85108 3.97353 3.97168 5.85281 3.97168 8.16934C3.97168 10.4859 5.85108 12.3651 8.16749 12.3651C10.484 12.3651 12.3633 10.4859 12.3633 8.16934C12.3633 5.85281 10.484 3.97353 8.16749 3.97353ZM8.16749 10.891C6.66472 10.891 5.44573 9.67224 5.44573 8.16934C5.44573 6.66644 6.66472 5.44765 8.16746 5.44765C9.67035 5.44765 10.8892 6.66644 10.8892 8.16934C10.8892 9.67224 9.67032 10.891 8.16749 10.891ZM13.5088 3.80761C13.5088 4.34857 13.0702 4.78717 12.5291 4.78717C11.9882 4.78717 11.5496 4.34857 11.5496 3.80761C11.5496 3.26659 11.9882 2.82812 12.5292 2.82812C13.0702 2.82812 13.5088 3.26656 13.5088 3.80761Z" fill="currentColor" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8 12.8V8.112C12.8 5.808 12.304 4.048 9.616 4.048C8.32 4.048 7.456 4.752 7.104 5.424H7.072V4.256H4.528V12.8H7.184V8.56C7.184 7.44 7.392 6.368 8.768 6.368C10.128 6.368 10.144 7.632 10.144 8.624V12.784H12.8V12.8ZM0.208 4.256H2.864V12.8H0.208V4.256ZM1.536 0C0.688 0 0 0.688 0 1.536C0 2.384 0.688 3.088 1.536 3.088C2.384 3.088 3.072 2.384 3.072 1.536C3.072 0.688 2.384 0 1.536 0Z" fill="currentColor" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.51154 6.91605L15.4612 0H14.0514L8.88522 6.00511L4.75905 0H0L6.23958 9.08079L0 16.3333H1.40997L6.86554 9.99173L11.2231 16.3333H15.9821L9.51119 6.91605H9.51154ZM7.58039 9.1608L6.94819 8.25655L1.918 1.0614H4.08363L8.14305 6.86812L8.77525 7.77236L14.052 15.3202H11.8864L7.58039 9.16114V9.1608Z" fill="currentColor" />
        </svg>
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
        <footer className="bg-sah-red text-sah-white">
            <div className="container mx-auto border-x border-sah-overlay-white-15">
                {/* Row 1: logo + nav | newsletter */}
                <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 px-8 py-10 border-b border-sah-overlay-white-15">
                    <Links />
                    <Newsletter />
                </div>

                {/* Row 2: tagline | social */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-8 py-8 border-b border-sah-overlay-white-15">
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
