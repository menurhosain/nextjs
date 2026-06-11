"use client";

import { useActionState, startTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { register_user } from "@/actions/register";
import type { FormState } from "@/actions/register";

declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}
type Props = {
    recaptcha_site_key: string;
    first_name_label?: string | null;
    last_name_label?: string | null;
    email_label?: string | null;
    username_label?: string | null;
    password_label?: string | null;
    confirm_password_label?: string | null;
    phone_label?: string | null;
    location_label?: string | null;
    first_name_placeholder?: string | null;
    last_name_placeholder?: string | null;
    email_placeholder?: string | null;
    username_placeholder?: string | null;
    phone_placeholder?: string | null;
    location_placeholder?: string | null;
    submit_button_label?: string | null;
    submitting_label?: string | null;
};

const initialState: FormState = { errors: {} };
const inputClass = "h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1 focus-visible:border-sah-red focus:outline-none focus-visible:ring-0";
const labelClass = "font-normal text-sah-gray-1 mb-[12px]";

export default function RegisterContractorForm({
    recaptcha_site_key,
    first_name_label,
    last_name_label,
    email_label,
    username_label,
    password_label,
    confirm_password_label,
    phone_label,
    location_label,
    first_name_placeholder,
    last_name_placeholder,
    email_placeholder,
    username_placeholder,
    phone_placeholder,
    location_placeholder,
    submit_button_label,
    submitting_label,
}: Props) {
    const [state, formAction, pending] = useActionState(register_user, initialState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(recaptcha_site_key, { action: "register" }).then(resolve);
            });
        });
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("recaptcha_token", token);
        startTransition(() => {
            formAction(formData);
        });
    };

    const e = state.errors;

    if (state.success) {
        return (
            <div className="text-center space-y-4 py-4">
                <p className="text-2xl">📧</p>
                <p className="font-semibold text-gray-900">Check your email</p>
                <p className="text-sm text-gray-600">
                    A confirmation link has been sent to{" "}
                    <span className="font-medium">{state.email}</span>.
                    Click it to activate your account, then{" "}
                    <a href="/login" className="text-sah-red underline">sign in</a>.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="register_as" value="contractor" />

            {/* First name & Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="firstName" className={labelClass}>
                        {first_name_label || "First name"} <span className="text-red-500">*</span>
                    </Label>
                    <Input id="firstName" name="firstName" placeholder={first_name_placeholder || "John"} className={inputClass} required />
                    {e.firstName && <p className="text-sm text-red-500">{e.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="lastName" className={labelClass}>
                        {last_name_label || "Last name"}
                    </Label>
                    <Input id="lastName" name="lastName" placeholder={last_name_placeholder || "Doe"} className={inputClass} />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label htmlFor="email" className={labelClass}>
                    {email_label || "Email"} <span className="text-red-500">*</span>
                </Label>
                <Input id="email" name="email" type="email" placeholder={email_placeholder || "john@example.com"} required className={inputClass} />
                {e.email && <p className="text-sm text-red-500">{e.email}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1.5">
                <Label htmlFor="username" className={labelClass}>
                    {username_label || "Username"} <span className="text-red-500">*</span>
                </Label>
                <Input id="username" name="username" placeholder={username_placeholder || "johndoe"} className={inputClass} required />
                {e.username && <p className="text-sm text-red-500">{e.username}</p>}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="password" className={labelClass}>
                        {password_label || "Password"} <span className="text-red-500">*</span>
                    </Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" required className={inputClass} />
                    {e.password && <p className="text-sm text-red-500">{e.password}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className={labelClass}>
                        {confirm_password_label || "Confirm password"} <span className="text-red-500">*</span>
                    </Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required className={inputClass} />
                    {e.confirmPassword && <p className="text-sm text-red-500">{e.confirmPassword}</p>}
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label htmlFor="phone" className={labelClass}>
                    {phone_label || "Phone"} <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder={phone_placeholder || "+1 (555) 000-0000"} required className={inputClass} />
                {e.phone && <p className="text-sm text-red-500">{e.phone}</p>}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
                <Label htmlFor="location" className={labelClass}>
                    {location_label || "Location"}
                </Label>
                <Input id="location" name="location" placeholder={location_placeholder || "New York, USA"} className={inputClass} />
            </div>

            {state.serverError && <p className="text-sm text-red-500 text-center">{state.serverError}</p>}

            <Button type="submit" disabled={pending} className="w-full mt-2 cursor-pointer bg-sah-black text-sah-white py-5 rounded-[6px] hover:bg-sah-red" variant="secondary">
                {pending ? submitting_label || "Registering..." : submit_button_label || "Register"}
            </Button>
        </form>
    );
}
