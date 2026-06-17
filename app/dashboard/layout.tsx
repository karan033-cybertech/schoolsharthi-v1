"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Trophy,
  User,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "My Profile", icon: User, exact: false },
  { href: "/notes", label: "Saved Notes", icon: BookOpen, exact: false },
  { href: "/ai-guide", label: "My Questions", icon: MessageSquare, exact: false },
  { href: "/opportunities", label: "Opportunities", icon: Trophy, exact: false },
  { href: "/dashboard", label: "Settings", icon: Settings, exact: false },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Student");
  const [displayClass, setDisplayClass] = useState("");
  const [avatarLetter, setAvatarLetter] = useState("S");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const name = user?.user_metadata?.full_name || "Student";
      const letter = name[0]?.toUpperCase() || "S";
      const className = user?.user_metadata?.class_name || "";
      setDisplayName(name);
      setAvatarLetter(letter);
      setDisplayClass(className);
    }
    loadUser();
  }, []);

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen bg-[#FAFAF8]">
      <aside className="flex h-full w-64 shrink-0 flex-col bg-[#111111] text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              width={36}
              height={36}
              alt="SchoolSharthi Logo"
              className="h-9 w-9 shrink-0 object-contain brightness-110"
            />
            <span className="text-base font-bold text-white">SchoolSharthi</span>
          </Link>
        </div>

        <div className="mx-4 mb-2 mt-5 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-bold text-black">
            {avatarLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{displayName}</p>
            <p className="mt-0.5 text-xs text-gray-400">
              {displayClass ? `Class ${displayClass} · Student` : "Student"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-[#D4AF37] font-semibold text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-3 text-sm text-red-400 transition-colors hover:text-red-300"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
          <Link
            href="/"
            className="mt-2 block text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
