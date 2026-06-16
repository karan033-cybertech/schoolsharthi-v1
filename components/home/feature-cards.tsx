import Link from "next/link";
import { BookOpen, Bot, Compass, Trophy } from "lucide-react";

const features = [
  {
    icon: Bot,
    iconBg: "bg-blue-100",
    iconColor: "#3B82F6",
    title: "AI Study Assistant",
    description: "Ko bhi doubt pucho, turant samjho AI ke saath.",
    buttonText: "Ask Now →",
    buttonClass: "text-blue-600 border-blue-200 hover:bg-blue-50",
    href: "/ai-guide",
  },
  {
    icon: BookOpen,
    iconBg: "bg-green-100",
    iconColor: "#10B981",
    title: "Notes Hub",
    description: "Class-wise, subject-wise notes aur revision material.",
    buttonText: "Explore Notes →",
    buttonClass: "text-green-600 border-green-200 hover:bg-green-50",
    href: "/notes",
  },
  {
    icon: Compass,
    iconBg: "bg-purple-100",
    iconColor: "#8B5CF6",
    title: "Career Guide",
    description: "Apne interest ke hisaab se best career options jaano.",
    buttonText: "Explore Careers →",
    buttonClass: "text-purple-600 border-purple-200 hover:bg-purple-50",
    href: "/careers",
  },
  {
    icon: Trophy,
    iconBg: "bg-yellow-100",
    iconColor: "#D4AF37",
    title: "Opportunities Hub",
    description: "Scholarships, olympiads, competitions aur schemes ek jagah.",
    buttonText: "View Opportunities →",
    buttonClass: "text-yellow-600 border-yellow-200 hover:bg-yellow-50",
    href: "/opportunities",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-[#FAFAF8] px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className="text-4xl font-bold text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Need to
            <br />
            <span className="text-[#D4AF37]">Succeed</span> in School
          </h2>
          <p className="mt-3 text-base text-gray-500">
            From AI tutoring to career guidance — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg}`}
              >
                <feature.icon
                  className="h-6 w-6"
                  style={{ color: feature.iconColor }}
                />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">{feature.title}</h3>
              <p className="mb-4 mt-2 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className={`inline-block rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${feature.buttonClass}`}
              >
                {feature.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
