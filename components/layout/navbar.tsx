"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ai-guide", label: "AI Assistant" },
  { href: "/notes", label: "Notes" },
  { href: "/careers", label: "Career Guide" },
  { href: "/opportunities", label: "Opportunities" },
];

const moreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    if (isMoreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMoreOpen]);

  useEffect(() => {
    setIsMoreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-[#D4AF37] ${
      isActive(href)
        ? "border-b-2 border-[#D4AF37] pb-0.5 text-[#D4AF37]"
        : "text-[#111111]"
    }`;

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white"
      style={{ borderColor: "#E5E7EB" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            width={48}
            height={48}
            alt="SchoolSharthi Logo"
            priority
            className="shrink-0 object-contain"
          />
          <div>
            <p className="text-sm font-bold tracking-wide text-[#111111] md:text-base">
              SCHOOLSHARTHI
            </p>
            <p className="text-xs text-gray-500">Har Student Ka Sachcha Sharthi</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="text-sm font-medium text-[#111111] transition-colors hover:text-[#D4AF37]"
            >
              More
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-[#E5E7EB] bg-white py-2 shadow-lg">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-[#FAFAF8] hover:text-[#111111]"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-[#111111] transition-colors hover:bg-gray-50"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/login"
            className="rounded-full border px-5 py-2 text-sm font-medium text-[#111111] transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB" }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#111111] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-[#111111] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="border-t px-4 py-4 lg:hidden"
          style={{ borderColor: "#E5E7EB" }}
        >
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={linkClass(link.href)}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div
            className="mt-4 flex flex-col gap-3 border-t pt-4"
            style={{ borderColor: "#E5E7EB" }}
          >
            <Link
              href="/login"
              className="rounded-full border px-5 py-2 text-sm font-medium text-[#111111]"
              style={{ borderColor: "#E5E7EB" }}
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#111111] px-5 py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
