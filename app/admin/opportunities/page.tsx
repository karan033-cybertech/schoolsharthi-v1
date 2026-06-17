"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Opportunity, OpportunityType } from "@/types";

type OpportunityForm = {
  title: string;
  type: OpportunityType;
  description: string;
  class_range: string;
  deadline: string;
  apply_url: string;
};

const EMPTY_FORM: OpportunityForm = {
  title: "",
  type: "scholarship",
  description: "",
  class_range: "",
  deadline: "",
  apply_url: "",
};

const TYPE_BADGE_STYLES: Record<OpportunityType, string> = {
  scholarship: "bg-green-50 text-green-600 border border-green-200",
  olympiad: "bg-blue-50 text-blue-600 border border-blue-200",
  competition: "bg-purple-50 text-purple-600 border border-purple-200",
  government: "bg-orange-50 text-orange-600 border border-orange-200",
};

const TYPE_LABELS: Record<OpportunityType, string> = {
  scholarship: "Scholarship",
  olympiad: "Olympiad",
  competition: "Competition",
  government: "Government",
};

const inputClassName =
  "w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

export default function AdminOpportunitiesPage() {
  const supabase = createClient();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<OpportunityForm>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOpportunities(data as Opportunity[]);
  }, [supabase]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleAdd = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("opportunities").insert({
      title: form.title,
      type: form.type,
      description: form.description,
      class_range: form.class_range,
      deadline: form.deadline,
      apply_url: form.apply_url || null,
      is_published: true,
      created_by: user?.id,
    });
    if (!error) {
      resetForm();
      fetchOpportunities();
      alert("Opportunity add ho gayi!");
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Ye opportunity delete karna chahte ho?")) return;
    try {
      const { error } = await supabase.from("opportunities").delete().eq("id", id);
      if (error) {
        console.error("Failed to delete opportunity:", error.message);
        alert("Delete karne mein error aayi: " + error.message);
        return;
      }
      fetchOpportunities();
    } catch (err) {
      console.error("Error in handleDelete:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleEdit = (opp: Opportunity) => {
    setForm({
      title: opp.title,
      type: opp.type,
      description: opp.description,
      class_range: opp.class_range || "",
      deadline: opp.deadline,
      apply_url: opp.apply_url || "",
    });
    setEditId(opp.id);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      const { error } = await supabase
        .from("opportunities")
        .update({
          title: form.title,
          type: form.type,
          description: form.description,
          class_range: form.class_range,
          deadline: form.deadline,
          apply_url: form.apply_url || null,
        })
        .eq("id", editId);
      if (error) {
        console.error("Failed to update opportunity:", error.message);
        alert("Update karne mein error aayi: " + error.message);
        return;
      }
      resetForm();
      fetchOpportunities();
      alert("Opportunity update ho gayi!");
    } catch (err) {
      console.error("Error in handleUpdate:", err);
      alert("Kuch gadbad ho gayi. Thodi der baad try karo.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-8 py-6">
        <h1
          className="text-2xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Opportunities Management
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
          + Add Opportunity
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
                  placeholder="Opportunity title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as OpportunityType })
                  }
                  className={inputClassName}
                >
                  <option value="scholarship">Scholarship</option>
                  <option value="olympiad">Olympiad</option>
                  <option value="competition">Competition</option>
                  <option value="government">Government</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Class Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. Class 6-12"
                  value={form.class_range}
                  onChange={(e) => setForm({ ...form, class_range: e.target.value })}
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Opportunity description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${inputClassName} resize-none`}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Deadline
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Apply URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.apply_url}
                  onChange={(e) => setForm({ ...form, apply_url: e.target.value })}
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editId ? "Update" : "Save"}
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
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Class Range</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                    Koi opportunities nahi mili. Pehli opportunity add karo!
                  </td>
                </tr>
              ) : (
                opportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    className="border-b border-[#F3F4F6] text-sm last:border-b-0"
                  >
                    <td className="px-6 py-4 font-medium text-[#111111]">{opp.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-medium ${TYPE_BADGE_STYLES[opp.type]}`}
                      >
                        {TYPE_LABELS[opp.type]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{opp.class_range}</td>
                    <td className="px-6 py-4 text-gray-600">{opp.deadline}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(opp)}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(opp.id)}
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
