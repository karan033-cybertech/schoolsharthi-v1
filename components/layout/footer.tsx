import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  explore: [
    { href: "/", label: "Home" },
    { href: "/notes", label: "Notes" },
    { href: "/careers", label: "Careers" },
    { href: "/opportunities", label: "Opportunities" },
  ],
  learn: [
    { href: "/ai-guide", label: "AI Guide" },
    { href: "/notes", label: "Notes" },
    { href: "/careers", label: "Careers" },
    { href: "/opportunities", label: "Scholarships" },
  ],
  support: [
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/images/logo.png"
                width={36}
                height={36}
                alt="SchoolSharthi Logo"
                className="shrink-0 object-contain"
              />
              <span className="font-bold tracking-wide">SCHOOLSHARTHI</span>
            </div>
            <p className="text-sm" style={{ color: "#D4AF37" }}>
              Har Student Ka Sachcha Sharthi
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Empowering every school student with quality education, career
              guidance, and opportunities.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Learn</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 border-t pt-6 text-center text-sm text-gray-500"
          style={{ borderColor: "#333333" }}
        >
          <p>&copy; {new Date().getFullYear()} SchoolSharthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
