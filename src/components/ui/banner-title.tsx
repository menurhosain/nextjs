export default function Banner_Title({ subtitle, title }: { subtitle?: string; title: string }) {
    return (
        <>
            {subtitle ? <p className="upper mb-[36px] font-inter font-medium text-base text-base text-sah-white"> </p> : null}
            <h1 className="text-sah-white font-geist font-medium text-[90px] leading-[90px]">{title}</h1>
        </>
    );
}
