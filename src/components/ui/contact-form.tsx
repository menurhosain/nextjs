"use client";

import { useActionState, startTransition } from "react";
import { submit_contact_form, type ContactFormState } from "@/actions/contact";

declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export type OffcanvasContactFormProps = {
    title: string;
    placeholderFirstName: string;
    placeholderLastName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderMessage: string;
    submitLabel: string;
    recaptchaSiteKey: string;
};

export function OffcanvasContactForm({
    title,
    placeholderFirstName,
    placeholderLastName,
    placeholderEmail,
    placeholderPhone,
    placeholderMessage,
    submitLabel,
    recaptchaSiteKey,
}: OffcanvasContactFormProps) {
    const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submit_contact_form, { errors: {} });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(recaptchaSiteKey, { action: "contact" }).then(resolve);
            });
        });
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("recaptcha_token", token);
        startTransition(() => {
            formAction(formData);
        });
    };

    if (state.success) {
        return (
            <div className="flex-1 overflow-y-auto px-6 pt-[67px] pb-20 flex flex-col gap-4">
                <p className="font-inter text-[15px] font-semibold tracking-widest uppercase text-sah-red mb-4">{title}</p>
                <div className="flex flex-col items-start gap-3 py-6">
                    <p className="font-inter text-[20px] font-semibold text-sah-black">Message Sent!</p>
                    <p className="font-inter text-[15px] text-sah-black/60">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-6 pt-[67px] pb-20">
            <p className="font-inter text-[15px] font-semibold tracking-widest uppercase text-sah-red mb-4">{title}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div className="flex gap-4 flex-col">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder={placeholderFirstName}
                            className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                        />
                        {state.errors.firstName && <p className="text-red-500 text-[12px] mt-1">{state.errors.firstName}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder={placeholderLastName}
                            className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                        />
                        {state.errors.lastName && <p className="text-red-500 text-[12px] mt-1">{state.errors.lastName}</p>}
                    </div>
                </div>

                <div className="flex gap-4 flex-col">
                    <input
                        type="email"
                        name="email"
                        placeholder={placeholderEmail}
                        className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder={placeholderPhone}
                        className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder={placeholderMessage}
                        rows={5}
                        className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 resize-none focus:outline-none focus:border-red-500 transition"
                    />
                    {state.errors.message && <p className="text-red-500 text-[12px] mt-1">{state.errors.message}</p>}
                </div>

                {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[20px] font-medium py-[14px] transition-colors duration-300 mt-2 cursor-pointer"
                >
                    {isPending ? "Sending..." : submitLabel}
                </button>
            </form>
        </div>
    );
}
