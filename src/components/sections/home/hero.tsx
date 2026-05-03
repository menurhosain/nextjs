import Link from "next/link";
import { NavLinks, NavActions } from "@/components/new-nav";

export default function Hero() {
  return (
    <div
      className="h-screen w-full flex  bg-cover bg-end bg-no-repeat"
      style={{ backgroundImage: "url('/home-hero.jpg')" }}
    >
      <div className="w-[60%]" style={{ backgroundImage: "url('/home_hero_overlay.png')" }}>
        <NavLinks />
        <div className="flex flex-col gap-6 px-[120px] pt-[200px]">
          <h1 className="text-white leading-[90px] tracking-[-0.05em]">
            <span className="font-bold text-[100px] font-geist">Leading Design</span>
            <br />
            <em className="italic text-[84px] font-normal font-dm-serif">& Build Contractor</em>
          </h1>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-sah-red text-white text-sm font-medium px-5 py-3 rounded-full w-fit"
          >
            You Like to Build?
            <span>&#8599;</span>
          </Link>
        </div>
      </div>
      <div className="w-[40%]">
        <NavActions />
      </div>
    </div>
  );
}
