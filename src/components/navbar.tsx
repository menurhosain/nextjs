import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/nav-link";
import { BASE_URL } from "@/lib/constant";

export default async function Navbar() {
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
      </div>
    </nav>
  );
}
