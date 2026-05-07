function Banner({ bgImg, children, style }: { bgImg: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section className="h-[85vh] sm:h-screen w-full flex bg-cover bg-end bg-no-repeat banner-overlay" style={{ backgroundImage: `url('${bgImg}')`, ...style }}>
            <div className="container flex flex-col md:flex-row gap-[2%]">{children}</div>
        </section>
    );
}

function Left({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div className="w-[100%] md:w-[60%]  pt-[100px] section-padding flex items-center " style={{ ...style }}>
            {children}
        </div>
    );
}

function Right({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-[100%] md:w-[38%]  flex flex-col justify-end section-padding ${className}`}>{children}</div>;
}

Banner.Left = Left;
Banner.Right = Right;

export default Banner;
