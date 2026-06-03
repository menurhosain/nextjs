"use client";

import { useActionState, useState } from "react";
import { update_profile } from "@/actions/update-profile";
import type { UpdateProfileFormState } from "@/actions/update-profile";

type Props = {
    defaultValues: {
        firstName: string;
        lastName: string;
        phone: string;
        location: string;
        pictureUrl: string | null;
    };
};

const initialState: UpdateProfileFormState = { errors: {} };

const inputClass =
    "w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition";
const labelClass = "block text-[13px] font-medium text-sah-dark-2 mb-1";
const errorClass = "text-red-500 text-[12px] mt-1";

export default function EditProfileForm({ defaultValues }: Props) {
    const [state, formAction, pending] = useActionState(update_profile, initialState);
    const [preview, setPreview] = useState<string | null>(defaultValues.pictureUrl);
    const e = state.errors;

    function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {/* Profile picture */}
            <div>
                <label htmlFor="profilePicture" className={labelClass}>
                    Profile picture
                </label>
                <div className="flex items-center gap-4 mt-1">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-14 h-14 rounded-full object-cover shrink-0" />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-sah-light-3 flex items-center justify-center text-sah-gray-2 text-[11px] shrink-0">
                            No photo
                        </div>
                    )}
                    <input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="flex-1 border border-sah-gray-4 rounded-[5px] px-0 py-0 h-auto text-[13px] text-sah-gray-2 cursor-pointer file:cursor-pointer file:h-full file:py-3 file:px-4 file:me-3 file:rounded-s-[4px] file:border-0 file:text-[13px] file:font-medium file:bg-sah-dark-2 file:text-white hover:file:bg-sah-red file:transition-colors file:duration-300"
                    />
                </div>
                {e.profilePicture && <p className={errorClass}>{e.profilePicture}</p>}
            </div>

            {/* First / Last name */}
            <div className="flex max-[640px]:flex-col gap-4">
                <div className="sm:w-1/2">
                    <label htmlFor="firstName" className={labelClass}>
                        First name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={defaultValues.firstName}
                        placeholder="First Name*"
                        className={inputClass}
                    />
                    {e.firstName && <p className={errorClass}>{e.firstName}</p>}
                </div>
                <div className="sm:w-1/2">
                    <label htmlFor="lastName" className={labelClass}>
                        Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={defaultValues.lastName}
                        placeholder="Last Name*"
                        className={inputClass}
                    />
                    {e.lastName && <p className={errorClass}>{e.lastName}</p>}
                </div>
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={defaultValues.phone}
                    placeholder="+968 XX XXX XXXX"
                    className={inputClass}
                />
                {e.phone && <p className={errorClass}>{e.phone}</p>}
            </div>

            {/* Location */}
            <div>
                <label htmlFor="location" className={labelClass}>Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    defaultValue={defaultValues.location}
                    placeholder="City, Country"
                    className={inputClass}
                />
                {e.location && <p className={errorClass}>{e.location}</p>}
            </div>

            {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}

            {/* Actions */}
            <div className="flex max-[640px]:flex-col gap-3 mt-2">
                <button
                    type="submit"
                    disabled={pending}
                    className="flex-1 bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-medium py-4 transition-colors duration-300 cursor-pointer"
                >
                    {pending ? "Saving..." : "Save Changes"}
                </button>
                <button
                    type="button"
                    onClick={() => history.back()}
                    className="flex-1 border border-sah-gray-4 hover:border-sah-dark-2 rounded-[5px] text-sah-dark-2 text-[14px] font-medium py-4 transition-colors duration-300 cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
