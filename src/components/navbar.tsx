import { headers } from "next/headers";
import NavLink from "@/components/nav-link";
import ProfileMenu from "@/components/profile-menu";
import { BASE_URL } from "@/lib/constant";

const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/job", label: "Apply for Recruitment" },
];

export default async function Navbar() {
    const headersList = await headers();
    const raw = headersList.get("x-user");
    const user: Record<string, unknown> | null = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    const isLoggedIn = !!user;

    const visibleAuthLinks = user?.type === "contractor" ? [...authLinks.filter((l) => l.href !== "/job"), { href: "/job", label: "Apply for Contractor" }] : authLinks;
    const links = isLoggedIn ? visibleAuthLinks : [];

    const displayName = (user?.first_name as string | undefined) ?? (user?.username as string | undefined) ?? null;
    const profilePicture = user?.profile_picture as { url: string; formats?: { thumbnail?: { url: string } } } | null | undefined;
    const rawUrl = profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
    const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;

    return (
        <nav className="w-full border-b border-gray-200 bg-background">
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-6 py-3">
                {links.map(({ href, label }) => (
                    <NavLink key={href} href={href} label={label} />
                ))}

                {user && <ProfileMenu displayName={displayName} pictureUrl={pictureUrl} />}
            </div>
        </nav>
    );
}
