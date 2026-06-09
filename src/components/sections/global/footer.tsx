import { get_footer_content, type FooterContent, type FooterNavLink, type FooterSocialLink } from "@/services/page_content.service";
import { get_global_settings } from "@/services/global.service";
import { getStrapiMediaUrl } from "@/lib/utils";

const DEFAULTS: FooterContent = {
    logo: null,
    nav_links: [
        { id: 1, button_label: "Our Company", button_link: "/about-us" },
        { id: 2, button_label: "Our Services", button_link: "/services" },
        { id: 3, button_label: "Our Projects", button_link: "/projects" },
        { id: 4, button_label: "News", button_link: "/news" },
        { id: 5, button_label: "Careers", button_link: "/careers" },
        { id: 6, button_label: "Contact", button_link: "/contact" },
    ],
    tagline: "We are a forward-thinking consulting firm dedicated to helping businesses grow through strategic insights, innovative solutions, and measurable results.",
    social_links: [],
    copyright_text: "© Copyright 2026 SAH",
    terms_label: "Terms & Agreements",
    terms_link: "#",
    privacy_label: "Privacy Policy",
    privacy_link: "#",
    newsletter_placeholder: "Enter your email",
    newsletter_button_label: "Subscribe",
};

function merge(data: FooterContent | null): FooterContent {
    if (!data) return DEFAULTS;
    return {
        logo: data.logo ?? DEFAULTS.logo,
        nav_links: data.nav_links?.length ? data.nav_links : DEFAULTS.nav_links,
        tagline: data.tagline || DEFAULTS.tagline,
        social_links: data.social_links?.length ? data.social_links : DEFAULTS.social_links,
        copyright_text: data.copyright_text || DEFAULTS.copyright_text,
        terms_label: data.terms_label || DEFAULTS.terms_label,
        terms_link: data.terms_link || DEFAULTS.terms_link,
        privacy_label: data.privacy_label || DEFAULTS.privacy_label,
        privacy_link: data.privacy_link || DEFAULTS.privacy_link,
        newsletter_placeholder: data.newsletter_placeholder || DEFAULTS.newsletter_placeholder,
        newsletter_button_label: data.newsletter_button_label || DEFAULTS.newsletter_button_label,
    };
}

function Links({ nav_links, logo, light_logo_url }: { nav_links: FooterNavLink[]; logo: FooterContent["logo"]; light_logo_url: string }) {
    const logoSrc = light_logo_url || getStrapiMediaUrl(logo) || "/logo-white.png";
    const logoAlt = logo?.alternativeText || "SAH";

    return (
        <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end gap-7 2xl:gap-15 md:items-center  max-[640px]:w-full">
            <a href="/">
                {" "}
                <img src={logoSrc} alt={logoAlt} width={80} height={80} />{" "}
            </a>
            <nav className="flex sm:flex-row flex-wrap max-[768px]:justify-center xl:items-center gap-2.5 sm:gap-4 xl:gap-8">
                {nav_links.map(({ id, button_label, button_link }) => (
                    <a key={id} href={button_link} className="text-[16px] font-semibold hover:opacity-80 transition-opacity whitespace-nowrap">
                        {button_label}
                    </a>
                ))}
            </nav>
        </div>
    );
}

function Social({ social_links }: { social_links: FooterSocialLink[] }) {
    return (
        <div className="flex items-center gap-3">
            {social_links.map(({ id, icon, url }) => (
                <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-sah-overlay-white-30 flex items-center justify-center text-sah-white hover:text-sah-red hover:bg-sah-white hover:border-sah-white transition-colors sm:text-[20px] text-[16px]"
                    dangerouslySetInnerHTML={{ __html: icon }}
                />
            ))}
        </div>
    );
}

function Copyright({
    copyright_text,
    terms_label,
    terms_link,
    privacy_label,
    privacy_link,
}: {
    copyright_text: string;
    terms_label: string;
    terms_link: string;
    privacy_label: string;
    privacy_link: string;
}) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 py-6">
            <p className="text-[16px] text-sah-white">{copyright_text}</p>
            <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
                <a href={terms_link} className="text-[16px] text-sah-white">
                    {terms_label}
                </a>
                <a href={privacy_link} className="text-[16px] text-sah-white">
                    {privacy_label}
                </a>
            </div>
        </div>
    );
}

export default async function Footer() {
    const [data, global] = await Promise.all([get_footer_content(), get_global_settings()]);
    const content = merge(data);
    const light_logo_url = getStrapiMediaUrl(global?.light_logo);

    return (
        <footer className="bg-sah-red text-sah-white section-padding">
            <div className="container mx-auto !px-0 border-x border-sah-overlay-white-15">
                {/* Row 1: logo + nav | newsletter */}
                <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end xl:justify-between gap-6 py-10 px-[15px] sm:px-[40px] border-b border-sah-overlay-white-15">
                    <Links nav_links={content.nav_links} logo={content.logo} light_logo_url={light_logo_url} />
                </div>

                {/* Row 2: tagline | social */}
                <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-4 px-[15px] sm:px-[40px] py-8 border-b border-sah-overlay-white-15">
                    <p className="text-[16px] text-sah-white max-w-[670px] leading-relaxed text-center xl:text-left">{content.tagline}</p>
                    <Social social_links={content.social_links} />
                </div>

                {/* Row 3: copyright */}
                <div className="px-[15px] sm:px-[40px]">
                    <Copyright
                        copyright_text={content.copyright_text}
                        terms_label={content.terms_label}
                        terms_link={content.terms_link}
                        privacy_label={content.privacy_label}
                        privacy_link={content.privacy_link}
                    />
                </div>
            </div>
        </footer>
    );
}
