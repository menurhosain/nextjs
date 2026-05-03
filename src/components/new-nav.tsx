export default function NewNav() {
  return (
    <nav className="w-full bg-white">
      <div className="mx-auto flex max-w-[1620px]">
        <div className="w-3/5 bg-blue-200 flex gap-[120px]">
          <div className="px-4 py-4">test Logo</div>
          <div className="flex items-center gap-6 px-4 py-4">
            {["Our Company", "Our Services", "Our Projects", "News", "Careers"].map((link) => (
              <a
                key={link}
                href="#"
                className="uppercase text-white text-base font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="w-2/5 bg-red-200 px-4 py-4">Right</div>
      </div>
    </nav>
  );
}
