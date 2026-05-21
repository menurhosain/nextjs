import { NavLinks, NavActions } from "@/components/new-nav";
import { headers } from "next/headers";
import { get_mega_menu } from "@/services/mega_menu.service";
import { get_offcanvas_content } from "@/services/offcanvas.service";
import { get_global_settings } from "@/services/global.service";
import { getStrapiMediaUrl } from "@/lib/utils";

export default async function Header() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const [menus, offcanvas, global] = await Promise.all([get_mega_menu(locale), get_offcanvas_content(locale), get_global_settings(locale)]);
    const light_logo_url = getStrapiMediaUrl(global?.light_logo) || "/logo-white.png";

    return (
        <div className="sah-header section-padding w-full absolute top-0 left-0 right-0 z-9999 border-b border-white/20 max-[1700px]:px-0">
            <div className="container flex-col xl:flex-row flex gap-[0px] xl:gap-[20px] max-[1700px]:!px-4">
                <div className="w-[100%] xl:w-[60%]">
                    <NavLinks menus={menus} />
                </div>
                <div className="w-[100%] xl:w-[40%]">
                    <NavActions locale={locale} menus={menus} offcanvas={offcanvas} light_logo_url={light_logo_url} />
                </div>
            </div>
        </div>
    );
}
