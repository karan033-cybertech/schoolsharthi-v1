"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ClassName, Note } from "@/types";

type NoteForm = {
  title: string;
  subject: string;
  class_name: ClassName;
  content: string;
  pdf_url: string;
};

const EMPTY_FORM: NoteForm = {
  title: "",
  subject: "Science",
  class_name: "10",
  content: "",
  pdf_url: "",
};

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
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NoteForm>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setNotes(data as Note[]);
  }, [supabase]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleAddNote = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("notes").insert({
      title: form.title,
      subject: form.subject,
      class_name: form.class_name,
      content: form.content,
      pdf_url: form.pdf_url || null,
      is_published: true,
      created_by: user?.id,
    });
    if (!error) {
      resetForm();
      fetchNotes();
      alert("Note add ho gaya!");
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Ye note delete karna chahte ho?")) return;
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) {
        console.error("Failed to delete note:", error.message);
        alert("Delete karne mein error aayi: " + error.message);
        return;
      }
      fetchNotes();
    } catch (err) {
      console.error("Error in handleDelete:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleEdit = (note: Note) => {
    setForm({
      title: note.title,
      subject: note.subject,
      class_name: note.class_name,
      content: note.content,
      pdf_url: note.pdf_url || "",
    });
    setEditId(note.id);
    setShowForm(true);
  };

  const handleUpdateNote = async () => {
    if (!editId) return;
    try {
      const { error } = await supabase
        .from("notes")
        .update({
          title: form.title,
          subject: form.subject,
          class_name: form.class_name,
          content: form.content,
          pdf_url: form.pdf_url || null,
        })
        .eq("id", editId);
      if (error) {
        console.error("Failed to update note:", error.message);
        alert("Update karne mein error aayi: " + error.message);
        return;
      }
      resetForm();
      fetchNotes();
      alert("Note update ho gaya!");
    } catch (err) {
      console.error("Error in handleUpdateNote:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      handleUpdateNote();
    } else {
      handleAddNote();
    }
  };

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
          onClick={() => {
            setEditId(null);
            setForm(EMPTY_FORM);
            setShowForm((prev) => !prev);
          }}
          className="rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:bg-yellow-400"
        >
          + Add Note
        </button>
      </header>

      <div className="p-8">
        {showForm && (
          <form
            className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClassName}
                >
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
                <select
                  value={form.class_name}
                  onChange={(e) =>
                    setForm({ ...form, class_name: e.target.value as ClassName })
                  }
                  className={inputClassName}
                >
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
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
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
                  value={form.pdf_url}
                  onChange={(e) => setForm({ ...form, pdf_url: e.target.value })}
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editId ? "Update Note" : "Save Note"}
              </button>
              <button
                type="button"
                onClick={resetForm}
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
              {notes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                    Koi notes nahi mile. Pehla note add karo!
                  </td>
                </tr>
              ) : (
                notes.map((note) => (
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
                        onClick={() => handleEdit(note)}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
