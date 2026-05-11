import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { AngleArrow } from "./svgs";

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
                outline:
                    "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                icon: "size-8",
                "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
                "icon-lg": "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({ className, variant = "default", size = "default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

function ButtonModern({ link, label, variant = "outline", class_name }: { link: string; label: string; variant?: "outline" | "solid" | "pill" | "text"; class_name?: string }) {
    if (variant === "pill") {
        return (
            <a
                href={link}
                className={cn(
                    "outline-none inline-flex items-center bg-white text-sah-dark-2 rounded-full text-base font-medium hover:bg-sah-light-4 transition-colors px-[28px] py-[14px]",
                    class_name,
                )}
            >
                {label}
            </a>
        );
    }

    if (variant === "text") {
        return (
            <a href={link} className={cn("sah-btn-underline inline-flex items-center gap-2 text-white text-base font-medium hover:text-sah-light-1 transition-colors", class_name)}>
                <span>{label}</span>
                <span aria-hidden="true">
                    <svg width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.8 12L6.89 10.95L10.53 6.75H0V5.25H10.53L6.89 1.05L7.8 0L13 6L7.8 12Z" />
                    </svg>
                </span>
            </a>
        );
    }

    if (variant === "solid") {
        return (
            <a href={link} className={cn("inline-flex items-center gap-[10px] group bg-sah-red hover:bg-sah-black text-white hover:text-sah-white   text-[16px] font-bold px-[30px] py-[14px] rounded-[8px] w-fit transition duration-300", class_name)}>
                {label}
				<AngleArrow class_name="!w-[12px] !h-[12px] !fill-white group-hover:!fill-sah-white transition duration-300"/>
            </a>
        );
    }

    return (
        <div className={cn("flex items-center gap-[10px] bg-sah-white rounded-full shadow-sm pl-[24px] pr-[10px] py-[8px]")}>
            <a href="#" className="text-sah-dark-2 text-[16px] font-medium font-inter decoration-sah-dark-2 hover:text-sah-red hover:decoration-sah-red transition-colors">
                {label}
            </a>

            <a href={link} className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-sah-red flex-shrink-0 transition-colors" aria-label="Navigate">
				<AngleArrow class_name="!w-[8px] !h-[8px] !fill-sah-white"/>
            </a>
        </div>
    );
}

export { Button, buttonVariants, ButtonModern };
