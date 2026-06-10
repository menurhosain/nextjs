"use client";

import { useActionState, useEffect, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { submit_subcontracted_apply, type ApplySubcontractedFormState } from "@/actions/subcontractor-apply";
import type { ApplyContractorContent } from "@/services/subcontractor_apply.service";

const initialState: ApplySubcontractedFormState = { errors: {} };

const inputClass = "w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition";
const labelClass = "block text-[13px] font-medium text-sah-dark-2 mb-1";
const errorClass = "text-red-500 text-[12px] mt-1";
const req = <span className="text-red-500">*</span>;

declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

type Props = { content: ApplyContractorContent | null; subcontractedSlug: string; recaptcha_site_key: string };

export default function ApplyForm({ content: c, subcontractedSlug, recaptcha_site_key }: Props) {
    const router = useRouter();
    const [state, formAction, pending] = useActionState(submit_subcontracted_apply, initialState);
    const [clientError, setClientError] = useState<string | null>(null);

    useEffect(() => {
        if (state.success) router.push("/dashboard");
    }, [state.success, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClientError(null);

        if (!recaptcha_site_key) {
            setClientError("reCAPTCHA is not configured. Please contact support.");
            return;
        }

        try {
            const token = await new Promise<string>((resolve, reject) => {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(recaptcha_site_key, { action: "apply" }).then(resolve).catch(reject);
                });
            });
            const formData = new FormData(e.target as HTMLFormElement);
            formData.append("recaptcha_token", token);
            startTransition(() => { formAction(formData); });
        } catch {
            setClientError("reCAPTCHA verification failed. Please refresh the page and try again.");
        }
    };

    const e = state.errors;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="subcontractedSlug" value={subcontractedSlug} />

            <div>
                <label htmlFor="fullName" className={labelClass}>Full Name {req}</label>
                <input id="fullName" name="fullName" type="text" placeholder="John Doe" required className={inputClass} />
                {e.fullName && <p className={errorClass}>{e.fullName}</p>}
            </div>

            <div>
                <label htmlFor="title" className={labelClass}>Title {req}</label>
                <input id="title" name="title" type="text" placeholder="Project Manager" required className={inputClass} />
                {e.title && <p className={errorClass}>{e.title}</p>}
            </div>

            <div>
                <label htmlFor="phone" className={labelClass}>Phone Number {req}</label>
                <input id="phone" name="phone" type="tel" placeholder="+968 XX XXX XXXX" required className={inputClass} />
                {e.phone && <p className={errorClass}>{e.phone}</p>}
            </div>

            <div>
                <label htmlFor="email" className={labelClass}>Email {req}</label>
                <input id="email" name="email" type="email" placeholder="contact@company.com" required className={inputClass} />
                {e.email && <p className={errorClass}>{e.email}</p>}
            </div>

            <div>
                <label htmlFor="companyName" className={labelClass}>Legal Name of Company {req}</label>
                <input id="companyName" name="companyName" type="text" placeholder="Acme Contractors Ltd." required className={inputClass} />
                {e.companyName && <p className={errorClass}>{e.companyName}</p>}
            </div>

            <div>
                <label htmlFor="registrationNumber" className={labelClass}>Registration Number (CR) {req}</label>
                <input id="registrationNumber" name="registrationNumber" type="text" placeholder="CR-123456" required className={inputClass} />
                {e.registrationNumber && <p className={errorClass}>{e.registrationNumber}</p>}
            </div>

            <div>
                <label htmlFor="foundingYear" className={labelClass}>Founding Year {req}</label>
                <input id="foundingYear" name="foundingYear" type="number" min={1800} max={2100} placeholder="2005" required className={inputClass} />
                {e.foundingYear && <p className={errorClass}>{e.foundingYear}</p>}
            </div>

            <div>
                <label htmlFor="mainTrades" className={labelClass}>Main Trades / Activities {req}</label>
                <input id="mainTrades" name="mainTrades" type="text" placeholder="Electrical, Plumbing, Civil Works" required className={inputClass} />
                {e.mainTrades && <p className={errorClass}>{e.mainTrades}</p>}
            </div>

            <div>
                <label htmlFor="country" className={labelClass}>Country {req}</label>
                <input id="country" name="country" type="text" placeholder="Oman" required className={inputClass} />
                {e.country && <p className={errorClass}>{e.country}</p>}
            </div>

            <div>
                <label htmlFor="state" className={labelClass}>State / Province {req}</label>
                <input id="state" name="state" type="text" placeholder="Muscat" required className={inputClass} />
                {e.state && <p className={errorClass}>{e.state}</p>}
            </div>

            <div>
                <label htmlFor="city" className={labelClass}>City {req}</label>
                <input id="city" name="city" type="text" placeholder="Muscat" required className={inputClass} />
                {e.city && <p className={errorClass}>{e.city}</p>}
            </div>

            <div>
                <label htmlFor="address" className={labelClass}>Address {req}</label>
                <input id="address" name="address" type="text" placeholder="123 Main St" required className={inputClass} />
                {e.address && <p className={errorClass}>{e.address}</p>}
            </div>

            <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code {req}</label>
                <input id="postalCode" name="postalCode" type="text" placeholder="112" required className={inputClass} />
                {e.postalCode && <p className={errorClass}>{e.postalCode}</p>}
            </div>

            <div>
                <label htmlFor="companyPhone" className={labelClass}>Company Phone Number {req}</label>
                <input id="companyPhone" name="companyPhone" type="tel" placeholder="+968 XX XXX XXXX" required className={inputClass} />
                {e.companyPhone && <p className={errorClass}>{e.companyPhone}</p>}
            </div>

            <div>
                <label htmlFor="ext" className={labelClass}>Ext</label>
                <input id="ext" name="ext" type="text" placeholder="42" className={inputClass} />
            </div>

            <div>
                <label htmlFor="taxId" className={labelClass}>Tax ID {req}</label>
                <input id="taxId" name="taxId" type="text" placeholder="12-3456789" required className={inputClass} />
                {e.taxId && <p className={errorClass}>{e.taxId}</p>}
            </div>

            <div>
                <label htmlFor="documents" className={labelClass}>Company Profile {req}</label>
                <input
                    id="documents"
                    name="documents"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    required
                    className="w-full border border-sah-gray-4 rounded-[5px] px-0 py-0 h-auto text-[13px] text-sah-gray-2 cursor-pointer file:cursor-pointer file:h-full file:py-3 file:px-4 file:me-3 file:rounded-s-[4px] file:border-0 file:text-[13px] file:font-medium file:bg-sah-dark-2 file:text-white hover:file:bg-sah-red file:transition-colors file:duration-300"
                />
                <p className="text-[12px] text-sah-gray-2 mt-1">
                    Drop files here or click to upload. Maximum allowed file size is 50 MB. Allowed Type(s): .pdf, .docx, .doc
                </p>
                {e.documents && <p className={errorClass}>{e.documents}</p>}
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>Description {req}</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Brief description of your company and services..."
                    required
                    className={inputClass}
                />
                {e.description && <p className={errorClass}>{e.description}</p>}
            </div>

            {(state.serverError || clientError) && (
                <p className="text-red-500 text-[13px]">{state.serverError ?? clientError}</p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-medium py-4 transition-colors duration-300 mt-2 cursor-pointer"
            >
                {pending ? (c?.submitting_label || "Submitting...") : (c?.submit_label || "Submit Application")}
            </button>
        </form>
    );
}
