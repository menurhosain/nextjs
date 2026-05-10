import { cn } from "@/lib/utils";
import { BrandShape } from "./svgs";

function Banner({ bg, children, style }: { bg: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section className={`h-[85vh] sm:h-screen relative w-full flex banner-overlay section-padding overflow-hidden`} style={{ ...style }}>
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover z-[-1]">
                <source src={bg} type="video/mp4" />
            </video>
            <div className="container relative z-3  flex flex-col justify-center md:flex-row gap-[2%]">{children}</div>
        </section>
    );
}

function Left({ children, style, class_name }: { children: React.ReactNode; style?: React.CSSProperties; class_name?: string }) {
    return (
        <div className={cn("w-[100%] md:w-[60%]  pt-[100px] flex items-center", class_name)} style={{ ...style }}>
            {children}
            <BrandShape class_name="absolute bottom-0 !fill-transparent !w-[100%] md:!w-[70%] !h-[400px] z-[-1]" />
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[100%] md:w-[38%] flex flex-col items-end justify-end ${className}`}>{children}</div>;
}

Banner.Left = Left;
Banner.Right = Right;

export default Banner;
