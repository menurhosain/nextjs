import Image from "next/image";
import Section_Title from "@/components/ui/section-title";

export default function Projects() {
    return (
        <section className="py-[140px] section-padding bg-sah-light-4">
            <div className="container">
                <div className="mb-[70px]">
                    <Section_Title
                        subtitle="Latest Projects"
                        title=<>
                            Discover Our Completed <br /> Building Projects
                        </>
                        class_name={{ subtitle: "sah-black text-center", title: "sah-black text-center" }}
                    />
                </div>

                <div className="group flex border border-sah-light-3 rounded-sm overflow-hidden border border-sah-light-3 bg-sah-white">
                    <div className="flex flex-col justify-between w-[30%] p-[36px] border-r-1 border-sah-light-3 transition-colors duration-300 group-hover:bg-sah-red">
                        <div className="flex flex-col">
                            <span className="inline-flex w-fit mb-[24px] text-base font-medium text-sah-black border border-sah-light-1 rounded-full px-[13px] py-[5px] transition-colors duration-300 group-hover:text-sah-white group-hover:border-sah-white/30">
                                Architecture
                            </span>
                            <h3 className="font-geist font-semibold text-sah-black text-[30px] leading-[38px] mb-[30px] transition-colors duration-300 group-hover:text-sah-white">
                                Police College Package <br /> C SQAPS Nizwa
                            </h3>
                            <p className="font-inter text-[18px] font-normal leading-[30px] text-sah-black transition-colors duration-300 group-hover:text-sah-white">
                                Construction & engineering combine expertise, innovation, and precision to deliver safe, durable, and efficient structures{" "}
                            </p>
                        </div>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1 text-base font-inter font-medium leading-[24px]">
                                <span className="text-sah-gray-2 transition-colors duration-300 group-hover:text-sah-white/70">Handover</span>
                                <span className="text-sah-black transition-colors duration-300 group-hover:text-sah-white">2021</span>
                            </div>
                            <div className="flex flex-col gap-1 text-base font-inter font-medium leading-[24px]">
                                <span className="text-sah-gray-2 transition-colors duration-300 group-hover:text-sah-white/70">Location</span>
                                <span className="text-sah-black transition-colors duration-300 group-hover:text-sah-white">Nizwa, Oman</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] min-h-[500px] p-[36px] md:pl-[80px]">
                        <div className="relative w-full h-full">
                            <Image src="/project-1.jpg" alt="Police College Package C SQAPS Nizwa" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
