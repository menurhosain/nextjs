"use client";

import { useState } from "react";
import { ContactIcon1 ,ContactIcon2 ,ContactIcon3 ,ContactIcon4 } from "@/components/ui/svgs";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <section className="bg-sah-light-4">
            <div className="container flex !px-[50px] pt-[50px] lg:pt-[150px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
                {/* Left: Form Panel */}
                <div className="w-full bg-white md:max-w-[750px] p-10 flex flex-col justify-between rounded-l-[6px] rounded-b-[6px] overflow-hidden">
                    {/* Header */}
                    <div className="bg-sah-red -mx-10 -mt-10 px-10 pt-[69px] pb-[70px] mb-8">
                        <h2 className="text-[52px] font-medium text-white leading-[62px]">Let's Collaborate With Us!</h2>
                        <p className="text-red-100 text-[17px] mt-4">Read and update the latest news from us. done eu magna quis felis.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name*"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name*"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                            />
                        </div>

                        <div className="flex gap-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-1/2 border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 focus:outline-none focus:border-red-500 transition"
                            />
                        </div>

                        <textarea
                            name="message"
                            placeholder="Write Message*"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="border border-sah-gray-4 rounded-[5px] px-4 py-3 text-[14px] text-gray-700 placeholder-sah-gray-1 resize-none focus:outline-none focus:border-red-500 transition"
                        />

                        <button
                            type="submit"
                            className="w-full bg-sah-dark-2 hover:bg-sah-red rounded-[5px] text-white text-[14px] font-regular py-4 transition-colors duration-300 mt-2 cursor-pointer"
                        >
                            Message Now
                        </button>
                    </form>
                </div>

                {/* Right: Image + Info Panel */}
                <div className="w-full relative rounded-r-[6px] rounded-t-[6px]  overflow-hidden">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/contact-thumb.jpg')",
                        }}
                    />

                    {/* Info Card */}
                    <div className="absolute bottom-5 right-5 grid grid-cols-1 rounded-[6px] overflow-hidden">
                        <div className="backdrop-blur-[21px] bg-[radial-gradient(152.51%_133.12%_at_50%_39.93%,_#656161_0%,_rgba(0,0,0,0)_100%)] flex w-[545px] px-[45px] pt-[30px] pb-[30px] gap-[40px] rounded-tr-[6px] rounded-tl-[6px]">
                            {/* Office Address */}
                            <div className="flex flex-col gap-3 w-1/2">
                                <div className="text-sah-white mt-0.5 shrink-0">
                                    <ContactIcon1 class_name="!w-[36px] !h-[36px]"/>
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-white mb-0.5">Office Address:</p>
                                    <p className="text-[14px] text-sah-white leading-[28px]">
                                        P.O. Box 1850, P.C, 112, Ruwi,
                                        <br />
                                        Sultanate Of Oman
                                    </p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col gap-3 w-1/2">
                                <div className="text-sah-white mt-0.5 shrink-0">
                                    <ContactIcon2 class_name="!w-[36px] !h-[36px]"/>
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-white mb-0.5">Email Address:</p>
                                    <p className="text-[14px] text-sah-white leading-[28px]">Enquiries@Sah.Om</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-sah-white flex w-[545px] px-[45px] pt-[30px] pb-[30px] gap-[40px]">
                            {/* Phone Number */}
                            <div className="flex flex-col gap-3 w-1/2">
                                <div className="text-sah-black mt-0.5 shrink-0">
                                    <ContactIcon3 class_name="!w-[36px] !h-[36px]"/>
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-dark-2 mb-0.5">Phone Number:</p>
                                    <p className="text-[14px] text-sah-dark-2">+968 24 70 32 66</p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex flex-col gap-3 w-1/2">
                                <div className="text-sah-black  mt-0.5 shrink-0">
                                    <ContactIcon4 class_name="!w-[36px] !h-[36px]"/>
                                </div>
                                <div>
                                    <p className="text-[16px] font-medium text-sah-dark-2 mb-0.5">Working Hours:</p>
                                    <p className="text-[14px] text-sah-dark-2">Mon – Fri: 9AM – 8PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

