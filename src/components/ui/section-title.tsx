type SectionTitleClassNames = {
    subtitle?: string;
    title?: string;
    description?: string;
};

export default function Section_Title({
    subtitle,
    title,
    description,
    class_name = {
        subtitle: "text-sah-white",
        title: "text-sah-white",
        description: "text-sah-white",
    },
}: {
    subtitle?: string;
    title: any;
    description?: string;
    class_name?: SectionTitleClassNames;
}) {
    return (
        <>
            {subtitle ? <p className={`text-[16px] font-medium tracking-widest uppercase mb-[28px] font-inter ${class_name.subtitle}`}>[ {subtitle} ] ↓</p> : null}
            <h2 className={`font-geist mb-[40px] font-medium text-[30px] sm:text-[40px] lg:text-[50px] xl:text-[90px] lg:leading-[60px] xl:leading-[90px] ${class_name.title}`}>{title}</h2>
            <p className={`font-geist font-normal  text-[16px] leading-[28px] ${class_name.description}`}>{description}</p>
        </>
    );
}
