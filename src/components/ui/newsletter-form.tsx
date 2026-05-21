"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribe_to_newsletter, type NewsletterFormState } from "@/actions/newsletter";

export function NewsletterForm({ placeholder, button_label }: { placeholder: string; button_label: string }) {
    const [state, action, isPending] = useActionState<NewsletterFormState, FormData>(subscribe_to_newsletter, {});

    if (state.success) {
        return <p className="text-sah-white text-sm font-medium">Thanks for subscribing!</p>;
    }

    return (
        <div className="flex flex-col gap-2 max-[640px]:w-full">
            <div className="flex flex-col gap-3 sm:gap-2 md:flex-row items-center max-[640px]:w-full">
                <form action={action} className="flex flex-col gap-3 sm:gap-2 md:flex-row items-center max-[640px]:w-full">
                    <Input
                        type="email"
                        name="email"
                        placeholder={placeholder}
                        required
                        className="w-[100%] sm:w-56 h-11 rounded-none bg-sah-white text-sah-black placeholder:text-sah-gray-2 border-0 focus-visible:ring-0 text-sm px-4"
                    />
                    <Button type="submit" disabled={isPending} className="h-11 border-0 rounded-none bg-sah-black hover:bg-sah-dark-1 disabled:opacity-60 text-sah-white text-sm font-medium px-6 cursor-pointer max-[640px]:!w-[100%]">
                        {isPending ? "Submiting..." : button_label}
                    </Button>
                </form>
            </div>
            {state.error && <p className="text-red-400 text-xs">{state.error}</p>}
        </div>
    );
}
