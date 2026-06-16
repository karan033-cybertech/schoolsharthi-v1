"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/notes", label: "Notes", icon: BookOpen, exact: false },
  { href: "/admin/opportunities", label: "Opportunities", icon: Trophy, exact: false },
  { href: "/admin/careers", label: "Careers", icon: Briefcase, exact: false },
  { href: "/admin/students", label: "Students", icon: Users, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex h-screen bg-[#FAFAF8]">
      <aside className="flex h-full w-64 shrink-0 flex-col bg-[#111111] text-white">
        <div className="border-b border-white/10 px-5 py-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#D4AF37]" />
            <span className="font-bold tracking-wide">SCHOOLSHARTHI</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[#D4AF37] text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-red-400 transition-colors hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <Link
            href="/"
            className="mt-2 block text-sm text-gray-400 transition-colors hover:text-white"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
