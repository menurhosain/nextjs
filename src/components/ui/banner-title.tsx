export default function Banner_Title({ subtitle, title }: { subtitle?: string; title: any }) {
    return (
        <>
            {subtitle ? <p className="uppercase font-inter mb-[20px] font-semibold leading-[24px] tracking-[0%] text-[14px] md:text-[16px] text-sah-white"> {subtitle} </p> : null}
            <h1 className="text-sah-white font-geist font-medium text-[32px] sm:text-[40px] xl:text-[56px] 2xl:text-[80px] leading-[1.3] xl:leading-[70px] 2xl:leading-[94px]">{title}</h1>
        </>
    );
}
