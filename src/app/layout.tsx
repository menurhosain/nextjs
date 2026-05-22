import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import Header from "@/components/layout/header/header";
import { LenisProvider } from "@/components/layout/lenis-provider";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { get_global_settings } from "@/services/global.service";
import { get_scripts } from "@/services/script.service";
import { get_stylesheets } from "@/services/stylesheet.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import "./style.scss";

import "./globals.css";
import Footer from "@/components/sections/global/footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    style: ["normal"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
    variable: "--font-dm-serif",
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await headers()).get("x-locale") ?? "en";
    const global = await get_global_settings(locale);
    const faviconUrl = getStrapiMediaUrl(global?.favicon);

    return {
        title: global?.siteName ?? "SAH",
        description: global?.siteDescription ?? "",
        ...(faviconUrl && {
            icons: { icon: faviconUrl, shortcut: faviconUrl },
        }),
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = (await headers()).get("x-locale") ?? "en";
    const isRtl = locale === "ar-om";
    //dir={isRtl ? "rtl" : "ltr"}

    const [scripts, stylesheets] = await Promise.all([get_scripts(), get_stylesheets()]);

    return (
        <html lang={locale} className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} h-full antialiased`}>
            <head>
                {stylesheets.map((s) =>
                    s.href ? (
                        <link key={s.id} rel="stylesheet" href={s.href} />
                    ) : s.content ? (
                        <style key={s.id} dangerouslySetInnerHTML={{ __html: s.content }} />
                    ) : null
                )}
            </head>
            <body className="min-h-full flex flex-col overflow-x-hidden">
                <LenisProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <ScrollToTop />
                </LenisProvider>
                {scripts.map((s) =>
                    s.src ? (
                        <Script key={s.id} src={s.src} strategy={s.strategy ?? "afterInteractive"} />
                    ) : s.content ? (
                        <Script key={s.id} id={`cms-script-${s.id}`} strategy={s.strategy ?? "afterInteractive"} dangerouslySetInnerHTML={{ __html: s.content }} />
                    ) : null,
                )}
            </body>
        </html>
    );
}
