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

                <div className="flex border border-sah-light-3 rounded-sm overflow-hidden border border-sah-light-3 bg-sah-white">
                    <div className="flex flex-col justify-between w-[30%] p-[36px] border-r-1 border-sah-light-3">
                        <div className="flex flex-col">
                            <span className="inline-flex w-fit mb-[24px] text-xs text-sah-black border border-sah-light-1 rounded-full px-[13px] py-[5px]">Architecture</span>
                            <h3 className="font-geist font-semibold text-sah-black text-[30px] leading-[38px]">
                                Police College Package <br /> C SQAPS Nizwa
                            </h3>
                        </div>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-sah-gray-2 text-base text-normal">Handover</span>
                                <span className="font-geist font-semibold text-sah-black text-sm">2021</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sah-gray-2 text-sm">Location</span>
                                <span className="font-geist font-semibold text-sah-black text-sm">Nizwa, Oman</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] min-h-[500px] p-[36px]" />
                </div>
            </div>
        </section>
    );
}
