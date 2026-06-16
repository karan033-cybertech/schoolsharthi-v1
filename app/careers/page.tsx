"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Send } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import CareerCard from "@/components/careers/career-card";

const CAREER_CHIPS = [
  "After 10th kya kare? 🎓",
  "Science ya Commerce? 📚",
  "NEET ki taiyari kaise kare? 🏥",
  "Engineer banne ke liye kya kare? ⚙️",
  "Arts mein scope hai? 🎨",
];

const CAREERS = [
    {
      id: "1",
      slug: "doctor",
      name: "Doctor",
      overview:
        "Doctor banna sirf ek profession nahi — yeh ek zimmedari hai. Aap logon ki jaan bachate ho, unhe takleef se nikaalte ho aur unke parivaar ko umeed dete ho. India mein healthcare sector tezi se grow kar raha hai aur qualified doctors ki demand har saal badh rahi hai — chahe government hospital ho, private clinic ho ya abroad opportunities.",
      skills: [
        "Biology & Chemistry",
        "Patient Communication",
        "Critical Thinking",
        "Empathy & Patience",
        "Decision Making Under Pressure",
        "Medical Ethics",
      ],
      roadmap: [
        "Class 11th mein Science stream lo — PCB (Physics, Chemistry, Biology) zaroori hai",
        "Class 12th mein minimum 50% marks laao (SC/ST ke liye 40%)",
        "NEET UG ki serious taiyari shuru karo — daily 6-8 ghante padho",
        "NEET qualify karke MBBS mein admission lo (Govt college prefer karo — fees kam hoti hai)",
        "5.5 saal MBBS complete karo jisme 1 saal internship bhi shamil hai",
        "MD/MS ya koi specialization karo agar aage badhna ho",
        "Apna clinic shuru karo ya hospital mein join karo",
      ],
      exams: ["NEET UG", "AIIMS MBBS", "JIPMER", "NEET PG", "USMLE (USA ke liye)"],
      future_scope:
        "India mein 2030 tak 20 lakh se zyada doctors ki zarurat hogi. Specializations jaise Cardiology, Neurology, Oncology mein ₹50 LPA+ tak ki earnings possible hai. Abroad (UK, USA, Australia, Gulf) mein Indian doctors ki bohot demand hai. Sarkari naukri mein bhi stability aur respect dono milti hai.",
      duration: "5.5 Years (MBBS) + Internship",
      salary: "₹6 LPA – ₹50 LPA+",
      field: "Medical & Healthcare",
      growth: "High",
    },
    {
      id: "2",
      slug: "engineer",
      name: "Engineer",
      overview:
        "Engineering ek aisi field hai jahan aap apni creativity aur technical knowledge se real-world problems solve karte ho. Bridges banao, software likho, robots design karo, ya satellites launch karo — engineering ki koi seema nahi. India duniya ka top engineering talent supplier hai aur IIT, NIT se lekar state colleges tak — career opportunities bahut hain.",
      skills: [
        "Mathematics & Physics",
        "Logical & Analytical Thinking",
        "Programming & Coding",
        "Problem Solving",
        "Teamwork & Communication",
        "Domain-Specific Technical Skills",
      ],
      roadmap: [
        "Class 11th mein Science stream lo — PCM (Physics, Chemistry, Maths) zaroori hai",
        "Class 12th mein 75%+ marks laao JEE ke liye",
        "JEE Main + JEE Advanced ki taiyari karo — Coaching ya self-study dono work karte hain",
        "B.Tech (4 saal) karo apni preferred branch mein — CS, Mechanical, Civil, Electrical etc.",
        "Internships karo 2nd ya 3rd year se — practical experience bohot important hai",
        "Campus placement ya GATE se M.Tech/PSU job ya abroad Masters karo",
      ],
      exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "MHT-CET", "GATE (postgrad ke liye)"],
      future_scope:
        "Software Engineering mein freshers ko ₹6-20 LPA aur experienced ko ₹50 LPA+ milta hai. AI, ML, Data Science, Cybersecurity — ye naye fields hain jahan demand explosive hai. Google, Microsoft, Amazon jaise companies mein Indian engineers kaam karte hain. Civil, Mechanical engineers ke liye government jobs (PWD, Railways, ISRO, DRDO) bhi excellent option hain.",
      duration: "4 Years (B.Tech)",
      salary: "₹4 LPA – ₹50 LPA+",
      field: "Technology & Infrastructure",
      growth: "Very High",
    },
    {
      id: "3",
      slug: "scientist",
      name: "Scientist",
      overview:
        "Agar aapko 'kyun' aur 'kaise' jaanna pasand hai — toh Science aapka field hai. Scientists duniya ko samajhte hain aur naye solutions dhundhte hain. ISRO ke rockets se lekar cancer ki dawai tak — sab kuch scientists ki mehnat ka result hai. India mein research culture tezi se badh raha hai aur government funding bhi increase ho rahi hai.",
      skills: [
        "Deep Subject Knowledge (Physics/Chemistry/Biology/Maths)",
        "Research & Experimentation",
        "Data Analysis",
        "Scientific Writing",
        "Curiosity & Patience",
        "Critical Thinking",
      ],
      roadmap: [
        "Class 11-12 mein Science stream lo — apni pasand ki field identify karo",
        "BSc (3 saal) karo — Physics, Chemistry, Biology, Maths ya Computer Science mein",
        "MSc (2 saal) karo — specialization shuru hoti hai yahan se",
        "PhD karo (4-5 saal) — ye research ka asli phase hai",
        "Post-doctoral fellowship karo India ya abroad mein",
        "Government research institutes (ISRO, DRDO, CSIR, BARC) ya university professor bano",
      ],
      exams: ["JEST", "CSIR NET/JRF", "GATE", "JAM (IIT MSc)", "IISER Aptitude Test", "BARC OCES"],
      future_scope:
        "ISRO, DRDO, CSIR, DAE, DBT — ye sab government institutes hain jahan scientists ko ₹8-25 LPA milta hai + perks. IIT/IISc professors ko ₹15-40 LPA. Pharmaceutical companies, biotech firms mein research scientists ki demand hai. Abroad mein PhD ke baad ₹50-80 LPA equivalent stipend milta hai.",
      duration: "5-8 Years (BSc + MSc + PhD)",
      salary: "₹5 LPA – ₹25 LPA",
      field: "Research & Development",
      growth: "Moderate-High",
    },
    {
      id: "4",
      slug: "teacher",
      name: "Teacher",
      overview:
        "Teacher woh insaan hota hai jo poori zindagi kisi ke andar roshni jalata hai. Ek achha teacher hazaron students ki zindagi badal sakta hai. India mein 15 lakh se zyada schools hain aur qualified teachers ki bohot kami hai — especially rural areas mein. Ye ek stable, respected aur meaningful career hai.",
      skills: [
        "Subject Expertise",
        "Communication & Explanation",
        "Patience & Empathy",
        "Classroom Management",
        "Lesson Planning",
        "Motivating Students",
      ],
      roadmap: [
        "Class 12th ke baad apni pasand ka subject choose karo",
        "BA/BSc/BCom (3 saal) graduation karo us subject mein",
        "B.Ed (2 saal) karo — teacher training degree zaroori hai",
        "TET (Teacher Eligibility Test) clear karo — state aur central dono",
        "Government school mein apply karo ya private school join karo",
        "Experience ke baad Principal ya education department mein promotion",
      ],
      exams: ["CTET (Central)", "REET (Rajasthan)", "UPTET", "HTET", "KVS/NVS Recruitment", "State TET"],
      future_scope:
        "Government teacher ki salary 7th Pay Commission ke baad ₹35,000-80,000/month ho gayi hai. KVS, NVS, Sainik School mein excellent packages hain. Private schools mein bhi ₹3-8 LPA mil raha hai cities mein. EdTech (online teaching) mein top teachers ₹10-30 LPA kama rahe hain. Ye career rural areas mein bhi equally valuable hai.",
      duration: "5 Years (Grad + B.Ed)",
      salary: "₹3 LPA – ₹12 LPA",
      field: "Education",
      growth: "Stable",
    },
    {
      id: "5",
      slug: "army-officer",
      name: "Army Officer",
      overview:
        "Indian Army Officer banna ek aisi zindagi chunna hai jo sirf career nahi — ek mission hai. Desh ki raksha, border pe duty, disaster relief, aur leadership — ye sab ek army officer ki zimmedari hai. Ye career physically demanding hai lekin izzat, stability aur adventure — teeno milte hain. Har saal lakhs apply karte hain aur sirf best select hote hain.",
      skills: [
        "Physical Fitness & Stamina",
        "Leadership & Decision Making",
        "Mental Toughness",
        "Discipline & Punctuality",
        "Team Management",
        "Patriotism & Integrity",
      ],
      roadmap: [
        "Class 12th ke baad NDA (National Defence Academy) exam do — 10+2 ke baad apply kar sakte ho",
        "NDA written exam clear karo (Maths + General Ability)",
        "SSB (Service Selection Board) interview clear karo — 5 din ka process hai",
        "NDA Academy Pune mein 3 saal training karo",
        "IMA Dehradun ya equivalent academy se commissioning",
        "Lieutenant ke rank se career shuru hota hai aur Colonel, General tak jaata hai",
      ],
      exams: ["NDA (10+2 ke baad)", "CDS (Graduation ke baad)", "AFCAT (Air Force)", "Indian Navy SSR/AA", "TES (Technical Entry Scheme)"],
      future_scope:
        "Army Officer ko salary ke saath free housing, medical, canteen, travel allowance milta hai. Total package ₹15-30 LPA equivalent hota hai with perks. Retirement ke baad CAPF, PSU, security firms mein excellent opportunities hain. Ex-servicemen ko government jobs mein reservation milta hai. Desh seva ke saath ek adventurous aur purposeful life milti hai.",
      duration: "3 Years Training (NDA) + Service",
      salary: "₹8 LPA – ₹20 LPA + Perks",
      field: "Defence & Security",
      growth: "Stable & Respected",
    },
    {
      id: "6",
      slug: "chartered-accountant",
      name: "Chartered Accountant",
      overview:
        "CA (Chartered Accountant) India ke sabse prestigious professional degrees mein se ek hai. Har company ko — chhoti ho ya badi — ek CA ki zarurat hoti hai taxes, audits, financial planning ke liye. CA ki demand kabhi kam nahi hoti aur ek experienced CA ki income kisi bhi engineer ya MBA se zyada ho sakti hai. ICAI ka certificate globally recognized hai.",
      skills: [
        "Accounting & Taxation",
        "Financial Analysis",
        "Attention to Detail",
        "Mathematics & Statistics",
        "Business Law Knowledge",
        "Analytical & Logical Thinking",
      ],
      roadmap: [
        "Class 12th Commerce stream se karo — Accounts, Economics, Maths important hain",
        "CA Foundation exam do — Class 12 ke baad register karo ICAI mein",
        "CA Intermediate (2 papers, 8 subjects) — 8 months study ke baad attempt",
        "3 saal Articleship (Practical Training) karo kisi CA firm mein",
        "CA Final exam do — sabse tough level, but is ke baad tum qualified CA ho",
        "Job ya apna practice shuru karo — dono mein excellent earning hai",
      ],
      exams: ["CA Foundation", "CA Intermediate (Group 1 & 2)", "CA Final (Group 1 & 2)", "ICAI Exams (May & November)"],
      future_scope:
        "Fresh CA ko ₹7-12 LPA milta hai. 5 saal experience ke baad ₹20-40 LPA normal hai. Big 4 firms (Deloitte, PwC, EY, KPMG) mein ₹15-50 LPA. CFO position tak ₹1 Cr+ possible hai. Apna practice shuru karo toh unlimited earning. International opportunities — ACCA certification se UK, USA, Canada mein kaam kar sakte ho.",
      duration: "4-5 Years",
      salary: "₹7 LPA – ₹1 Cr+",
      field: "Finance & Accounts",
      growth: "High",
    },
];

