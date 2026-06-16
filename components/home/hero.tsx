"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const popularSearches = [
  "Photosynthesis",
  "Career after 10th",
  "Scholarships",
  "Science Projects",
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/ai-guide?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-[#FDF6EE]">
      <Image
        src="/images/hero-student.png"
        alt="Student studying with books"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6EE]/95 via-[#FDF6EE]/70 to-transparent" />

      <div className="absolute left-0 top-0 flex h-full items-center">
        <div className="flex max-w-xl flex-col justify-center px-8 py-20 md:px-16">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#D4AF37]">
            🇮🇳 India&apos;s #1 Student Platform
          </span>

          <h1
            className="text-[3.2rem] font-bold leading-tight md:text-[4.5rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-[#111111]">Har Student Ka</span>
            <br />
            <span className="whitespace-nowrap text-[#111111]">
              <span className="text-[#D4AF37]">Sachcha</span> Sharthi
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-gray-500">
            SchoolSharthi is here to help you learn better, explore careers,
            find opportunities and achieve your dreams.
          </p>

          <form
            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask anything... (e.g. Photosynthesis kya hai?)"
              className="flex-1 px-4 py-2 text-base text-[#111111] outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#111111] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#333]"
            >
              Search
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-[#D4AF37]">
              Trending:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() =>
                  router.push(`/ai-guide?q=${encodeURIComponent(term)}`)
                }
                className="cursor-pointer rounded-full border border-[#E5E7EB] px-3 py-1.5 text-xs text-gray-600 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
