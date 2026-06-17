"use client"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#111111] mb-6">Settings</h1>
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm space-y-4">
        <div className="border-b border-[#E5E7EB] pb-4">
          <h3 className="font-semibold text-[#111111]">Site Name</h3>
          <p className="text-sm text-gray-500">SchoolSharthi</p>
        </div>
        <div className="border-b border-[#E5E7EB] pb-4">
          <h3 className="font-semibold text-[#111111]">Version</h3>
          <p className="text-sm text-gray-500">V1.0 — MVP</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#111111]">Support</h3>
          <p className="text-sm text-gray-500">support@schoolsharthi.com</p>
        </div>
      </div>
    </div>
  )
}
