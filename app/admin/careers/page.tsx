"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Career } from "@/types";

type CareerForm = {
  name: string;
  slug: string;
  field: string;
  growth: string;
  duration: string;
  avg_salary: string;
  overview: string;
  future_scope: string;
  tagline: string;
  skills: string;
  roadmap: string;
  exams: string;
};

const EMPTY_FORM: CareerForm = {
  name: "",
  slug: "",
  field: "",
  growth: "",
  duration: "",
  avg_salary: "",
  overview: "",
  future_scope: "",
  tagline: "",
  skills: "",
  roadmap: "",
  exams: "",
};

const inputClassName =
  "w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

export default function AdminCareersPage() {
  const supabase = createClient();
  const [careers, setCareers] = useState<Career[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CareerForm>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchCareers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Failed to fetch careers:", error.message);
      } else if (data) {
        setCareers(data as Career[]);
      }
    } catch (err) {
      console.error("Error in fetchCareers:", err);
    }
  }, [supabase]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleAddCareer = async () => {
    try {
      const skillsArray = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const roadmapArray = form.roadmap
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const examsArray = form.exams
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const { error } = await supabase.from("careers").insert({
        name: form.name,
        slug: form.slug,
        field: form.field || null,
        growth: form.growth || null,
        duration: form.duration || null,
        avg_salary: form.avg_salary || null,
        overview: form.overview,
        future_scope: form.future_scope,
        tagline: form.tagline || null,
        skills: skillsArray,
        roadmap: roadmapArray,
        exams: examsArray,
        is_published: true,
      });

      if (error) {
        console.error("Failed to add career:", error.message);
        alert("Add karne mein error aayi: " + error.message);
        return;
      }
      resetForm();
      fetchCareers();
      alert("Career add ho gaya!");
    } catch (err) {
      console.error("Error in handleAddCareer:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm("Ye career delete karna chahte ho?")) return;
    try {
      const { error } = await supabase.from("careers").delete().eq("id", id);
      if (error) {
        console.error("Failed to delete career:", error.message);
        alert("Delete karne mein error aayi: " + error.message);
        return;
      }
      fetchCareers();
    } catch (err) {
      console.error("Error in handleDeleteCareer:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleEdit = (career: Career) => {
    setForm({
      name: career.name,
      slug: career.slug,
      field: career.field || "",
      growth: career.growth || "",
      duration: career.duration || "",
      avg_salary: career.avg_salary || "",
      overview: career.overview,
      future_scope: career.future_scope,
      tagline: career.tagline || "",
      skills: (career.skills || []).join(", "),
      roadmap: (career.roadmap || []).join(", "),
      exams: (career.exams || []).join(", "),
    });
    setEditId(career.id);
    setShowForm(true);
  };

  const handleUpdateCareer = async () => {
    if (!editId) return;
    try {
      const skillsArray = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const roadmapArray = form.roadmap
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const examsArray = form.exams
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const { error } = await supabase
        .from("careers")
        .update({
          name: form.name,
          slug: form.slug,
          field: form.field || null,
          growth: form.growth || null,
          duration: form.duration || null,
          avg_salary: form.avg_salary || null,
          overview: form.overview,
          future_scope: form.future_scope,
          tagline: form.tagline || null,
          skills: skillsArray,
          roadmap: roadmapArray,
          exams: examsArray,
        })
        .eq("id", editId);

      if (error) {
        console.error("Failed to update career:", error.message);
        alert("Update karne mein error aayi: " + error.message);
        return;
      }
      resetForm();
      fetchCareers();
      alert("Career update ho gaya!");
    } catch (err) {
      console.error("Error in handleUpdateCareer:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      handleUpdateCareer();
    } else {
      handleAddCareer();
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-8 py-6">
        <h1
          className="text-2xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Careers Management
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
          {showForm ? "Close Form" : "+ Add Career"}
        </button>
      </header>

      <div className="p-8">
        {showForm && (
          <form
            className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Career Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Doctor, Software Engineer"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. doctor, software-engineer"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Field
                </label>
                <input
                  type="text"
                  placeholder="e.g. Medical & Healthcare, Technology"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Growth Status
                </label>
                <input
                  type="text"
                  placeholder="e.g. High, Very High, Stable"
                  value={form.growth}
                  onChange={(e) => setForm({ ...form, growth: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 Years (B.Tech), 5.5 Years"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Average Salary
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹6 LPA – ₹50 LPA+"
                  value={form.avg_salary}
                  onChange={(e) => setForm({ ...form, avg_salary: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="A short inspiring catchphrase for this career path"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of this career field..."
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className={`${inputClassName} resize-none`}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Future Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain details of career scope and opportunities..."
                  value={form.future_scope}
                  onChange={(e) => setForm({ ...form, future_scope: e.target.value })}
                  className={`${inputClassName} resize-none`}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Required Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Programming, Logical Thinking, Communication"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Roadmap Steps (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  placeholder="Step 1, Step 2, Step 3..."
                  value={form.roadmap}
                  onChange={(e) => setForm({ ...form, roadmap: e.target.value })}
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Exams to Qualify (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. JEE Main, BITSAT, VITEEE"
                  value={form.exams}
                  onChange={(e) => setForm({ ...form, exams: e.target.value })}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editId ? "Update Career" : "Save Career"}
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
                <th className="px-6 py-4">Career Name</th>
                <th className="px-6 py-4">Field</th>
                <th className="px-6 py-4">Growth</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">
                    No careers found. Please add a new career.
                  </td>
                </tr>
              ) : (
                careers.map((career) => (
                  <tr
                    key={career.id}
                    className="border-b border-[#F3F4F6] text-sm last:border-b-0"
                  >
                    <td className="px-6 py-4 font-medium text-[#111111]">{career.name}</td>
                    <td className="px-6 py-4 text-gray-600">{career.field || "-"}</td>
                    <td className="px-6 py-4">
                      {career.growth ? (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                          {career.growth}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(career)}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCareer(career.id)}
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
