import { NavLinks, NavActions } from "@/components/new-nav";

export default function Hero() {
  return (
    <div
      className="h-screen w-full flex  bg-cover bg-end bg-no-repeat"
      style={{ backgroundImage: "url('/home-hero.jpg')" }}
    >
      <div className="w-[60%]" style={{ backgroundImage: "url('/home_hero_overlay.png')" }}>
        <NavLinks />
      </div>
      <div className="w-[40%]">
        <NavActions />
      </div>
    </div>
  );
}
