"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-sm transition-colors hover:text-foreground ${
        pathname === href
          ? "text-foreground font-medium"
          : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
