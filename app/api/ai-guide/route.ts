import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `Tu SchoolSharthi ka AI Study Assistant hai. Tera kaam hai Class 6-12 ke Indian school students ki help karna. Study doubts solve kar, career guidance de, scholarship info de, exam tips de.
Rules:
- Hamesha simple Hindi ya Hinglish mein jawab de
- Short aur clear answers do, max 150 words
- Friendly aur encouraging tone rakho
- Student ne Hindi mein pucha toh Hindi mein jawab de
- Student ne English mein pucha toh Hinglish mein jawab de
- Emojis use kar sparingly`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, userMessage } = body;

    if (!userMessage) {
      return NextResponse.json({ error: "No message" }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...(messages || []),
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content ?? "Koi jawab nahi mila";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json({ error: "API failed" }, { status: 500 });
  }
}
