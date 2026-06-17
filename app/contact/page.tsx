"use client"
import Navbar from "@/components/layout/navbar"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#111111]" style={{fontFamily:"'Playfair Display',serif"}}>Contact Us</h1>
            <p className="text-gray-500 mt-2">Koi sawaal hai? Hum yahaan hain!</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <div className="space-y-4">
              {[
                {label:"Aapka Naam", type:"text", placeholder:"Full name daalo"},
                {label:"Email", type:"email", placeholder:"email@example.com"},
                {label:"Subject", type:"text", placeholder:"Kya jaanna chahte ho?"},
              ].map(field => (
                <div key={field.label}>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Message</label>
                <textarea rows={4} placeholder="Apna sawaal ya feedback likho..." className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none" />
              </div>
              <button onClick={() => alert('Message bhej diya! Hum jald jawab denge.')} className="w-full bg-[#111111] text-white rounded-xl py-3 font-semibold hover:bg-gray-800 transition-all">Message Bhejo</button>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-center">
              <p className="text-sm text-gray-500">Ya seedha email karo:</p>
              <a href="mailto:support@schoolsharthi.com" className="text-[#D4AF37] font-semibold hover:underline">support@schoolsharthi.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
