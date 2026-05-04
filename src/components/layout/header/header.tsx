import { NavLinks, NavActions } from "@/components/new-nav";

export default function Header() {
    return (
        <div className="w-full flex absolute top-0 left-0 right-0 z-9999">
            <div className="w-[60%]">
                <NavLinks />
            </div>
            <div className="w-[40%]">
                <NavActions />
            </div>
        </div>
    );
}
