"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GsapInit() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window.gsap_init_obj !== "object") return;
        window.gsap_init_obj.init_all_animations();
    }, [pathname]);

    return null;
}
