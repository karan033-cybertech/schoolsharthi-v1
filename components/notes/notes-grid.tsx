"use client";

import { FileText } from "lucide-react";
import type { Note } from "@/types";

type NotesGridProps = {
  notes: Note[];
};

const SUBJECT_STYLES: Record<string, { bg: string; text: string }> = {
  Science: { bg: "bg-blue-50", text: "text-blue-600" },
  Maths: { bg: "bg-orange-50", text: "text-orange-600" },
  Biology: { bg: "bg-green-50", text: "text-green-600" },
  Physics: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Chemistry: { bg: "bg-purple-50", text: "text-purple-600" },
  English: { bg: "bg-pink-50", text: "text-pink-600" },
  Hindi: { bg: "bg-amber-50", text: "text-amber-600" },
  "Social Science": { bg: "bg-teal-50", text: "text-teal-600" },
};

const DEFAULT_STYLE = { bg: "bg-gray-50", text: "text-gray-600" };

function getSubjectStyle(subject: string) {
  return SUBJECT_STYLES[subject] ?? DEFAULT_STYLE;
}

function handleDownload(pdfUrl: string | null | undefined) {
  if (pdfUrl) {
    window.open(pdfUrl, "_blank");
  } else {
    alert("PDF jald available hoga!");
  }
}

export default function NotesGrid({ notes }: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        Koi notes nahi mile. Filter change karke dekho.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
      {notes.map((note) => {
        const style = getSubjectStyle(note.subject);
        const description =
          note.content.trim() ||
          `${note.subject} notes for Class ${note.class_name}`;

        return (
          <article
            key={note.id}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
              >
                {note.subject}
              </span>
              {note.pdf_url && (
                <span className="shrink-0 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                  PDF
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-400">Class {note.class_name}</p>

            <h3 className="mt-3 text-base font-bold text-[#111111]">{note.title}</h3>

            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {description}
            </p>

            <div className="mt-4 border-t border-[#F3F4F6] pt-4">
              <button
                type="button"
                onClick={() => handleDownload(note.pdf_url)}
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#D4AF37] hover:underline"
              >
                <FileText className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
