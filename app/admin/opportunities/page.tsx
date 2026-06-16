"use client";

import { useState } from "react";
import type { OpportunityType } from "@/types";

type AdminOpportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  description: string;
  class_range: string;
  deadline: string;
  apply_url: string;
};

const OPPORTUNITIES: AdminOpportunity[] = [
  {
    id: "1",
    title: "INSPIRE Award – MANAK 2024",
    type: "competition",
    description:
      "India's top science project competition for school students. Show your innovation and get recognized at national level.",
    class_range: "Class 6 – 12",
    deadline: "30 June 2024",
    apply_url: "https://inspireawards-dst.gov.in",
  },
  {
    id: "2",
    title: "National Science Olympiad (NSO)",
    type: "olympiad",
    description:
      "Science olympiad for students from Class 1 to 12. Test your science knowledge and compete nationally.",
    class_range: "Class 1 – 12",
    deadline: "31 July 2024",
    apply_url: "https://www.sofworld.org",
  },
  {
    id: "3",
    title: "Merit-cum-Means Scholarship",
    type: "scholarship",
    description:
      "Scholarship for meritorious students from economically weaker sections. Up to ₹12,000 per year.",
    class_range: "Class 11 – 12",
    deadline: "20 Aug 2024",
    apply_url: "https://scholarships.gov.in",
  },
  {
    id: "4",
    title: "International Maths Olympiad (IMO)",
    type: "olympiad",
    description:
      "World's most prestigious mathematics competition for school students. Represent India internationally.",
    class_range: "Class 1 – 12",
    deadline: "15 Sep 2024",
    apply_url: "https://www.imo-official.org",
  },
  {
    id: "5",
    title: "PM Scholarship Scheme",
    type: "scholarship",
    description:
      "Government scholarship for students whose parents are ex-servicemen. ₹2500/month for boys, ₹3000/month for girls.",
    class_range: "Class 11 – 12",
    deadline: "31 Oct 2024",
    apply_url: "https://ksb.gov.in",
  },
  {
    id: "6",
    title: "Pradhan Mantri Yuva Yojana",
    type: "government",
    description:
      "Government program for young entrepreneurs and innovators. Get mentorship, training and funding support.",
    class_range: "Class 9 – 12",
    deadline: "Open",
    apply_url: "https://pmyuva.org",
  },
];

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
  const [showForm, setShowForm] = useState(false);

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
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:bg-yellow-400"
        >
          + Add Opportunity
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
                <input type="text" placeholder="Opportunity title" className={inputClassName} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Type
                </label>
                <select className={inputClassName} defaultValue="scholarship">
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
                  className={`${inputClassName} resize-none`}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Deadline
                </label>
                <input type="date" className={inputClassName} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Apply URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Save
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
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Class Range</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {OPPORTUNITIES.map((opp) => (
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
