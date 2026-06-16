"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
import type { ChatMessage } from "@/types";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Namaste! 👋 Main hun SchoolSharthi AI Guide. Aap koi bhi sawaal pucho — padhai, career, scholarship, kuch bhi!",
};

type ChatWindowProps = {
  selectedTopic?: string;
};

export default function ChatWindow({ selectedTopic }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lastSentTopicRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          userMessage: trimmed,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Sorry, kuch gadbad ho gayi." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf karo, abhi jawab nahi de paaya. Thodi der baad dubara try karo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedTopic || selectedTopic === lastSentTopicRef.current) return;
    lastSentTopicRef.current = selectedTopic;
    void sendMessage(selectedTopic);
  }, [selectedTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="min-h-[450px] space-y-4 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="mr-2 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <div
              className={`text-sm leading-relaxed ${
                message.role === "user"
                  ? "ml-auto max-w-sm rounded-2xl rounded-br-sm bg-[#111111] px-5 py-3 text-white"
                  : "max-w-xl rounded-2xl rounded-bl-sm border border-[#E5E7EB] bg-[#FAFAF8] px-5 py-3 text-[#111111]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="mr-2 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex max-w-xl items-center gap-1 rounded-2xl rounded-bl-sm border border-[#E5E7EB] bg-[#FAFAF8] px-5 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-[#E5E7EB] bg-white p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Apna sawaal likho..."
            disabled={isLoading}
            className="w-full rounded-xl border border-[#E5E7EB] px-5 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#D4AF37] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="ml-2 shrink-0 rounded-xl bg-[#D4AF37] p-2.5 transition-all hover:bg-yellow-400 disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-[#111111]" />
          </button>
        </form>
      </div>
    </div>
  );
}
