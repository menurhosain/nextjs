import { useState } from "react";


export default  function ChooseCard({ icon, title, desc, accent, dark,
}: { icon: React.ReactNode; title: string; desc: string; accent?: boolean; dark?: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    const bg = dark
        ? "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]"
        : accent
            ? "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]"
            : "bg-[var(--color-sah-dark-3)] hover:bg-[var(--color-sah-dark-5)]";

    return (
        <div
            className={`relative rounded-[12px] p-4 xl:p-7 flex flex-col gap-[30px] cursor-pointer overflow-hidden transition-all duration-500 group ${bg} hover:border-[#c0392b]/30`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Glow spot */}
            <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c0392b]/10 blur-3xl transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0" }`}
            />
            {/* Top rule */}
            <div
                className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#c0392b]/60 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
                    }`}
            />
            <div className="flex items-center gap-[20px] max-[1280px]:flex-col max-[1280px]:items-start">
                <div
                    className={`text-white/60 transition-all duration-500 group-hover:text-white origin-left flex items-center justify-center h-[80px] w-[80px] min-w-[80px] bg-sah-dark-2 rounded-[50%]`}
                >
                    {icon}
                </div>
                <h3 className="text-white font-medium text-[22px] 2xl:text-[30px] leading-[1.4] 2xl:leading-[38px] mb-0 sm:mr-6 md:mr-0  2xl:mr-11">{title}</h3>
            </div>
            <div>
                <div
                    className={`w-8 h-[1px] bg-sah-white/15 mb-[47px] transition-all duration-500 ${hovered ? "w-full !bg-sah-red" : "w-[350px]" }`}
                />
                <p className="text-white/70 text-[16px] leading-relaxed group-hover:text-white transition-colors duration-300">
                    {desc}
                </p>
            </div>
        </div>
    );
}