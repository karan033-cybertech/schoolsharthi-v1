import { TrendingUp } from "lucide-react";

const stats = [
  { value: "10K+", label: "Students Learning" },
  { value: "500+", label: "Study Materials" },
  { value: "300+", label: "Opportunities" },
  { value: "50+", label: "Careers Explored" },
];

export default function StatsBar() {
  return (
    <section className="px-4 md:px-8">
      <div className="mx-auto my-6 max-w-7xl rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-1 items-center">
              {index > 0 && (
                <div className="mx-4 hidden h-12 w-px bg-[#E5E7EB] md:block" />
              )}
              <div className="flex flex-1 flex-col px-6 py-5 text-center md:text-left">
                <p className="text-3xl font-bold text-[#111111]">
                  {stat.value}
                  <TrendingUp className="ml-1 inline h-4 w-4 text-green-500" />
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
              {index < stats.length - 1 && (
                <div className="mx-6 block h-px w-auto bg-[#E5E7EB] md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
