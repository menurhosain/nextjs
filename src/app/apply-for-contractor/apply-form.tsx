"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submit_contractor_apply, type ApplyContractorFormState } from "@/actions/apply-contractor";

const initialState: ApplyContractorFormState = { errors: {} };

const inputClass = "w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition";
const labelClass = "block text-[13px] font-medium text-sah-dark-2 mb-1";
const errorClass = "text-red-500 text-[12px] mt-1";

export default function ApplyForm() {
    const router = useRouter();
    const [state, formAction, pending] = useActionState(submit_contractor_apply, initialState);

    useEffect(() => {
        if (state.success) router.push("/dashboard");
    }, [state.success, router]);

    const e = state.errors;

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {/* Company name */}
            <div>
                <label htmlFor="companyName" className={labelClass}>
                    Company name <span className="text-red-500">*</span>
                </label>
                <input id="companyName" name="companyName" type="text" placeholder="Acme Contractors Ltd." required className={inputClass} />
                {e.companyName && <p className={errorClass}>{e.companyName}</p>}
            </div>

            {/* Email / Phone */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <label htmlFor="email" className={labelClass}>
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input id="email" name="email" type="email" placeholder="contact@company.com" required className={inputClass} />
                    {e.email && <p className={errorClass}>{e.email}</p>}
                </div>
                <div className="sm:w-1/2">
                    <label htmlFor="phone" className={labelClass}>
                        Phone
                    </label>
                    <input id="phone" name="phone" type="tel" placeholder="+968 XX XXX XXXX" className={inputClass} />
                    {e.phone && <p className={errorClass}>{e.phone}</p>}
                </div>
            </div>

            {/* Experience / Location */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <label htmlFor="experienceYears" className={labelClass}>
                        Years of experience
                    </label>
                    <input id="experienceYears" name="experienceYears" type="number" min={0} max={100} placeholder="5" className={inputClass} />
                    {e.experienceYears && <p className={errorClass}>{e.experienceYears}</p>}
                </div>
                <div className="sm:w-1/2">
                    <label htmlFor="location" className={labelClass}>
                        Location
                    </label>
                    <input id="location" name="location" type="text" placeholder="Muscat, Oman" className={inputClass} />
                    {e.location && <p className={errorClass}>{e.location}</p>}
                </div>
            </div>

            {/* Documents */}
            <div>
                <label htmlFor="documents" className={labelClass}>
                    Documents
                </label>
                <input
                    id="documents"
                    name="documents"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    multiple
                    className="w-full border border-sah-gray-4 rounded-[5px] px-0 py-0 h-auto text-[13px] text-sah-gray-2 cursor-pointer file:cursor-pointer file:h-full file:py-3 file:px-4 file:me-3 file:rounded-s-[4px] file:border-0 file:text-[13px] file:font-medium file:bg-sah-dark-2 file:text-white hover:file:bg-sah-red file:transition-colors file:duration-300"
                />
                <p className="text-[12px] text-sah-gray-2 mt-1">Upload company profile, certifications, or previous work samples.</p>
                {e.documents && <p className={errorClass}>{e.documents}</p>}
            </div>

            {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}

            <button
                type="submit"
                disabled={pending}
                className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-medium py-4 transition-colors duration-300 mt-2 cursor-pointer"
            >
                {pending ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}
