"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submit_apply } from "@/actions/apply";
import type { ApplyFormState } from "@/actions/apply";

const initialState: ApplyFormState = { errors: {} };

const inputClass =
    "w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition h-auto";
const labelClass = "text-[13px] font-medium text-sah-dark-2 mb-1";
const errorClass = "text-red-500 text-[12px] mt-1";

export default function ApplyForm() {
    const [state, formAction, pending] = useActionState(submit_apply, initialState);
    const e = state.errors;

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {/* First / Last name */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <Label htmlFor="firstName" className={labelClass}>
                        First name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="firstName" name="firstName" placeholder="First Name*" className={inputClass} />
                    {e.firstName && <p className={errorClass}>{e.firstName}</p>}
                </div>
                <div className="sm:w-1/2">
                    <Label htmlFor="lastName" className={labelClass}>
                        Last name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="lastName" name="lastName" placeholder="Last Name*" className={inputClass} />
                    {e.lastName && <p className={errorClass}>{e.lastName}</p>}
                </div>
            </div>

            {/* Email / Phone */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <Label htmlFor="email" className={labelClass}>
                        Email <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="Email Address*" className={inputClass} />
                    {e.email && <p className={errorClass}>{e.email}</p>}
                </div>
                <div className="sm:w-1/2">
                    <Label htmlFor="phone" className={labelClass}>Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+968 XX XXX XXXX" className={inputClass} />
                </div>
            </div>

            {/* CV File */}
            <div>
                <Label htmlFor="cvFile" className={labelClass}>
                    CV / Resume <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="cvFile"
                    name="cvFile"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="w-full border border-sah-gray-4 rounded-[5px] px-0 py-0 h-auto shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-red-500 text-[13px] text-sah-gray-2 cursor-pointer file:cursor-pointer file:h-full file:py-3 file:px-4 file:me-3 file:rounded-s-[4px] file:border-0 file:text-[13px] file:font-medium file:bg-sah-dark-2 file:text-white hover:file:bg-sah-red file:transition-colors file:duration-300"
                />
                {e.cvFile && <p className={errorClass}>{e.cvFile}</p>}
            </div>

            {/* Skills */}
            <div>
                <Label htmlFor="skills" className={labelClass}>Skills</Label>
                <textarea
                    id="skills"
                    name="skills"
                    placeholder="e.g. Project Management, Civil Engineering, AutoCAD..."
                    rows={3}
                    className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition resize-none"
                />
            </div>

            {/* Experience / Location */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <Label htmlFor="experienceYears" className={labelClass}>Years of experience</Label>
                    <Input
                        id="experienceYears"
                        name="experienceYears"
                        type="number"
                        min={0}
                        max={50}
                        placeholder="3"
                        className={inputClass}
                    />
                </div>
                <div className="sm:w-1/2">
                    <Label htmlFor="location" className={labelClass}>Location</Label>
                    <Input id="location" name="location" placeholder="Muscat, Oman" className={inputClass} />
                </div>
            </div>

            {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}

            {state.success && (
                <p className="text-[13px] text-green-600 text-center">Application submitted successfully!</p>
            )}

            <Button
                type="submit"
                disabled={pending}
                className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-medium py-4 h-auto mt-2 cursor-pointer transition-colors duration-300"
            >
                {pending ? "Submitting..." : "Submit Application"}
            </Button>
        </form>
    );
}
