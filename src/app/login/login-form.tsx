"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login_user } from "@/actions/login";
import type { LoginFormState } from "@/actions/login";

type Props = {
    email_label?: string | null;
    email_placeholder?: string | null;
    password_label?: string | null;
    forgot_password_label?: string | null;
    forgot_password_link?: string | null;
    submit_button_label?: string | null;
    submitting_label?: string | null;
    confirmed?: boolean;
};

const initialState: LoginFormState = { errors: {} };
const inputClass  = "h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1 focus-visible:border-sah-red focus:outline-none focus-visible:ring-0";
const labelClass  = "font-normal text-sah-gray-1 mb-[12px]";

export default function LoginForm({
    email_label,
    email_placeholder,
    password_label,
    forgot_password_label,
    forgot_password_link,
    submit_button_label,
    submitting_label,
    confirmed,
}: Props) {
    const [state, formAction, pending] = useActionState(login_user, initialState);
    const e = state.errors;

    return (
        <form action={formAction} className="space-y-5">

            {confirmed && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 text-center">
                    Email confirmed! You can now sign in.
                </p>
            )}

            {/* Email */}
            <div className="space-y-1.5">
                <Label htmlFor="email" className={labelClass}>
                    {email_label || "Email"}
                </Label>
                <Input id="email" name="email" type="email" placeholder={email_placeholder || "john@example.com"} required className={inputClass} />
                {e.email && <p className="text-sm text-red-500">{e.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <div className="flex sm:items-center justify-between flex-col sm:flex-row">
                    <Label htmlFor="password" className={labelClass}>
                        {password_label || "Password"}
                    </Label>
                    <a href={forgot_password_link || "/forget-password"} className="text-xs text-gray-500 hover:underline">
                        {forgot_password_label || "Forgot password?"}
                    </a>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" required className={inputClass} />
                {e.password && <p className="text-sm text-red-500">{e.password}</p>}
            </div>

            {state.serverError && (
                <p className="text-sm text-red-500 text-center">{state.serverError}</p>
            )}

            <Button
                type="submit"
                disabled={pending}
                className="w-full mt-2 cursor-pointer bg-sah-black text-sah-white py-5 rounded-[6px] hover:bg-sah-red"
                variant="secondary"
            >
                {pending ? (submitting_label || "Signing in...") : (submit_button_label || "Sign in")}
            </Button>
        </form>
    );
}
