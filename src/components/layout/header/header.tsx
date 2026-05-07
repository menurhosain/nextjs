import { NavLinks, NavActions } from "@/components/new-nav";

export default function Header() {
    return (
        <div className="w-full flex-col xl:flex-row flex absolute top-0 left-0 right-0 z-9999">
            <div className="w-[100%] xl:w-[61%]">
                <NavLinks />
            </div>
            <div className="w-[100%] xl:w-[40%]">
                <NavActions />
            </div>
        </div>
    );
}
