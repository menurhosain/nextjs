import React from "react";

function Banner({ bgImg, children, style }: { bgImg: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section className="h-screen w-full flex bg-cover bg-end bg-no-repeat" style={{ backgroundImage: `url('${bgImg}')`, ...style }}>
            {children}
        </section>
    );
}

function Left({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div className="w-[60%]" style={{ backgroundImage: "url('/home_hero_overlay.png')", ...style }}>
            {children}
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[40%] flex flex-col justify-end ${className}`}>{children}</div>;
}

Banner.Left = Left;
Banner.Right = Right;

export default Banner;
