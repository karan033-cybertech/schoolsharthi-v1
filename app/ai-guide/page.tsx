"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Bot } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import ChatWindow from "@/components/ai-guide/chat-window";

const SUGGESTED_TOPICS = [
  { emoji: "📚", text: "Photosynthesis kya hai?" },
  { emoji: "⚡", text: "Newton's Laws" },
  { emoji: "🌊", text: "Life in the Water" },
  { emoji: "🎓", text: "After 10th kya kare?" },
  { emoji: "💰", text: "Scholarships for Class 11" },
  { emoji: "❤️", text: "Human Heart" },
  { emoji: "💻", text: "Internet kya hai?" },
];

function AIGuideContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();

  useEffect(() => {
    if (initialQuestion?.trim()) {
      setSelectedTopic(initialQuestion.trim());
    }
  }, [initialQuestion]);

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFAF8]">
        <header className="border-b border-[#E5E7EB] bg-white px-8 py-6">
          <h1
            className="text-3xl font-bold text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            AI Study Assistant
          </h1>
          <p className="mt-1 text-gray-500">
            Koi bhi doubt pucho, turant samjho
          </p>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <aside className="w-full shrink-0 lg:w-72">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  Suggested Topics
                </h2>
                <ul className="space-y-2">
                  {SUGGESTED_TOPICS.map((topic) => (
                    <li key={topic.text}>
                      <button
                        type="button"
                        onClick={() => setSelectedTopic(topic.text)}
                        className="w-full rounded-xl border border-transparent px-4 py-3 text-left text-sm font-medium text-[#111111] transition-all hover:border-[#D4AF37]/30 hover:bg-[#FDF6EE]"
                      >
                        <span className="mr-2">{topic.emoji}</span>
                        {topic.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <Bot className="h-4 w-4 shrink-0 text-blue-600" />
                <p className="text-sm font-medium text-blue-700">
                  Aap Hindi, English ya Hinglish me puch sakte hain.
                </p>
              </div>

              <ChatWindow selectedTopic={selectedTopic} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function AIGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 text-sm mt-3">Loading...</p>
          </div>
        </div>
      }
    >
      <AIGuideContent />
    </Suspense>
  );
}