"use client";

import { useActionState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { register_user } from "@/actions/register";
import type { FormState } from "@/actions/register";

const initialState: FormState = { errors: {} };

export default function RegisterApplicantForm() {
    const router = useRouter();
    const [state, formAction, pending] = useActionState(register_user, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/login");
        }
    }, [state.success, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "register" }).then(resolve);
            });
        });
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("recaptcha_token", token);
        startTransition(() => {
            formAction(formData);
        });
    };

    const e = state.errors;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="register_as" value="applicant" />

            {/* First name & Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="font-normal text-sah-gray-1 mb-[12px]">
                        First name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                        required
                    />
                    {e.firstName && <p className="text-sm text-red-500">{e.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="font-normal text-sah-gray-1 mb-[12px]">
                        Last name
                    </Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label htmlFor="email" className="font-normal text-sah-gray-1 mb-[12px]">
                    Email <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                />
                {e.email && <p className="text-sm text-red-500">{e.email}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1.5">
                <Label htmlFor="username" className="font-normal text-sah-gray-1 mb-[12px]">
                    Username <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                    required
                />
                {e.username && <p className="text-sm text-red-500">{e.username}</p>}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="password" className="font-normal text-sah-gray-1 mb-[12px]">
                        Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                    />
                    {e.password && <p className="text-sm text-red-500">{e.password}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="font-normal text-sah-gray-1 mb-[12px]">
                        Confirm password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                    />
                    {e.confirmPassword && <p className="text-sm text-red-500">{e.confirmPassword}</p>}
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label htmlFor="phone" className="font-normal text-sah-gray-1 mb-[12px]">
                    Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                />
                {e.phone && <p className="text-sm text-red-500">{e.phone}</p>}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
                <Label htmlFor="location" className="font-normal text-sah-gray-1 mb-[12px]">
                    Location
                </Label>
                <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1 focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
                />
            </div>

            {state.serverError && <p className="text-sm text-red-500 text-center">{state.serverError}</p>}

            <Button type="submit" disabled={pending} className="w-full mt-2 cursor-pointer bg-sah-black text-sah-white py-5 rounded-[6px] hover:bg-sah-red" variant="secondary">
                {pending ? "Registering..." : "Register"}
            </Button>
        </form>
    );
}
