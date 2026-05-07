import { cn } from "@/lib/utils";

function Banner({ bgImg, children, style }: { bgImg: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section className="h-[85vh] sm:h-screen w-full flex bg-cover bg-end bg-no-repeat banner-overlay section-padding" style={{ backgroundImage: `url('${bgImg}')`, ...style }}>
            <div className="container flex flex-col justify-center md:flex-row gap-[2%]">{children}</div>
        </section>
    );
}

function Left({ children, style, class_name }: { children: React.ReactNode; style?: React.CSSProperties; class_name?: string }) {
    return (
        <div className={cn("w-[100%] md:w-[60%]  pt-[100px] flex items-center", class_name)} style={{ ...style }}>
            {children}
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[100%] md:w-[38%]  flex flex-col justify-end ${className}`}>{children}</div>;
}

Banner.Left = Left;
Banner.Right = Right;

export default Banner;
