"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { getCareerImagePath } from "@/lib/career-images";

type CareerImageProps = {
  slug: string;
  name: string;
  className?: string;
  placeholderColor?: string;
  fallback?: ReactNode;
};

export default function CareerImage({
  slug,
  name,
  className = "h-56 w-full rounded-2xl object-cover md:h-72",
  placeholderColor = "bg-gray-400",
  fallback,
}: CareerImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        className={`flex items-center justify-center ${className} ${placeholderColor}`}
      >
        <span
          className="text-5xl font-bold text-white/90"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={getCareerImagePath(slug)}
      alt={name}
      width={560}
      height={420}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}
