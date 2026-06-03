"use client";

import { usePathname } from "next/navigation";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // key={pathname} forces React to unmount + remount all page content on
    // every navigation (including browser back/forward), so useEffect hooks
    // in page components always re-run after route changes.
    return <main key={pathname}>{children}</main>;
}
