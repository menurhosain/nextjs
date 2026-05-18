import { NavLinks, NavActions } from "@/components/new-nav";
import { headers } from "next/headers";
import { get_mega_menu } from "@/services/mega_menu.service";

export default async function Header() {
    const locale = (await headers()).get("x-locale") ?? "en";
    const menus = await get_mega_menu(locale);

    return (
        <div className="sah-header section-padding w-full absolute top-0 left-0 right-0 z-9999 border-b border-white/20 max-[1700px]:px-0">
            <div className="container flex-col xl:flex-row flex gap-[0px] xl:gap-[20px] max-[1700px]:!px-4">
                <div className="w-[100%] xl:w-[60%]">
                    <NavLinks menus={menus} />
                </div>
                <div className="w-[100%] xl:w-[40%]">
                    <NavActions locale={locale} menus={menus} />
                </div>
            </div>
        </div>
    );
}
