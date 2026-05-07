import { cn } from "@/lib/utils";
import { BrandShape } from "./svgs";

function Banner({ bgImg, children, style }: { bgImg: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section
            className={`h-[85vh] sm:h-screen w-full flex bg-cover bg-end bg-no-repeat banner-overlay section-padding bg-[linear-gradient(226deg,transparent_0%,rgba(23,23,27,0.9)_100%),url('/home-hero.jpg')]`}
            style={{ ...style }}
        >
            <div className="container relative  flex flex-col justify-center md:flex-row gap-[2%]">{children}</div>
        </section>
    );
}

function Left({ children, style, class_name }: { children: React.ReactNode; style?: React.CSSProperties; class_name?: string }) {
    return (
        <div className={cn("w-[100%] md:w-[60%]  pt-[100px] flex items-center", class_name)} style={{ ...style }}>
            {children}
            <BrandShape class_name="absolute bottom-0 !fill-transparent !w-[50%] !h-[30%] z-[-1]" />
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[100%] md:w-[38%] flex flex-col justify-end ${className}`}>{children}</div>;
}

Banner.Left = Left;
Banner.Right = Right;

export default Banner;
