"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NotesFilter, { type SubjectFilter } from "@/components/notes/notes-filter";
import type { ClassName, Note } from "@/types";

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
  const [selectedClass, setSelectedClass] = useState<ClassName | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    async function loadSaved() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user || !isMounted) return;

        const { data, error } = await supabase
          .from("saved_notes")
          .select("note_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Failed to load saved notes:", error.message);
          return;
        }

        if (data && isMounted) {
          const savedMap: Record<string, boolean> = {};
          data.forEach((row) => {
            savedMap[row.note_id] = true;
          });
          setSaved(savedMap);
        }
      } catch (error) {
        console.error("Error in loadSaved:", error);
      }
    }
    void loadSaved();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (noteId: string) => {
    if (saving[noteId]) return;

    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        alert("Notes save karne ke liye pehle login karo!");
        return;
      }

      setSaving((prev) => ({ ...prev, [noteId]: true }));

      if (saved[noteId]) {
        const { error } = await supabase
          .from("saved_notes")
          .delete()
          .eq("user_id", user.id)
          .eq("note_id", noteId);

        if (error) {
          console.error("Failed to unsave note:", error.message);
          alert("Note unsave karne mein error aayi!");
        } else {
          setSaved((prev) => ({ ...prev, [noteId]: false }));
        }
      } else {
        const { error } = await supabase
          .from("saved_notes")
          .insert({ user_id: user.id, note_id: noteId });

        if (error) {
          console.error("Failed to save note:", error.message);
          alert("Note save karne mein error aayi!");
        } else {
          setSaved((prev) => ({ ...prev, [noteId]: true }));
        }
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("Kuch gadbad ho gayi. Kripya thodi der baad try karein.");
    } finally {
      setSaving((prev) => ({ ...prev, [noteId]: false }));
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
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
  }, [notes, selectedClass, selectedSubject, searchQuery]);

  return (
    <>
      <NotesFilter
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onClassChange={setSelectedClass}
        onSubjectChange={setSelectedSubject}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredNotes.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          Koi notes nahi mile. Filter change karke dekho.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {filteredNotes.map((note) => {
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
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
                    >
                      {note.subject}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                      Class {note.class_name}
                    </span>
                    {note.pdf_url && (
                      <span className="shrink-0 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                        PDF
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSave(note.id)}
                    disabled={saving[note.id]}
                    className={`shrink-0 rounded-lg p-1.5 transition-all ${
                      saved[note.id]
                        ? "bg-[#D4AF37] text-white"
                        : "bg-[#F3F4F6] text-gray-400 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                    } ${saving[note.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                    title={saved[note.id] ? "Saved!" : "Save karo"}
                  >
                    {saved[note.id] ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <h3 className="mt-3 text-base font-bold text-[#111111]">
                  {note.title}
                </h3>

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
      )}
    </>
  );
}
