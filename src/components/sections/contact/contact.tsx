"use client";

import { useActionState, startTransition } from "react";
import { ContactIcon1, ContactIcon2, ContactIcon3, ContactIcon4 } from "@/components/ui/svgs";
import { submit_contact_form, type ContactFormState } from "@/actions/contact";

type ContactProps = {
    form_title?: string;
    form_subtitle?: string;
    form_submit_label?: string;
    contact_image?: string;
    address_label?: string;
    address_value?: string;
    email_label?: string;
    email_value?: string;
    phone_label?: string;
    phone_value?: string;
    hours_label?: string;
    hours_value?: string;
    placeholder_first_name?: string;
    placeholder_last_name?: string;
    placeholder_email?: string;
    placeholder_phone?: string;
    placeholder_message?: string;
    recaptcha_site_key?: string;
};

export default function Contact({
    form_title,
    form_subtitle,
    form_submit_label,
    contact_image,
    address_label,
    address_value,
    email_label,
    email_value,
    phone_label,
    phone_value,
    hours_label,
    hours_value,
    placeholder_first_name,
    placeholder_last_name,
    placeholder_email,
    placeholder_phone,
    placeholder_message,
    recaptcha_site_key,
}: ContactProps) {
    const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submit_contact_form, { errors: {} });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(recaptcha_site_key ?? "", { action: "contact" }).then(resolve);
            });
        });
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("recaptcha_token", token);
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <section className="section-padding bg-sah-light-4">
            <div className="container flex flex-col lg:flex-row !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                {/* Left: Form Panel */}
                <div className="w-full bg-white lg:max-w-[750px] max-[640px]:px-4 p-10 flex flex-col justify-between rounded-l-[6px] max-[1024]:rounded-t-[6px] rounded-b-[6px] overflow-hidden">
                    {/* Header */}
                    <div className="bg-sah-red max-[640px]:-mx-4 -mx-10 -mt-10 px-4 xl:px-10 pt-[30px] xl:pt-[69px] pb-[30px] xl:pb-[70px] mb-8">
                        <h2 className="text-[26px] sm:text-[36px] 2xl:text-[52px] font-medium text-white leading-[36px] sm:leading-[46px] 2xl:leading-[62px]">
                            {form_title || "Let's Collaborate With Us!"}
                        </h2>
                        <p className="text-red-100 text-[17px] mt-4">{form_subtitle || "Read and update the latest news from us. done eu magna quis felis."}</p>
                    </div>

                    {/* Form / Success */}
                    {state.success ? (
                        <div className="flex flex-col items-start gap-3 py-6">
                            <p className="font-inter text-[24px] font-semibold text-sah-black">Message Sent!</p>
                            <p className="font-inter text-[16px] text-sah-black/60">Thank you for reaching out. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                            <div className="flex max-[640px]:flex-col gap-4">
                                <div className="sm:w-1/2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder={placeholder_first_name || "First Name*"}
                                        className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                                    />
                                    {state.errors.firstName && <p className="text-red-500 text-[12px] mt-1">{state.errors.firstName}</p>}
                                </div>
                                <div className="sm:w-1/2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder={placeholder_last_name || "Last Name*"}
                                        className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                                    />
                                    {state.errors.lastName && <p className="text-red-500 text-[12px] mt-1">{state.errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="flex max-[640px]:flex-col gap-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={placeholder_email || "Email Address"}
                                    className="sm:w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder={placeholder_phone || "Phone"}
                                    className="sm:w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder={placeholder_message || "Write Message*"}
                                    rows={5}
                                    className="w-full border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 resize-none focus:outline-none focus:border-red-500 transition"
                                />
                                {state.errors.message && <p className="text-red-500 text-[12px] mt-1">{state.errors.message}</p>}
                            </div>

                            {state.serverError && <p className="text-red-500 text-[13px]">{state.serverError}</p>}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-sah-dark-2 hover:bg-sah-red disabled:opacity-60 rounded-[5px] text-white text-[14px] font-regular py-4 transition-colors duration-300 mt-2 cursor-pointer"
                            >
                                {isPending ? "Sending..." : form_submit_label || "Message Now"}
                            </button>
                        </form>
                    )}
                </div>

                {/* Right: Image + Info Panel */}

                <div className="w-full relative rounded-r-[6px] rounded-t-[6px]  overflow-hidden max-[1024]:h-[680px] max-[1024]:mt-8">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center max-[640px]:rounded-[6px]"
                        style={{
                            backgroundImage: `url('${contact_image || "/contact-thumb.jpg"}')`,
                        }}
                    />

                    {/* Info Card */}
                    <div className="absolute bottom-2 sm:bottom-5 max-[640px]:left-2 right-2 sm:right-5 grid grid-cols-1 rounded-[6px] overflow-hidden">
                        <div className="backdrop-blur-[21px]  bg-[radial-gradient(152.51%_133.12%_at_50%_39.93%,_#656161_0%,_rgba(0,0,0,0)_100%)] flex flex-col xl:flex-row w-full sm:w-[340px] xl:w-[460px] 2xl:w-[545px] px-[20px] 2xl:px-[45px] pt-[30px] pb-[30px] gap-[20px] 2xl:gap-[40px] rounded-tr-[6px] rounded-tl-[6px]">
                            {/* Office Address */}
                            <div className="flex flex-col gap-[10px] 2xl:gap-3 xl:w-1/2">
                                <div className="text-sah-white mt-0.5 shrink-0">
                                    <ContactIcon1 class_name="!w-[36px] !h-[36px]" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-white mb-0.5">{address_label || "Office Address:"}</p>
                                    <p className="text-[14px] text-sah-white leading-[28px] whitespace-pre-line">{address_value || "P.O. Box 1850, P.C, 112, Ruwi,\nSultanate Of Oman"}</p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col gap-[10px] 2xl:gap-3 xl:w-1/2">
                                <div className="text-sah-white mt-0.5 shrink-0">
                                    <ContactIcon2 class_name="!w-[36px] !h-[36px]" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-white mb-0.5">{email_label || "Email Address:"}</p>
                                    <p className="text-[14px] text-sah-white leading-[28px]">{email_value || "Enquiries@Sah.Om"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-sah-white flex flex-col xl:flex-row w-full sm:w-[340px] xl:w-[460px] 2xl:w-[545px] px-[20px] 2xl:px-[45px] pt-[30px] pb-[30px] gap-[20px] 2xl:gap-[40px]">
                            {/* Phone Number */}
                            <div className="flex flex-col gap-3 xl:w-1/2">
                                <div className="text-sah-black mt-0.5 shrink-0">
                                    <ContactIcon3 class_name="!w-[36px] !h-[36px]" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-dark-2 mb-0.5">{phone_label || "Phone Number:"}</p>
                                    <p className="text-[14px] text-sah-dark-2">{phone_value || "+968 24 70 32 66"}</p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex flex-col gap-3 xl:w-1/2">
                                <div className="text-sah-black  mt-0.5 shrink-0">
                                    <ContactIcon4 class_name="!w-[36px] !h-[36px]" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-dark-2 mb-0.5">{hours_label || "Working Hours:"}</p>
                                    <p className="text-[14px] text-sah-dark-2">{hours_value || "Mon – Fri: 9AM – 8PM"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
