export default  function ChoooseImageCard({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl group ${tall ? "h-full" : "h-full"}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-sah-red/40 transition-all duration-500" />
        </div>
    );
}