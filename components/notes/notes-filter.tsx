"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { ClassName } from "@/types";

const CLASS_OPTIONS: { value: ClassName | "all"; label: string }[] = [
  { value: "all", label: "All Classes" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

const SUBJECT_OPTIONS = [
  { value: "all", label: "All Subjects" },
  { value: "Science", label: "Science" },
  { value: "Maths", label: "Maths" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Social Science", label: "Social Science" },
] as const;

export type SubjectFilter = (typeof SUBJECT_OPTIONS)[number]["value"];

type NotesFilterProps = {
  selectedClass: ClassName | "all";
  selectedSubject: SubjectFilter;
  onClassChange: (value: ClassName | "all") => void;
  onSubjectChange: (value: SubjectFilter) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

const selectClassName =
  "w-full cursor-pointer appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

const inputClassName =
  "w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

export default function NotesFilter({
  selectedClass,
  selectedSubject,
  onClassChange,
  onSubjectChange,
  searchQuery,
  onSearchChange,
}: NotesFilterProps) {
  const [localSearch, setLocalSearch] = useState("");
  const search = searchQuery ?? localSearch;
  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
    if (searchQuery === undefined) {
      setLocalSearch(value);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="class-filter"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            Class
          </label>
          <select
            id="class-filter"
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value as ClassName | "all")}
            className={selectClassName}
          >
            {CLASS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="subject-filter"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            Subject
          </label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value as SubjectFilter)}
            className={selectClassName}
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="notes-search"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="notes-search"
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search notes, chapters..."
              className={inputClassName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
