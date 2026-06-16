import Link from "next/link";
import {
  Award,
  BookOpen,
  Building2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";

const quickLinks = [
  {
    label: "After 10th",
    href: "/opportunities",
    icon: GraduationCap,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "After 12th",
    href: "/opportunities",
    icon: Award,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    label: "Top Scholarships",
    href: "/opportunities",
    icon: BookOpen,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Olympiads List",
    href: "/opportunities",
    icon: Trophy,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    label: "Government Schemes",
    href: "/opportunities",
    icon: Building2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    label: "Science Project Ideas",
    href: "/opportunities",
    icon: FlaskConical,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
];

export default function OpportunitySpotlight() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center">
              <h2 className="text-2xl font-bold text-[#111111]">
                Today&apos;s Opportunity{" "}
                <span className="text-[#D4AF37]">Spotlight</span>
              </h2>
              <span className="ml-2 animate-pulse rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                New
              </span>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#FDF6EE] to-white p-6 shadow-sm">
              <div className="relative mb-4 inline-block">
                <Trophy className="h-16 w-16 text-[#D4AF37]" />
                <span className="absolute -left-2 top-0 h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="absolute -right-2 top-1 h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="absolute -bottom-1 left-2 h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="absolute -right-1 bottom-0 h-2 w-2 rounded-full bg-[#D4AF37]" />
              </div>

              <h3 className="text-xl font-bold text-[#111111]">
                INSPIRE Award – MANAK 2024
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                India&apos;s top science project competition for school students.
                Show your innovation and get recognized at national level.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>For Class 6 – 12 Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>Last Date: 30 June 2024</span>
                </div>
              </div>

              <Link
                href="/opportunities"
                className="mt-4 block w-full rounded-xl bg-[#111111] px-6 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-gray-800"
              >
                View Details →
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-[#111111]">Quick Links</h2>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border-b border-[#F3F4F6] px-2 py-3.5 transition-all hover:bg-[#FAFAF8]"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${link.iconBg}`}
                    >
                      <link.icon className={`h-4 w-4 ${link.iconColor}`} />
                    </span>
                    <span className="text-sm font-medium text-[#111111]">
                      {link.label}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400 transition-all group-hover:text-[#D4AF37]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
