import Link from "next/link";
import { NavLinks, NavActions } from "@/components/new-nav";
import { StatCounter } from "@/components/ui/stat-counter";

export default function Hero() {
  return (
    <div
      className="h-screen w-full flex  bg-cover bg-end bg-no-repeat"
      style={{ backgroundImage: "url('/home-hero.jpg')" }}
    >
      <div className="w-[60%]" style={{ backgroundImage: "url('/home_hero_overlay.png')" }}>
        <NavLinks />
        <div className="flex flex-col gap-6 px-[120px] pt-[200px] pl-[130px]">
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
      <div className="w-[40%] flex flex-col justify-between">
        <NavActions />
        <div className="flex justify-end p-8 pr-[130px]">
          <div
            className="relative w-[280px] px-[30px] py-[50px] flex flex-col gap-3 bg-cover bg-center"
            style={{ backgroundImage: "url('/white-dots.jpg')" }}
          >
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sah-red" />
            <StatCounter
              value={30}
              suffix="+"
              className="text-sah-red font-bold font-geist text-[100px] leading-none"
            />
            <span className="text-sah-gray-2 font-geist font-semibold text-[22px] uppercase tracking-wide leading-snug">
              Leading Years in Construction
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
