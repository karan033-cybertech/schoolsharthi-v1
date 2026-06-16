"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Award,
  Calculator,
  Calendar,
  FlaskConical,
  IndianRupee,
  Landmark,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import type { OpportunityType } from "@/types";

type OpportunityItem = {
  id: string;
  title: string;
  type: OpportunityType;
  description: string;
  class_range: string;
  deadline: string;
  icon: "trophy" | "flask" | "award" | "calculator" | "indian-rupee" | "landmark";
  color: "yellow" | "blue" | "green" | "purple" | "orange" | "red";
};

const OPPORTUNITIES: OpportunityItem[] = [
  {
    id: "1",
    title: "INSPIRE Award – MANAK 2024",
    type: "competition",
    description: "India's top science project competition for school students. Show your innovation and get recognized at national level.",
    class_range: "Class 6 – 12",
    deadline: "30 June 2024",
    icon: "trophy",
    color: "yellow",
  },
  {
    id: "2",
    title: "National Science Olympiad (NSO)",
    type: "olympiad",
    description: "Science olympiad for students from Class 1 to 12. Test your science knowledge and compete nationally.",
    class_range: "Class 1 – 12",
    deadline: "31 July 2024",
    icon: "flask",
    color: "blue",
  },
  {
    id: "3",
    title: "Merit-cum-Means Scholarship",
    type: "scholarship",
    description: "Scholarship for meritorious students from economically weaker sections. Up to ₹12,000 per year.",
    class_range: "Class 11 – 12",
    deadline: "20 Aug 2024",
    icon: "award",
    color: "green",
  },
  {
    id: "4",
    title: "International Maths Olympiad (IMO)",
    type: "olympiad",
    description: "World's most prestigious mathematics competition for school students. Represent India internationally.",
    class_range: "Class 1 – 12",
    deadline: "15 Sep 2024",
    icon: "calculator",
    color: "purple",
  },
  {
    id: "5",
    title: "PM Scholarship Scheme",
    type: "scholarship",
    description: "Government scholarship for students whose parents are ex-servicemen. ₹2500/month for boys, ₹3000/month for girls.",
    class_range: "Class 11 – 12",
    deadline: "31 Oct 2024",
    icon: "indian-rupee",
    color: "orange",
  },
  {
    id: "6",
    title: "Pradhan Mantri Yuva Yojana",
    type: "government",
    description: "Government program for young entrepreneurs and innovators. Get mentorship, training and funding support.",
    class_range: "Class 9 – 12",
    deadline: "Open",
    icon: "landmark",
    color: "red",
  },
];

const FILTER_PILLS = [
  { label: "All", value: "all" },
  { label: "Scholarships", value: "scholarship" },
  { label: "Olympiads", value: "olympiad" },
  { label: "Competitions", value: "competition" },
  { label: "Government Schemes", value: "government" },
] as const;

const ICON_MAP = {
  trophy: Trophy,
  flask: FlaskConical,
  award: Award,
  calculator: Calculator,
  "indian-rupee": IndianRupee,
  landmark: Landmark,
};

const COLOR_STYLES: Record<OpportunityItem["color"], string> = {
  yellow: "bg-yellow-50 text-yellow-500",
  blue: "bg-blue-50 text-blue-500",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-500",
  orange: "bg-orange-50 text-orange-500",
  red: "bg-red-50 text-red-500",
};

const TYPE_BADGE_STYLES: Record<OpportunityType, string> = {
  scholarship: "bg-green-50 text-green-600 border border-green-200",
  olympiad: "bg-blue-50 text-blue-600 border border-blue-200",
  competition: "bg-purple-50 text-purple-600 border border-purple-200",
  government: "bg-orange-50 text-orange-600 border border-orange-200",
};

const TYPE_LABELS: Record<OpportunityType, string> = {
  scholarship: "Scholarship",
  olympiad: "Olympiad",
  competition: "Competition",
  government: "Government Scheme",
};

const HEADER_STATS = [
  { value: "300+", label: "Opportunities" },
  { value: "Updated", label: "Daily" },
  { value: "100%", label: "Free" },
];

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeParam && FILTER_PILLS.some((pill) => pill.value === typeParam)) {
      setSelectedType(typeParam);
    }
  }, [typeParam]);

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter((opp) => {
      const typeMatch = selectedType === "all" || opp.type === selectedType;
      const searchMatch =
        searchQuery.trim() === "" ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <header className="border-b border-[#E5E7EB] bg-white px-8 py-10 text-center">
        <h1
          className="text-4xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Opportunities Hub
        </h1>
        <p className="mt-2 text-gray-500">
          Scholarships, competitions, olympiads aur schemes ek jagah
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {HEADER_STATS.map((stat, index) => (
            <span key={stat.value} className="flex items-center gap-6">
              {index > 0 && <span className="text-gray-300">|</span>}
              <span>
                <span className="font-bold text-[#D4AF37]">{stat.value}</span>
                <span className="ml-1 text-gray-500">{stat.label}</span>
              </span>
            </span>
          ))}
        </div>
      </header>

      <div className="mx-4 my-6 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm md:mx-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTER_PILLS.map((pill) => (
              <button
                key={pill.value}
                type="button"
                onClick={() => setSelectedType(pill.value)}
                className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                  selectedType === pill.value
                    ? "bg-[#D4AF37] font-medium text-white"
                    : "border border-[#E5E7EB] text-gray-600 hover:border-[#D4AF37]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunities..."
              className="w-full rounded-xl border border-[#E5E7EB] py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      <div className="mx-4 pb-12 md:mx-8">
        {filteredOpportunities.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            Koi opportunity nahi mili. Filter ya search change karke dekho.
          </p>
        ) : (
          filteredOpportunities.map((opp) => {
            const Icon = ICON_MAP[opp.icon];
            return (
              <article
                key={opp.id}
                className="mb-4 flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:shadow-md"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${COLOR_STYLES[opp.color]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center">
                    <h3 className="text-base font-semibold text-[#111111]">
                      {opp.title}
                    </h3>
                    <span
                      className={`ml-2 rounded-full px-3 py-0.5 text-xs font-medium ${TYPE_BADGE_STYLES[opp.type]}`}
                    >
                      {TYPE_LABELS[opp.type]}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {opp.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Star className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {opp.class_range}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      Last Date: {opp.deadline}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/ai-guide?q=${encodeURIComponent(opp.title)}`}
                  className="shrink-0 whitespace-nowrap rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
                >
                  View Details →
                </Link>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 text-sm mt-3">Loading...</p>
          </div>
        </div>
      }
    >
      <OpportunitiesContent />
    </Suspense>
  );
}