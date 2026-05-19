export default function Map({ embed_url }: { embed_url?: string }) {
  return (
    <section className="w-full h-[715px]">
      <iframe
        src={embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.8398865692!2d-0.2664030556096407!3d51.528739805074714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1778655260093!5m2!1sen!2sbd"}
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
