import Link from "next/link";
import { cookies, headers } from "next/headers";
import { BASE_URL } from "@/lib/constant";
import NavLink from "@/components/nav-link";
import { logout } from "@/actions/logout";

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

  const links = isLoggedIn ? authLinks : [...guestLinks, ...authLinks];

  let user: Record<string, unknown> | null = null;
  if (isLoggedIn) {
    const headersList = await headers();
    const raw = headersList.get("x-user");
    if (raw) user = JSON.parse(raw) as Record<string, unknown>;
  }

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
        <>
          <a href="/profile" className="flex items-center gap-2 ml-2">
            {pictureUrl ? (
              <img
                src={pictureUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500">
                {displayName?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            {displayName && (
              <p className="hidden sm:block text-sm font-medium text-gray-900">{displayName}</p>
            )}
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Logout
            </button>
          </form>
        </>
      )}
    </nav>
  );
}
