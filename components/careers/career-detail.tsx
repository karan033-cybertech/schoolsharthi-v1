"use client";

import Link from "next/link";
import { useState } from "react";
import CareerImage from "@/components/careers/career-image";
import {
  Briefcase,
  Clock,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { Career } from "@/types";

export type CareerExam = {
  name: string;
  description: string;
  borderColor: string;
};

export type CareerStats = {
  duration: string;
  avgSalary: string;
  field: string;
  growth: string;
};

export type CareerDetailData = Omit<Career, "exams"> & {
  exams: CareerExam[];
  stats: CareerStats;
  placeholderColor: string;
};

export type CareerTab =
  | "overview"
  | "skills"
  | "roadmap"
  | "exams"
  | "future";

const TABS: { id: CareerTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills Required" },
  { id: "roadmap", label: "Roadmap" },
  { id: "exams", label: "Exams" },
  { id: "future", label: "Future Scope" },
];

export const CAREERS: CareerDetailData[] = [
  {
    id: "1",
    slug: "doctor",
    name: "Doctor",
    overview:
      "Doctor ek noble profession hai jahan aap logon ki health improve karte ho. MBBS ke baad aap hospital, clinic ya apna practice kar sakte ho. Rural India mein doctors ki bahut zaroorat hai — aap apne gaanv aur sheher dono mein farq la sakte ho.",
    skills: [
      "Biology & Chemistry",
      "Empathy & Communication",
      "Problem Solving",
      "Patience",
      "Attention to Detail",
      "Teamwork",
    ],
    roadmap: [
      "Class 12 mein PCB (Physics, Chemistry, Biology) lo",
      "NEET exam clear karo",
      "MBBS (5.5 years) complete karo",
      "Internship (1 year) karo",
      "Specialization ya practice shuru karo (MD/MS optional)",
    ],
    exams: [
      {
        name: "NEET-UG",
        description: "Medical college admission ke liye national level exam",
        borderColor: "border-blue-500",
      },
      {
        name: "NEET-PG",
        description: "Post-graduation (MD/MS) ke liye entrance exam",
        borderColor: "border-green-500",
      },
      {
        name: "AIIMS",
        description: "Premier medical institutes ke liye separate exam",
        borderColor: "border-purple-500",
      },
    ],
    future_scope:
      "Healthcare sector India mein fastest growing fields mein se ek hai. Telemedicine, medical research, public health aur rural healthcare mein naye opportunities badh rahe hain. AI-assisted diagnosis aur personalized medicine future mein aur scope badhayenge.",
    stats: {
      duration: "5.5 Years (MBBS) + Internship",
      avgSalary: "₹6 LPA – ₹20 LPA",
      field: "Medical & Healthcare",
      growth: "High (Always in Demand)",
    },
    placeholderColor: "bg-red-400",
  },
  {
    id: "2",
    slug: "engineer",
    name: "Engineer",
    overview:
      "Engineer technology aur innovation se duniya badalte hain. Software, mechanical, civil, electrical — har field mein engineers ki demand hai. B.Tech ke baad IT companies, startups ya government sector mein kaam kar sakte ho.",
    skills: [
      "Mathematics & Physics",
      "Logical Thinking",
      "Coding (for CS/IT)",
      "Problem Solving",
      "Creativity",
      "Team Collaboration",
    ],
    roadmap: [
      "Class 12 mein PCM (Physics, Chemistry, Maths) lo",
      "JEE Main / State Engineering Entrance clear karo",
      "B.Tech (4 years) complete karo",
      "Internship ya projects karo",
      "Job ya M.Tech / higher studies",
    ],
    exams: [
      {
        name: "JEE Main",
        description: "NITs aur IIITs ke liye national entrance exam",
        borderColor: "border-blue-500",
      },
      {
        name: "JEE Advanced",
        description: "IITs ke liye advanced level exam",
        borderColor: "border-orange-500",
      },
      {
        name: "BITSAT",
        description: "BITS Pilani campuses ke liye entrance exam",
        borderColor: "border-green-500",
      },
    ],
    future_scope:
      "Technology sector mein engineers ki demand continuously badh rahi hai. AI, Machine Learning, Renewable Energy, Space Tech aur Cybersecurity jaise fields mein bahut scope hai. Remote work aur global opportunities bhi available hain.",
    stats: {
      duration: "4 Years (B.Tech)",
      avgSalary: "₹4 LPA – ₹25 LPA",
      field: "Technology",
      growth: "Very High",
    },
    placeholderColor: "bg-blue-500",
  },
  {
    id: "3",
    slug: "scientist",
    name: "Scientist",
    overview:
      "Scientist research aur discovery ke through naye knowledge create karte hain. Physics, Chemistry, Biology ya Mathematics mein deep study karke aap ISRO, DRDO, universities ya private R&D labs mein kaam kar sakte ho.",
    skills: [
      "Research Methodology",
      "Analytical Thinking",
      "Subject Expertise",
      "Curiosity",
      "Data Analysis",
      "Scientific Writing",
    ],
    roadmap: [
      "Class 12 mein Science stream (PCM ya PCB) lo",
      "B.Sc degree (3 years) complete karo",
      "M.Sc ya integrated program karo",
      "PhD ya research fellowship (optional but recommended)",
      "Research institute ya industry mein scientist bano",
    ],
    exams: [
      {
        name: "JEE / CUET",
        description: "Top science colleges ke liye entrance exams",
        borderColor: "border-indigo-500",
      },
      {
        name: "CSIR-NET",
        description: "Research fellowship aur lectureship ke liye",
        borderColor: "border-purple-500",
      },
      {
        name: "GATE",
        description: "M.Tech aur PSU jobs ke liye exam",
        borderColor: "border-green-500",
      },
    ],
    future_scope:
      "India mein space research (ISRO), defence research (DRDO), biotechnology aur climate science mein government aur private dono sector mein opportunities hain. Global collaborations aur startup ecosystem research scientists ke liye naye raaste khol rahe hain.",
    stats: {
      duration: "5-8 Years (BSc+PhD)",
      avgSalary: "₹5 LPA – ₹18 LPA",
      field: "Research & Development",
      growth: "Moderate",
    },
    placeholderColor: "bg-purple-500",
  },
  {
    id: "4",
    slug: "teacher",
    name: "Teacher",
    overview:
      "Teacher students ki life shape karte hain aur knowledge pass karte hain. School, college ya coaching institute mein padha kar aap next generation ko empower kar sakte ho. Teaching ek stable aur respected career hai.",
    skills: [
      "Subject Knowledge",
      "Communication",
      "Patience",
      "Leadership",
      "Empathy",
      "Classroom Management",
    ],
    roadmap: [
      "Graduation apne subject mein complete karo",
      "B.Ed (Bachelor of Education) karo",
      "CTET / State TET exam clear karo",
      "School ya college mein apply karo",
      "Experience ke saath senior roles aur specialization",
    ],
    exams: [
      {
        name: "CTET",
        description: "Central government schools ke liye eligibility test",
        borderColor: "border-blue-500",
      },
      {
        name: "State TET",
        description: "State government schools ke liye teacher eligibility",
        borderColor: "border-green-500",
      },
      {
        name: "KVS / NVS",
        description: "Kendriya Vidyalaya aur Navodaya recruitment exam",
        borderColor: "border-orange-500",
      },
    ],
    future_scope:
      "EdTech boom ke saath online teaching, content creation aur hybrid classrooms mein naye roles aa rahe hain. Government schemes se school education budget badh raha hai. Experienced teachers coaching, curriculum design aur educational leadership mein bhi ja sakte hain.",
    stats: {
      duration: "4-5 Years (Grad+B.Ed)",
      avgSalary: "₹3 LPA – ₹10 LPA",
      field: "Education",
      growth: "Stable",
    },
    placeholderColor: "bg-green-500",
  },
  {
    id: "5",
    slug: "army-officer",
    name: "Army Officer",
    overview:
      "Army Officer desh ki raksha karte hain aur leadership dikhate hain. NDA ya CDS ke through aap Indian Army, Navy ya Air Force mein officer ban sakte ho. Ye career discipline, adventure aur national service ka unique combination hai.",
    skills: [
      "Physical Fitness",
      "Leadership",
      "Discipline",
      "Courage",
      "Teamwork",
      "Strategic Thinking",
    ],
    roadmap: [
      "Class 12 pass karo (Science/Arts dono eligible — exam ke hisaab se)",
      "NDA / CDS / AFCAT exam clear karo",
      "SSB Interview pass karo",
      "Training academy mein training complete karo (3 years approx)",
      "Commissioned Officer ke roop mein serve karo",
    ],
    exams: [
      {
        name: "NDA",
        description: "Class 12 ke baad Army, Navy, Air Force ke liye",
        borderColor: "border-green-700",
      },
      {
        name: "CDS",
        description: "Graduation ke baad tri-services officer entry",
        borderColor: "border-red-600",
      },
      {
        name: "AFCAT",
        description: "Indian Air Force officer entry ke liye",
        borderColor: "border-blue-600",
      },
    ],
    future_scope:
      "Defence sector mein stable career hai pension aur benefits ke saath. Post-retirement corporate security, administration aur government roles mein transition common hai. Technical branches mein specialized training aur growth opportunities available hain.",
    stats: {
      duration: "3 Years Training",
      avgSalary: "₹8 LPA – ₹20 LPA",
      field: "Defence",
      growth: "Stable",
    },
    placeholderColor: "bg-green-700",
  },
  {
    id: "6",
    slug: "ca",
    name: "Chartered Accountant",
    overview:
      "Chartered Accountant (CA) finance, audit aur taxation ke expert hote hain. Har company ko CA ki zaroorat hoti hai — aap Big 4 firms, banks, corporates ya apna practice kar sakte ho. CA ek highly respected aur well-paying career hai.",
    skills: [
      "Accounting",
      "Analytical Skills",
      "Attention to Detail",
      "Business Understanding",
      "Ethics",
      "Communication",
    ],
    roadmap: [
      "Class 12 pass karo (Commerce preferred, any stream OK)",
      "CA Foundation register karo aur clear karo",
      "CA Intermediate (both groups) clear karo",
      "Articleship (3 years practical training) complete karo",
      "CA Final clear karke ICAI se membership lo",
    ],
    exams: [
      {
        name: "CA Foundation",
        description: "CA course ka pehla level — Class 12 ke baad",
        borderColor: "border-yellow-500",
      },
      {
        name: "CA Intermediate",
        description: "Do groups ka exam — theory aur practical knowledge",
        borderColor: "border-orange-500",
      },
      {
        name: "CA Final",
        description: "Last level — CA banne ke liye final exam",
        borderColor: "border-[#D4AF37]",
      },
    ],
    future_scope:
      "Finance sector mein CA ki demand hamesha high rehti hai. GST, international taxation, forensic audit aur financial consulting mein specialized roles badh rahe hain. Global certifications (CPA, ACCA) ke saath international opportunities bhi mil sakti hain.",
    stats: {
      duration: "4-5 Years",
      avgSalary: "₹7 LPA – ₹30 LPA",
      field: "Finance & Accounts",
      growth: "High",
    },
    placeholderColor: "bg-[#D4AF37]",
  },
];

export function getCareerBySlug(slug: string): CareerDetailData | undefined {
  return CAREERS.find((career) => career.slug === slug);
}

function getTagline(overview: string): string {
  const firstSentence = overview.split(/[.!?]/)[0]?.trim();
  return firstSentence ? `${firstSentence}.` : overview;
}

type CareerDetailProps = {
  career: CareerDetailData;
};

export default function CareerDetail({ career }: CareerDetailProps) {
  const [activeTab, setActiveTab] = useState<CareerTab>("overview");

  return (
    <div>
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/careers" className="hover:text-[#111111]">
          Career Guide
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#111111]">{career.name}</span>
      </nav>

      <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div>
          <h1
            className="text-4xl font-bold text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {career.name}
          </h1>
          <p className="mt-3 italic text-gray-500">
            {getTagline(career.overview)}
          </p>
        </div>
        <CareerImage
          slug={career.slug}
          name={career.name}
          placeholderColor={career.placeholderColor}
        />
      </div>

      <div className="mb-8 border-b border-[#E5E7EB]">
        <div className="flex flex-wrap gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-[#D4AF37] text-[#D4AF37]"
                  : "text-gray-500 hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        {activeTab === "overview" && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Overview
            </h2>
            <p className="leading-relaxed text-gray-600">{career.overview}</p>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#D4AF37] px-3 py-1 text-sm text-[#D4AF37]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2
              className="mb-6 text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Roadmap
            </h2>
            <div className="space-y-0">
              {career.roadmap.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    {index < career.roadmap.length - 1 && (
                      <div className="my-1 w-0.5 flex-1 bg-[#D4AF37]/40" />
                    )}
                  </div>
                  <p className="pb-6 pt-1 text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Exams
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {career.exams.map((exam) => (
                <Link
                  key={exam.name}
                  href={`/ai-guide?q=${encodeURIComponent(`Tell me about ${exam.name}`)}`}
                  className={`rounded-xl border border-[#E5E7EB] border-l-4 p-4 transition-all hover:shadow-md ${exam.borderColor}`}
                >
                  <h3 className="font-bold text-[#111111]">{exam.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {exam.description}
                  </p>
                  <p className="mt-2 text-xs text-[#D4AF37]">
                    Click to know more →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "future" && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Future Scope
            </h2>
            <p className="leading-relaxed text-gray-600">
              {career.future_scope}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Clock,
            label: "Duration",
            value: career.stats.duration,
            iconColor: "text-blue-500",
          },
          {
            icon: Wallet,
            label: "Avg Salary",
            value: career.stats.avgSalary,
            iconColor: "text-green-500",
          },
          {
            icon: Briefcase,
            label: "Field",
            value: career.stats.field,
            iconColor: "text-purple-500",
          },
          {
            icon: TrendingUp,
            label: "Growth",
            value: career.stats.growth,
            iconColor: "text-[#D4AF37]",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#E5E7EB] bg-white p-4"
          >
            <stat.icon className={`mb-2 h-5 w-5 ${stat.iconColor}`} />
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {stat.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export type SlugCareerTabData = {
  slug: string;
  name: string;
  overview: string;
  skills: string[];
  roadmap: string[];
  exams: string[];
  future_scope: string;
  salary: string;
  growth: string;
};

type CareerSlugTabPanelProps = {
  career: SlugCareerTabData;
  examBorder: string;
};

const SLUG_TABS: { id: CareerTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills Required" },
  { id: "roadmap", label: "Roadmap" },
  { id: "exams", label: "Exams" },
  { id: "future", label: "Future Scope" },
];

export function CareerSlugTabPanel({ career, examBorder }: CareerSlugTabPanelProps) {
  const [activeTab, setActiveTab] = useState<CareerTab>("overview");

  return (
    <>
      <nav className="sticky top-[64px] z-40 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-1 overflow-x-auto px-4">
          {SLUG_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm transition-all hover:text-[#111111] ${
                activeTab === tab.id
                  ? "border-[#D4AF37] font-semibold text-[#D4AF37]"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {activeTab === "overview" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <h2
              className="text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {career.overview}
            </p>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <h2
              className="text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Skills Required
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {career.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] p-4"
                >
                  <span className="font-medium text-[#111111]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <h2
              className="text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Roadmap to Success
            </h2>
            <div className="relative mt-8 ml-4 border-l-2 border-[#D4AF37]/30 pl-8">
              {career.roadmap.map((step, index) => (
                <div key={step} className="relative pb-8 last:pb-0">
                  <div className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="font-medium text-[#111111]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <h2
              className="text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Exams to Prepare
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {career.exams.map((exam) => (
                <Link
                  key={exam}
                  href={`/ai-guide?q=${encodeURIComponent(`Tell me about ${exam}`)}`}
                  className={`rounded-xl border border-[#E5E7EB] border-l-4 bg-[#F8F7F4] p-4 transition-all hover:shadow-md ${examBorder}`}
                >
                  <h3 className="font-semibold text-[#111111]">{exam}</h3>
                  <p className="mt-2 text-xs text-[#D4AF37]">
                    Click to know more →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "future" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <h2
              className="text-xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Future Scope
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {career.future_scope}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] p-4 text-center">
                <p className="text-sm text-gray-500">Salary Range</p>
                <p className="mt-1 text-sm font-bold text-[#D4AF37]">
                  {career.salary}
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] p-4 text-center">
                <p className="text-sm text-gray-500">Growth</p>
                <p className="mt-1 text-sm font-bold text-green-600">
                  {career.growth}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
