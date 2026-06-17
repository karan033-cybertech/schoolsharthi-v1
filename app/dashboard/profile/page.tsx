"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { ClassName } from "@/types"

type ProfileForm = {
  full_name: string
  class_name: ClassName | ""
  school: string
  city: string
  bio: string
}

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<ProfileForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile({
        full_name: data?.full_name || user.user_metadata?.full_name || '',
        class_name: (data?.class_name || user.user_metadata?.class_name || '') as ClassName | "",
        school: data?.school || '',
        city: data?.city || '',
        bio: data?.bio || '',
      })
      setIsLoading(false)
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!profile) return
    setIsSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: profile.full_name,
      class_name: profile.class_name || null,
      school: profile.school,
      city: profile.city,
      bio: profile.bio,
      updated_at: new Date().toISOString(),
    })
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (isLoading) return <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#111111] mb-2" style={{fontFamily:"'Playfair Display',serif"}}>Edit Profile</h1>
        <p className="text-gray-500 mb-8">Apni details update karo</p>
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm space-y-5">
          {[
            {label:"Full Name", key:"full_name" as const, type:"text", placeholder:"Apna naam daalo"},
            {label:"School", key:"school" as const, type:"text", placeholder:"School ka naam"},
            {label:"City", key:"city" as const, type:"text", placeholder:"Apna sheher"},
            {label:"Bio", key:"bio" as const, type:"textarea", placeholder:"Apne baare mein kuch likho..."},
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea rows={3} value={profile?.[field.key] || ''} onChange={e => setProfile({...profile!, [field.key]: e.target.value})} placeholder={field.placeholder} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"/>
              ) : (
                <input type={field.type} value={profile?.[field.key] || ''} onChange={e => setProfile({...profile!, [field.key]: e.target.value})} placeholder={field.placeholder} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"/>
              )}
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Class</label>
            <select value={profile?.class_name || ''} onChange={e => setProfile({...profile!, class_name: e.target.value as ClassName | ""})} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]">
              <option value="">Class select karo</option>
              {(['6','7','8','9','10','11','12'] as ClassName[]).map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
          <button onClick={handleSave} disabled={isSaving} className="w-full bg-[#111111] text-white rounded-xl py-3 font-semibold hover:bg-gray-800 transition-all disabled:opacity-50">
            {isSaving ? 'Saving...' : saved ? '✅ Saved!' : 'Profile Save Karo'}
          </button>
        </div>
      </div>
    </div>
  )
}
