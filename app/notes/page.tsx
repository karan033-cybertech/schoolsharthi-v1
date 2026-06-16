"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/layout/navbar";
import NotesFilter, { type SubjectFilter } from "@/components/notes/notes-filter";
import NotesGrid from "@/components/notes/notes-grid";
import type { ClassName, Note } from "@/types";

const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Life Processes",
    subject: "Science",
    class_name: "10",
    content: "",
    pdf_url: "/notes/life-processes.pdf",
    created_at: "2026-01-01",
  },
  {
    id: "2",
    title: "Trigonometry",
    subject: "Maths",
    class_name: "11",
    content: "",
    created_at: "2026-01-02",
  },
  {
    id: "3",
    title: "The Living World",
    subject: "Biology",
    class_name: "11",
    content: "",
    pdf_url: "/notes/living-world.pdf",
    created_at: "2026-01-03",
  },
  {
    id: "4",
    title: "Motion in a Plane",
    subject: "Physics",
    class_name: "11",
    content: "",
    created_at: "2026-01-04",
  },
  {
    id: "5",
    title: "Our Environment",
    subject: "Science",
    class_name: "10",
    content: "",
    created_at: "2026-01-05",
  },
  {
    id: "6",
    title: "Magnetic Effects of Light",
    subject: "Science",
    class_name: "10",
    content: "",
    pdf_url: "/notes/magnetic-effects.pdf",
    created_at: "2026-01-06",
  },
];

const HEADER_STATS = [
  { value: "50+", label: "Notes" },
  { value: "Class 6-12", label: null },
  { value: "Free", label: "PDF Downloads" },
];

export default function NotesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassName | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    return SAMPLE_NOTES.filter((note) => {
      const classMatch =
        selectedClass === "all" || note.class_name === selectedClass;
      const subjectMatch =
        selectedSubject === "all" ||
        note.subject.toLowerCase() === selectedSubject.toLowerCase();
      const searchMatch = note.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return classMatch && subjectMatch && searchMatch;
    });
  }, [selectedClass, selectedSubject, searchQuery]);

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFAF8]">
        <header className="border-b border-[#E5E7EB] bg-white py-12 text-center">
          <h1
            className="text-4xl font-bold text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Notes Hub
          </h1>
          <p className="mt-2 text-gray-500">
            Class-wise, subject-wise notes aur revision material
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {HEADER_STATS.map((stat, index) => (
              <span key={stat.value} className="flex items-center gap-6">
                {index > 0 && <span className="text-gray-300">|</span>}
                <span>
                  <span className="font-bold text-[#D4AF37]">{stat.value}</span>
                  {stat.label && (
                    <span className="ml-1 text-gray-500">{stat.label}</span>
                  )}
                </span>
              </span>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <NotesFilter
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            onClassChange={setSelectedClass}
            onSubjectChange={setSelectedSubject}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <NotesGrid notes={filteredNotes} />
        </main>
      </div>
    </>
  );
}
