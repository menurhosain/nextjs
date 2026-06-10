"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submit_apply } from "@/actions/apply";
import type { ApplyFormState } from "@/actions/apply";
import type { ApplyPageContent } from "@/services/apply_recrutement.service";

const initialState: ApplyFormState = { errors: {} };

const inputClass =
    "w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-sah-dark-2 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition h-auto";

const fileInputClass =
    "w-full border border-sah-gray-4 rounded-[5px] px-0 py-0 h-auto shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-red-500 text-[13px] text-sah-gray-2 cursor-pointer file:cursor-pointer file:h-full file:py-3 file:px-4 file:me-3 file:rounded-s-[4px] file:border-0 file:text-[13px] file:font-medium file:bg-sah-dark-2 file:text-white hover:file:bg-sah-red file:transition-colors file:duration-300";

const labelClass = "text-[13px] font-medium text-sah-dark-2 mb-2";
const errorClass = "text-red-500 text-[12px] mt-1";
const hintClass = "text-[11px] text-gray-400 mt-1";

type Props = { content: ApplyPageContent | null; jobSlug?: string };

export default function ApplyForm({ content: c, jobSlug }: Props) {
    const [state, formAction, pending] = useActionState(submit_apply, initialState);
    const e = state.errors;

    return (
        <form action={formAction} className="flex flex-col gap-5">
            {jobSlug && <input type="hidden" name="jobSlug" value={jobSlug} />}

            {/* Full Name */}
            <div>
                <Label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                </Label>
                <Input id="fullName" name="fullName" placeholder="e.g. John Smith" className={inputClass} />
                {e.fullName && <p className={errorClass}>{e.fullName}</p>}
            </div>

            {/* Current Location */}
            <div>
                <Label htmlFor="currentLocation" className={labelClass}>
                    Current Location <span className="text-red-500">*</span>
                </Label>
                <Input id="currentLocation" name="currentLocation" placeholder="e.g. Muscat, Oman" className={inputClass} />
                {e.currentLocation && <p className={errorClass}>{e.currentLocation}</p>}
            </div>

            {/* Experience in GCC */}
            <div>
                <Label htmlFor="gccExperience" className={labelClass}>
                    Experience in GCC <span className="text-red-500">*</span>
                </Label>
                <select
                    id="gccExperience"
                    name="gccExperience"
                    defaultValue=""
                    className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-sah-dark-2 focus:outline-none focus:border-red-500 transition bg-white appearance-none"
                >
                    <option value="" disabled className="text-gray-400">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                {e.gccExperience && <p className={errorClass}>{e.gccExperience}</p>}
            </div>

            {/* Email */}
            <div>
                <Label htmlFor="email" className={labelClass}>
                    {c?.label_email || "Email"} <span className="text-red-500">*</span>
                </Label>
                <Input id="email" name="email" type="email" placeholder={c?.placeholder_email || "e.g. john@example.com"} className={inputClass} />
                {e.email && <p className={errorClass}>{e.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <Label htmlFor="phone" className={labelClass}>
                    {c?.label_phone || "Phone"} <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder={c?.placeholder_phone || "e.g. +968 99 123 456"} className={inputClass} />
                {e.phone && <p className={errorClass}>{e.phone}</p>}
            </div>

            {/* Years of Experience */}
            <div>
                <Label htmlFor="experienceYears" className={labelClass}>
                    {c?.label_experience_years || "Years of Experience"} <span className="text-red-500">*</span>
                </Label>
                <Input id="experienceYears" name="experienceYears" type="number" min={0} max={50} placeholder={c?.placeholder_experience_years || "e.g. 5"} className={inputClass} />
                {e.experienceYears && <p className={errorClass}>{e.experienceYears}</p>}
            </div>

            {/* Nationality */}
            <div>
                <Label htmlFor="nationality" className={labelClass}>
                    Nationality <span className="text-red-500">*</span>
                </Label>
                <Input id="nationality" name="nationality" placeholder="e.g. Omani" className={inputClass} />
                {e.nationality && <p className={errorClass}>{e.nationality}</p>}
            </div>

            {/* Photo */}
            <div>
                <Label htmlFor="photo" className={labelClass}>
                    Photo <span className="text-red-500">*</span>
                </Label>
                <Input id="photo" name="photo" type="file" accept=".jpg,.jpeg,.png" className={fileInputClass} />
                <p className={hintClass}>Max 10 MB &middot; Allowed: .jpg, .jpeg, .png</p>
                {e.photo && <p className={errorClass}>{e.photo}</p>}
            </div>

            {/* CV */}
            <div>
                <Label htmlFor="cv" className={labelClass}>
                    {c?.label_cv || "CV"} <span className="text-red-500">*</span>
                </Label>
                <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className={fileInputClass} />
                <p className={hintClass}>Max 25 MB &middot; Allowed: .pdf, .doc, .docx</p>
                {e.cv && <p className={errorClass}>{e.cv}</p>}
            </div>

            {/* Cover Letter */}
            <div>
                <Label htmlFor="coverLetter" className={labelClass}>
                    Cover Letter
                </Label>
                <Input id="coverLetter" name="coverLetter" type="file" accept=".pdf,.doc,.docx" className={fileInputClass} />
                <p className={hintClass}>Optional &middot; Max 25 MB &middot; Allowed: .pdf, .doc, .docx</p>
                {e.coverLetter && <p className={errorClass}>{e.coverLetter}</p>}
            </div>

            {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}
            {state.success && <p className="text-[13px] text-green-600 text-center">{c?.success_message || "Application submitted successfully!"}</p>}

            <Button
                type="submit"
                disabled={pending}
                className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-medium py-4 h-auto mt-2 cursor-pointer transition-colors duration-300"
            >
                {pending ? c?.submitting_label || "Submitting..." : c?.submit_label || "Submit Application"}
            </Button>
        </form>
    );
}
