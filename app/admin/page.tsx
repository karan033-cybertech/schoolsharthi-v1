"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Briefcase, Trophy, Users } from "lucide-react";

const STATS = [
  {
    label: "Total Notes",
    value: "24",
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Opportunities",
    value: "6",
    icon: Trophy,
    iconBg: "bg-yellow-50",
    iconColor: "text-[#D4AF37]",
  },
  {
    label: "Careers",
    value: "6",
    icon: Briefcase,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    label: "Students",
    value: "10K+",
    icon: Users,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
];

const RECENT_ACTIVITY = [
  "📚 New note added: Life Processes — 2 hours ago",
  "🏆 Opportunity updated: INSPIRE Award — 5 hours ago",
  "👤 New student registered — 1 day ago",
  "📝 Career updated: Doctor — 2 days ago",
  "🎯 New opportunity: NSO 2024 — 3 days ago",
];

const QUICK_ACTIONS = [
  {
    label: "+ Add Note",
    href: "/admin/notes",
    className: "bg-blue-50 text-blue-600 border border-blue-200",
  },
  {
    label: "+ Add Opportunity",
    href: "/admin/opportunities",
    className: "bg-green-50 text-green-600 border border-green-200",
  },
  {
    label: "+ Add Career",
    href: "/admin/careers",
    className: "bg-purple-50 text-purple-600 border border-purple-200",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div>
      <header className="border-b border-[#E5E7EB] bg-white px-8 py-6">
        <h1
          className="text-2xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </header>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
            >
              <div
                className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <p className="text-3xl font-bold text-[#111111]">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="font-bold text-[#111111]">Recent Activity</h2>
          <ul className="mt-4">
            {RECENT_ACTIVITY.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-[#F3F4F6] py-3 text-sm text-gray-600 last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-[#111111]">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => router.push(action.href)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 ${action.className}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
