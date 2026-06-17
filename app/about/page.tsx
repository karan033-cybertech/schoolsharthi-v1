import Navbar from "@/components/layout/navbar"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full px-4 py-1.5 text-xs font-semibold">🇮🇳 Our Mission</span>
            <h1 className="text-4xl font-bold text-[#111111] mt-4" style={{fontFamily:"'Playfair Display',serif"}}>Har Student Ka Sachcha Sharthi</h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">SchoolSharthi ka mission hai ki India ke har student ko — chahe wo rural ho ya urban — quality education, career guidance, scholarships aur opportunities milein.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {icon:"🎯", title:"Hamara Lakshya", desc:"Class 6-12 ke students ko ek platform pe sab kuch dena — notes, career guidance, scholarships, aur AI support."},
              {icon:"🌍", title:"Rural Focus", desc:"Rajasthan ke rural students ke liye khaaskar banaya gaya hai — Hindi aur Hinglish mein simple content."},
              {icon:"🤖", title:"AI Powered", desc:"Groq AI se powered chatbot jo students ke doubts turant solve karta hai — Hindi ya Hinglish mein."}
            ].map(item => (
              <div key={item.title} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#111111] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#111111] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold" style={{fontFamily:"'Playfair Display',serif"}}>SchoolSharthi join karo</h2>
            <p className="text-gray-400 mt-2">Thousands of students already learning with us</p>
            <Link href="/signup" className="inline-block mt-6 bg-[#D4AF37] text-black rounded-xl px-8 py-3 font-bold hover:bg-yellow-400 transition-all">Sign Up — It&apos;s Free</Link>
          </div>
        </div>
      </div>
    </>
  )
}
