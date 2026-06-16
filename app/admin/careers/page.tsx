"use client";

const CAREERS = [
  {
    id: "1",
    name: "Doctor",
    field: "Medical & Healthcare",
    growth: "High",
  },
  {
    id: "2",
    name: "Engineer",
    field: "Technology & Infrastructure",
    growth: "Very High",
  },
  {
    id: "3",
    name: "Scientist",
    field: "Research & Development",
    growth: "Moderate-High",
  },
  {
    id: "4",
    name: "Teacher",
    field: "Education",
    growth: "Stable",
  },
  {
    id: "5",
    name: "Army Officer",
    field: "Defence & Security",
    growth: "Stable & Respected",
  },
  {
    id: "6",
    name: "Chartered Accountant",
    field: "Finance & Accounts",
    growth: "High",
  },
];

export default function AdminCareersPage() {
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
          className="rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:bg-yellow-400"
        >
          + Add Career
        </button>
      </header>

      <div className="p-8">
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
              {CAREERS.map((career) => (
                <tr
                  key={career.id}
                  className="border-b border-[#F3F4F6] text-sm last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium text-[#111111]">{career.name}</td>
                  <td className="px-6 py-4 text-gray-600">{career.field}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                      {career.growth}
                    </span>
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