export default function CareersPage() {
  const [careerQuestion, setCareerQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleAskAI = () => {
    if (careerQuestion.trim()) {
      router.push(`/ai-guide?q=${encodeURIComponent(careerQuestion.trim())}`);
    }
  };

  const filteredCareers = CAREERS.filter((career) =>
    career.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF6EE]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold text-[#111111] md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Career Guide
          </h1>
          <p className="mt-2 text-gray-600">
            Apne interest ke hisaab se best career options explore karo
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-[#F8F7F4] p-6">
          <p className="border-l-4 border-[#D4AF37] pl-4 text-gray-700">
            Apna sahi career chunna zaroori hai. Har career ka ek roadmap hai —
            bas sahi direction chahiye.
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/20 px-3 py-1.5 text-xs font-semibold text-[#D4AF37]">
                🤖 AI Career Counselor
              </span>
              <h2
                className="mt-3 text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Career se related koi bhi sawaal pucho
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-400">
                After 10th kya kare? After 12th kaun sa stream lu? Doctor banu ya
                Engineer? Koi bhi career doubt — AI turant jawab dega Hindi ya
                Hinglish mein.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CAREER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setCareerQuestion(chip)}
                    className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-gray-300 transition-all hover:bg-white/20 hover:text-white"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={careerQuestion}
                  onChange={(e) => setCareerQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAskAI();
                  }}
                  placeholder="Career se related sawaal pucho..."
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#D4AF37] md:w-80"
                />
                <button
                  type="button"
                  onClick={handleAskAI}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-black transition-all hover:bg-yellow-400"
                >
                  <Send className="h-4 w-4" />
                  Ask AI
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500 md:text-left">
                ✓ Free · ✓ Hindi/Hinglish · ✓ Turant Jawab
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search careers..."
            className="w-full rounded-xl border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCareers.length === 0 ? (
            <p className="col-span-full py-8 text-center text-gray-500">
              Koi career nahi mili. Search change karke dekho.
            </p>
          ) : (
            filteredCareers.map((career) => (
            <CareerCard
              key={career.slug}
              career={{
                slug: career.slug,
                name: career.name,
                overview: career.overview,
                duration: career.duration,
                growth: career.growth,
              }}
            />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
