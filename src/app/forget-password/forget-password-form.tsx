"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { forget_password, type ForgetPasswordFormState } from "@/actions/forget-password";

type Props = {
    form_title?: string | null;
    form_description?: string | null;
    email_label?: string | null;
    email_placeholder?: string | null;
    submit_button_label?: string | null;
    submitting_label?: string | null;
    success_title?: string | null;
    success_description?: string | null;
};

const initialState: ForgetPasswordFormState = { errors: {} };
const inputClass = "h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1 focus-visible:border-sah-red focus:outline-none focus-visible:ring-0";
const labelClass = "font-normal text-sah-gray-1 mb-[12px]";

export default function ForgetPasswordForm({
    form_title,
    form_description,
    email_label,
    email_placeholder,
    submit_button_label,
    submitting_label,
    success_title,
    success_description,
}: Props) {
    const [state, formAction, pending] = useActionState(forget_password, initialState);

    if (state.success) {
        return (
            <>
                <h2 className="text-[24px] sm:text-2xl text-center font-bold text-gray-900 mb-2">
                    {success_title || "Check your email"}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                    {success_description
                        ? success_description.replace("{email}", state.email ?? "")
                        : <>If an account exists for <span className="font-medium text-gray-700">{state.email}</span>, you will receive a password reset link shortly.</>
                    }
                </p>
            </>
        );
    }

    return (
        <form action={formAction} className="space-y-5">
            <h2 className="text-[24px] font-bold text-gray-900 mb-2">
                {form_title || "Forgot password"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                {form_description || "Enter your email and we'll send you a reset link."}
            </p>

            <div className="space-y-1.5">
                <Label htmlFor="email" className={labelClass}>
                    {email_label || "Email"}
                </Label>
                <Input id="email" name="email" type="email" placeholder={email_placeholder || "john@example.com"} required className={inputClass} />
                {state.errors.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
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
                {pending ? (submitting_label || "Sending...") : (submit_button_label || "Send reset link")}
            </Button>
        </form>
    );
}
