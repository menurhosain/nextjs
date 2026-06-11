import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/nav-link";
import ProfileMenu from "@/components/profile-menu";
import { BASE_URL } from "@/lib/constant";

const guestLinks = [
  { href: "/login", label: "Login" },
  { href: "/register-contractor", label: "Register" },
];

export default async function Navbar() {
  const headersList = await headers();
  const raw = headersList.get("x-user");
  const user: Record<string, unknown> | null = raw
    ? (JSON.parse(raw) as Record<string, unknown>)
    : null;
  const isLoggedIn = !!user;

  const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    ...(user?.type === "contractor"
      ? [{ href: "/apply-for-contractor", label: "Apply for Contractor" }]
      : []),
  ];

  const links = isLoggedIn ? authLinks : guestLinks;

  const displayName =
    (user?.first_name as string | undefined) ??
    (user?.username as string | undefined) ??
    null;
  const profilePicture = user?.profile_picture as
    | { url: string; formats?: { thumbnail?: { url: string } } }
    | null
    | undefined;
  const rawUrl = profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
  const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;

  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-6 px-6 py-3">
        <Link href="/" className="mr-auto flex items-center">
          <Image
            src="/logo-read.png"
            alt="Logo"
            width={79}
            height={120}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {links.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}

        {user && (
          <ProfileMenu displayName={displayName} pictureUrl={pictureUrl} />
        )}
      </div>
    </nav>
  );
}
