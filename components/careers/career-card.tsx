"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCareerImagePath } from "@/lib/career-images";
import {
  Calculator,
  Clock,
  FlaskConical,
  GraduationCap,
  Shield,
  Stethoscope,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type CareerCardData = {
  slug: string;
  name: string;
  overview: string;
  duration: string;
  growth: string;
};

type CareerStyle = {
  icon: LucideIcon;
  iconBox: string;
  iconColor: string;
  imageBg: string;
};

const CAREER_STYLES: Record<string, CareerStyle> = {
  doctor: {
    icon: Stethoscope,
    iconBox: "bg-red-100",
    iconColor: "text-red-500",
    imageBg: "bg-red-50",
  },
  engineer: {
    icon: Wrench,
    iconBox: "bg-blue-100",
    iconColor: "text-blue-500",
    imageBg: "bg-blue-50",
  },
  scientist: {
    icon: FlaskConical,
    iconBox: "bg-purple-100",
    iconColor: "text-purple-500",
    imageBg: "bg-purple-50",
  },
  teacher: {
    icon: GraduationCap,
    iconBox: "bg-green-100",
    iconColor: "text-green-500",
    imageBg: "bg-green-50",
  },
  "army-officer": {
    icon: Shield,
    iconBox: "bg-slate-100",
    iconColor: "text-slate-600",
    imageBg: "bg-slate-50",
  },
  "chartered-accountant": {
    icon: Calculator,
    iconBox: "bg-amber-100",
    iconColor: "text-amber-600",
    imageBg: "bg-amber-50",
  },
};

const DEFAULT_STYLE: CareerStyle = {
  icon: GraduationCap,
  iconBox: "bg-gray-100",
  iconColor: "text-gray-500",
  imageBg: "bg-gray-50",
};

type CareerCardProps = {
  career: CareerCardData;
};

export default function CareerCard({ career }: CareerCardProps) {
  const styles = CAREER_STYLES[career.slug] ?? DEFAULT_STYLE;
  const Icon = styles.icon;
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/careers/${career.slug}`}
      className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`relative mb-4 h-48 w-full overflow-hidden rounded-2xl ${styles.imageBg}`}
      >
        {!imageError ? (
          <Image
            src={getCareerImagePath(career.slug)}
            alt={career.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-center"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon className={`h-10 w-10 ${styles.iconColor}`} />
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-[#111111]">{career.name}</h2>

      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500">
        {career.overview}
      </p>

      <div className="mt-4 border-t border-[#F3F4F6] pt-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {career.duration}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
            {career.growth}
          </span>
        </div>

        <span className="mt-3 block text-xs font-medium text-[#D4AF37] group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
}
