import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { CareerSlugTabPanel } from "@/components/careers/career-detail";
import {
  Briefcase,
  ChevronRight,
  Clock,
  TrendingUp,
  Wallet,
} from "lucide-react";

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

type Career = (typeof CAREERS)[number];

const CAREER_THEME: Record<string, { gradient: string; examBorder: string }> = {
  doctor: { gradient: "from-red-50 to-white", examBorder: "border-red-400" },
  engineer: { gradient: "from-blue-50 to-white", examBorder: "border-blue-400" },
  scientist: { gradient: "from-purple-50 to-white", examBorder: "border-purple-400" },
  teacher: { gradient: "from-green-50 to-white", examBorder: "border-green-400" },
  "army-officer": { gradient: "from-slate-50 to-white", examBorder: "border-slate-400" },
  "chartered-accountant": {
    gradient: "from-amber-50 to-white",
    examBorder: "border-amber-400",
  },
};

function getTagline(overview: string): string {
  const firstSentence = overview.split(/[.!?]/)[0]?.trim();
  return firstSentence ? `${firstSentence}.` : overview;
}

function getCareerTheme(slug: string) {
  return (
    CAREER_THEME[slug] ?? {
      gradient: "from-gray-50 to-white",
      examBorder: "border-gray-400",
    }
  );
}

function DecorativeDots() {
  return (
    <div
      className="pointer-events-none absolute right-6 top-6 grid grid-cols-4 gap-2 opacity-20"
      aria-hidden
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="h-2 w-2 rounded-full bg-[#D4AF37]"
        />
      ))}
    </div>
  );
}

function CareerPageContent({ career }: { career: Career }) {
  const theme = getCareerTheme(career.slug);
  const tagline = getTagline(career.overview);

  const heroStats = [
    { label: "Duration", value: career.duration },
    { label: "Avg Salary", value: career.salary },
    { label: "Field", value: career.field },
    { label: "Growth", value: career.growth },
  ];

  const statsBar = [
    {
      icon: Clock,
      label: "Duration",
      value: career.duration,
      iconColor: "text-blue-500",
    },
    {
      icon: Wallet,
      label: "Avg Salary",
      value: career.salary,
      iconColor: "text-green-500",
    },
    {
      icon: Briefcase,
      label: "Field",
      value: career.field,
      iconColor: "text-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Growth",
      value: career.growth,
      iconColor: "text-[#D4AF37]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6EE]">
      {/* Hero */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
          <div className="px-8 py-12 md:px-16">
            <nav className="flex items-center gap-1.5 text-sm text-gray-400">
              <Link href="/careers" className="transition-colors hover:text-[#111111]">
                Career Guide
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="text-[#111111]">{career.name}</span>
            </nav>

            <span className="mt-4 inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#D4AF37]">
              {career.field}
            </span>

            <h1
              className="mt-3 text-5xl font-bold text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {career.name}
            </h1>

            <p className="mt-2 max-w-md text-lg italic text-gray-500">{tagline}</p>

            <div className="mt-6 flex flex-wrap gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-[#111111]">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <span className="mt-6 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700">
              {career.growth}
            </span>
          </div>

          <div
            className={`relative h-[320px] overflow-hidden bg-gradient-to-b lg:h-[420px] ${theme.gradient}`}
          >
            <DecorativeDots />
            <Image
              src={`/images/careers/${career.slug}.png`}
              alt={career.name}
              fill
              loading="lazy"
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#E5E7EB] bg-white py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#E5E7EB] lg:grid-cols-4">
          {statsBar.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-4 py-2 text-center sm:px-6"
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
      </section>

      <CareerSlugTabPanel career={career} examBorder={theme.examBorder} />
    </div>
  );
}

type CareerSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CAREERS.map((career) => ({ slug: career.slug }));
}

export default async function CareerSlugPage({ params }: CareerSlugPageProps) {
  const { slug } = await params;
  const career = CAREERS.find((item) => item.slug === slug);

  if (!career) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CareerPageContent career={career} />
    </>
  );
}
