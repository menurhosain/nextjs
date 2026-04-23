import Link from "next/link";
import { cookies, headers } from "next/headers";
import { BASE_URL } from "@/lib/constant";
import NavLink from "@/components/nav-link";
import ProfileMenu from "@/components/profile-menu";

const guestLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const authLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/apply-for-recrutement", label: "Apply for Recruitment" },
];

export default async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("jwt")?.value;

  let user: Record<string, unknown> | null = null;
  if (isLoggedIn) {
    const headersList = await headers();
    const raw = headersList.get("x-user");
    if (raw) user = JSON.parse(raw) as Record<string, unknown>;
  }

  const visibleAuthLinks =
    user?.type === "contractor"
      ? [
          ...authLinks.filter((l) => l.href !== "/apply-for-recrutement"),
          { href: "/apply-for-contractor", label: "Apply for Contractor" },
        ]
      : authLinks;

  const contractorLink = { href: "/apply-for-contractor", label: "Apply for Contractor" };

  const links = isLoggedIn
    ? visibleAuthLinks
    : [...guestLinks, ...authLinks, contractorLink];

  const displayName =
    (user?.first_name as string | undefined) ??
    (user?.username as string | undefined) ??
    null;
  const profilePicture = user?.profile_picture as
    | { url: string; formats?: { thumbnail?: { url: string } } }
    | null
    | undefined;
  const rawUrl =
    profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
  const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;

  return (
    <nav className="w-full border-b bg-background px-6 py-3 flex items-center gap-6">
      <Link href="/" className="font-semibold text-lg mr-auto">
        MyApp
      </Link>

      {links.map(({ href, label }) => (
        <NavLink key={href} href={href} label={label} />
      ))}

      {user && (
        <ProfileMenu displayName={displayName} pictureUrl={pictureUrl} />
      )}
    </nav>
  );
}
