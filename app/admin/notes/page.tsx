"use client";

import { useState } from "react";
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

const SUBJECT_STYLES: Record<string, string> = {
  Science: "bg-blue-50 text-blue-600",
  Maths: "bg-orange-50 text-orange-600",
  Biology: "bg-green-50 text-green-600",
  Physics: "bg-indigo-50 text-indigo-600",
  Chemistry: "bg-purple-50 text-purple-600",
  English: "bg-pink-50 text-pink-600",
  Hindi: "bg-amber-50 text-amber-600",
};

const inputClassName =
  "w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

export default function AdminNotesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-8 py-6">
        <h1
          className="text-2xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Notes Management
        </h1>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:bg-yellow-400"
        >
          + Add Note
        </button>
      </header>

      <div className="p-8">
        {showForm && (
          <form
            className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Title
                </label>
                <input type="text" placeholder="Note title" className={inputClassName} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Subject
                </label>
                <select className={inputClassName} defaultValue="Science">
                  {["Science", "Maths", "Physics", "Chemistry", "Biology", "English", "Hindi"].map(
                    (subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Class
                </label>
                <select className={inputClassName} defaultValue="10">
                  {(["6", "7", "8", "9", "10", "11", "12"] as ClassName[]).map((cls) => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Content
                </label>
                <textarea
                  rows={4}
                  placeholder="Note content..."
                  className={`${inputClassName} resize-none`}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  PDF URL (optional)
                </label>
                <input
                  type="text"
                  placeholder="/notes/example.pdf"
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Save Note
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-[#E5E7EB] px-5 py-2.5 text-sm font-medium text-[#111111] hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8] text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">PDF</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_NOTES.map((note) => (
                <tr
                  key={note.id}
                  className="border-b border-[#F3F4F6] text-sm last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium text-[#111111]">{note.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        SUBJECT_STYLES[note.subject] ?? "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {note.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                      Class {note.class_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {note.pdf_url ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
