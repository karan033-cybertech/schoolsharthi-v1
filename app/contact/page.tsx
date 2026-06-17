"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const validate = () => {
    let isValid = true
    const newErrors = { name: "", email: "", subject: "", message: "" }

    if (!form.name.trim()) {
      newErrors.name = "Naam zaroori hai"
      isValid = false
    }

    if (!form.email.trim()) {
      newErrors.email = "Email zaroori hai"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Valid email address daalo"
      isValid = false
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject zaroori hai"
      isValid = false
    }

    if (!form.message.trim()) {
      newErrors.message = "Message khali nahi ho sakta"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert("Message bhej diya! Hum jald jawab denge.")
      setForm({ name: "", email: "", subject: "", message: "" })
      setErrors({ name: "", email: "", subject: "", message: "" })
    }
  }

  const fields = [
    { label: "Aapka Naam", key: "name" as const, type: "text", placeholder: "Full name daalo" },
    { label: "Email", key: "email" as const, type: "email", placeholder: "email@example.com" },
    { label: "Subject", key: "subject" as const, type: "text", placeholder: "Kya jaanna chahte ho?" },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </h1>
            <p className="mt-2 text-gray-500">Koi sawaal hai? Hum yahaan hain!</p>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => {
                      setForm({ ...form, [field.key]: e.target.value })
                      if (errors[field.key]) setErrors({ ...errors, [field.key]: "" })
                    }}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-[#D4AF37] ${
                      errors[field.key]
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-[#E5E7EB] focus:border-[#D4AF37]"
                    }`}
                  />
                  {errors[field.key] && <p className="mt-1 text-xs text-red-500">{errors[field.key]}</p>}
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Apna sawaal ya feedback likho..."
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: "" })
                  }}
                  className={`w-full resize-none rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-[#E5E7EB] focus:border-[#D4AF37]"
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#111111] py-3 font-semibold text-white transition-all hover:bg-gray-800"
              >
                Message Bhejo
              </button>
            </form>
            <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-center">
              <p className="text-sm text-gray-500">Ya seedha email karo:</p>
              <a href="mailto:support@schoolsharthi.com" className="font-semibold text-[#D4AF37] hover:underline">
                support@schoolsharthi.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
