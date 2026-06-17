"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calculator,
  Calendar,
  Compass,
  Flame,
  MessageSquare,
  Stethoscope,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
type DashboardProfile = {
  full_name: string;
  class_name: string;
  school: string;
};

const RECENT_ACTIVITY = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    text: "Saved note: Life Processes",
    time: "2 hours ago",
    badge: "Notes",
    badgeClass: "bg-blue-50 text-blue-600",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    text: "Asked AI: Photosynthesis kya hai?",
    time: "5 hours ago",
    badge: "AI Guide",
    badgeClass: "bg-purple-50 text-purple-600",
  },
  {
    icon: Trophy,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    text: "Applied for: INSPIRE Award 2024",
    time: "1 day ago",
    badge: "Opportunity",
    badgeClass: "bg-[#FDF6EE] text-[#D4AF37]",
  },
  {
    icon: Compass,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    text: "Explored career: Doctor",
    time: "2 days ago",
    badge: "Career",
    badgeClass: "bg-green-50 text-green-600",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [savedNotesCount, setSavedNotesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = profile?.full_name || "Student";
  const displayClass = profile?.class_name || "";
  const avatarLetter =
    profile?.full_name?.[0]?.toUpperCase() || "S";

  const welcomeDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile({
          full_name: profileData?.full_name || user.user_metadata?.full_name || "Student",
          class_name: profileData?.class_name || user.user_metadata?.class_name || "",
          school: profileData?.school || "",
        });

        const { count } = await supabase
          .from("saved_notes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        setSavedNotesCount(count ?? 0);
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
          <p className="mt-3 text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-auto bg-[#FAFAF8]">
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-[#111111]">My Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            {welcomeDate} · Welcome back, {displayName.split(" ")[0]}! 👋
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] transition-colors hover:bg-white"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-sm font-bold text-black">
            {avatarLetter}
          </div>
        </div>
      </header>

      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] text-2xl font-bold text-black ring-4 ring-[#D4AF37]/20">
                {avatarLetter}
              </div>
              <Link
                href="/dashboard/profile"
                className="rounded-xl border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#FAFAF8]"
              >
                Edit Profile
              </Link>
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#111111]">{displayName}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {displayClass && (
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                  Class {displayClass}
                </span>
              )}
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
                Student
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Passionate about Science & Technology
            </p>
            <div className="mt-4 border-t border-[#F3F4F6]" />
            <div className="mt-4 flex gap-4">
              <span className="rounded-lg bg-[#FAFAF8] px-3 py-1 text-xs text-gray-600">
                📚 Science
              </span>
              <span className="rounded-lg bg-[#FAFAF8] px-3 py-1 text-xs text-gray-600">
                🔢 Maths
              </span>
            </div>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">{savedNotesCount}</p>
                  <p className="mt-1 text-sm text-gray-500">Notes Saved</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 border-t border-[#F3F4F6] pt-3">
                <p className="flex items-center gap-1 text-xs font-medium text-green-500">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +3 this week
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">18</p>
                  <p className="mt-1 text-sm text-gray-500">Questions Asked</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 border-t border-[#F3F4F6] pt-3">
                <p className="flex items-center gap-1 text-xs font-medium text-green-500">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +5 this week
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">5</p>
                  <p className="mt-1 text-sm text-gray-500">Opportunities Applied</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF6EE]">
                  <Trophy className="h-5 w-5 text-[#D4AF37]" />
                </div>
              </div>
              <div className="mt-4 border-t border-[#F3F4F6] pt-3">
                <p className="text-xs font-medium text-orange-500">2 pending</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">7</p>
                  <p className="mt-1 text-sm text-gray-500">Days Active</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
              </div>
              <div className="mt-4 border-t border-[#F3F4F6] pt-3">
                <p className="text-xs font-medium text-orange-500">🔥 Keep it up!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-[#111111]">Continue Learning</h2>
                <p className="mt-1 text-xs text-gray-400">Pick up where you left off.</p>
              </div>
              <Link
                href="/notes"
                className="text-sm text-[#D4AF37] hover:underline"
              >
                View All Notes →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-4 transition-all hover:border-[#D4AF37]/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#111111]">Life Processes</p>
                  <p className="mt-0.5 text-xs text-gray-400">Science · Class 10</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[#E5E7EB]">
                    <div className="h-1.5 w-[60%] rounded-full bg-[#D4AF37]" />
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-[#D4AF37]">60%</span>
              </div>

              <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-4 transition-all hover:border-[#D4AF37]/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <Calculator className="h-5 w-5 text-orange-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#111111]">Trigonometry</p>
                  <p className="mt-0.5 text-xs text-gray-400">Maths · Class 11</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[#E5E7EB]">
                    <div className="h-1.5 w-[35%] rounded-full bg-[#D4AF37]" />
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-[#D4AF37]">35%</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#111111]">Recommended for You</h2>
            <p className="mt-1 text-xs text-gray-400">Based on your interests.</p>

            <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#FDF6EE] to-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 p-2 text-yellow-500">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">
                  INSPIRE Award – MANAK 2024
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Deadline: 30 June 2024
                </p>
                <Link
                  href="/opportunities"
                  className="mt-2 inline-block text-xs font-medium text-[#D4AF37] hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 p-2 text-blue-500">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Doctor</p>
                <p className="text-xs text-gray-500">Based on your Science interest</p>
                <Link
                  href="/careers/doctor"
                  className="mt-2 inline-block text-xs font-medium text-blue-500 hover:underline"
                >
                  Explore Career →
                </Link>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 p-2 text-green-500">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">
                  Human Eye and Colourful World
                </p>
                <p className="text-xs text-gray-500">Science · Class 10</p>
                <Link
                  href="/notes"
                  className="mt-2 inline-block text-xs font-medium text-green-500 hover:underline"
                >
                  Read Now →
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#111111]">Recent Activity</h2>
            <span className="rounded-full border border-[#E5E7EB] bg-[#FAFAF8] px-3 py-1 text-xs text-gray-500">
              Today
            </span>
          </div>

          <ul className="mt-4">
            {RECENT_ACTIVITY.map((item) => (
              <li
                key={item.text}
                className="flex cursor-pointer items-center gap-4 rounded-xl border-b border-[#F3F4F6] px-2 py-3.5 transition-all last:border-0 hover:bg-[#FAFAF8]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                >
                  <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#111111]">{item.text}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{item.time}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${item.badgeClass}`}
                >
                  {item.badge}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
