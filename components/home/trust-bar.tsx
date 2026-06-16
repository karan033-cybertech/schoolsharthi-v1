import { Calendar, CheckCircle, Globe, Shield } from "lucide-react";

const trustItems = [
  {
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "100% Free for Students",
    subtitle: "No hidden charges, ever.",
  },
  {
    icon: Shield,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Safe & Secure",
    subtitle: "Your data is always protected.",
  },
  {
    icon: Calendar,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    title: "New Opportunities Daily",
    subtitle: "Updated scholarships & programs.",
  },
  {
    icon: Globe,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    title: "Nationwide Access",
    subtitle: "From every corner of India.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-t border-[#E5E7EB] bg-[#FAFAF8] py-5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-around gap-6">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
              >
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">{item.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
