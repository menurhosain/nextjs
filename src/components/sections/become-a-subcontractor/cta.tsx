import Section_Title from "@/components/ui/section-title";
import { ButtonModern } from "@/components/ui/button";

export default function Cta() {
    return (
        <section className="section-padding h-[80vh] md:h-[86vh] relative">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover z-[-1]">
                <source src="/career.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 z-[-1]" />

            <div className="container h-full flex items-end">
                <div className="md:w-[80%] lg:w-[63%] p-[30px] md:p-[50px] xl:p-[100px] bg-[url('/career-content-bg.jpg')] bg-cover bg-top bg-no-repeat">
                    <Section_Title
                        subtitle="Life at Sah"
                        title="Get paid your way"
                        description="Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has established itself as a trusted name in the construction industry, delivering exceptional projects"
                        class_name={{ subtitle: "text-sah-black !mb-[15px]", title: "text-sah-black !mb-[25px]", description: "text-sah-gray-1" }}
                    />
                    <div className="mt-[40px] w-max">
                        <ButtonModern variant="solid" link="#" label="Discover More" />
                    </div>
                </div>
            </div>
        </section>
    );
}
