import Navbar from "@/components/layout/navbar"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {slug:"after-10th-career", title:"Class 10 ke Baad Kya Kare?", desc:"Science, Commerce ya Arts — kaun sa stream choose karna chahiye? Complete guide.", date:"10 June 2026", tag:"Career"},
    {slug:"neet-preparation", title:"NEET 2025 ki Taiyari Kaise Kare?", desc:"NEET crack karne ke liye 12 mahine ka complete study plan aur tips.", date:"5 June 2026", tag:"Exam Tips"},
    {slug:"scholarships-rajasthan", title:"Rajasthan ke Students ke Liye Top Scholarships", desc:"2024-25 mein available best scholarships jo rural students ke liye hain.", date:"1 June 2026", tag:"Scholarship"},
    {slug:"career-doctor-vs-engineer", title:"Doctor vs Engineer — Kaun sa Career Better Hai?", desc:"Dono careers ka detailed comparison — salary, scope, difficulty, aur future.", date:"28 May 2026", tag:"Career"},
  ]
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#111111]" style={{fontFamily:"'Playfair Display',serif"}}>SchoolSharthi Blog</h1>
            <p className="text-gray-500 mt-2">Career tips, exam guidance, aur scholarship updates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <div key={post.slug} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] rounded-full px-3 py-1 text-xs font-semibold">{post.tag}</span>
                <h2 className="font-bold text-[#111111] text-lg mt-3 leading-tight">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F3F4F6]">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <Link href={`/ai-guide?q=${encodeURIComponent(post.title)}`} className="text-xs text-[#D4AF37] font-semibold hover:underline">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
