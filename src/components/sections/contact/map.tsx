export default function Map() {
    return (
        <section className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[715px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14624.681552066902!2d58.543568900000004!3d23.59822145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91f9ce5dede987%3A0xa26b2ac852a89fec!2sRuwi%2C%20Muscat%20112%2C%20Oman!5e0!3m2!1sen!2sbd!4v1779348704341!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
            ></iframe>
        </section>
    );
}
