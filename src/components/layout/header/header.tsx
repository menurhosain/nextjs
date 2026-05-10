import { NavLinks, NavActions } from "@/components/new-nav";

export default function Header() {
    return (
        <div className="sah-header section-padding w-full absolute top-0 left-0 right-0 z-9999 border-b border-white/20">
            <div className="container flex-col xl:flex-row flex gap-[20px]">
                <div className="w-[100%] xl:w-[60%]">
                    <NavLinks />
                </div>
                <div className="w-[100%] xl:w-[40%]">
                    <NavActions />
                </div>
            </div>
        </div>
    );
}
