import { NavLinks, NavActions } from "@/components/new-nav";
import { headers } from "next/headers";
import { get_global_settings } from "@/services/global.service";
import { get_mega_menu } from "@/services/mega_menu.service";

export default async function Header() {
    const headersList = await headers();
    const locale = headersList.get("x-locale") ?? "en";
    const raw = headersList.get("x-user");
    const user: Record<string, unknown> | null = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    const isLoggedIn = !!user;
    const displayName = (user?.first_name as string | undefined) ?? (user?.username as string | undefined) ?? null;
    const profilePicture = user?.profile_picture as { url: string; formats?: { thumbnail?: { url: string } } } | null | undefined;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
    const rawUrl = profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
    const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;
    const menu = await get_mega_menu();

    return (
        <div className="sah-header section-padding w-full absolute top-0 start-0 end-0 z-9999 border-b border-white/20 max-[1700px]:px-0">
            <div className="container flex-col xl:flex-row flex gap-[0px] xl:gap-[20px] max-[1700px]:!px-4">
                <div className="w-[100%] xl:w-[60%]">
                    <NavLinks />
                </div>
                <div className="w-[100%] xl:w-[40%]">
                    <NavActions locale={locale} isLoggedIn={isLoggedIn} displayName={displayName} pictureUrl={pictureUrl} menu={menu} />
                </div>
            </div>
        </div>
    );
}
