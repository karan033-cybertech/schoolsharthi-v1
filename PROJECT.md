# SchoolSharthi — Project Reference Document

> **Cursor: Read this file before writing any code for this project.**
> This is the single source of truth for SchoolSharthi V1.

---

## Mission

Empower every school student — especially rural students — with quality education, career guidance, scholarships, opportunities, and AI-powered support through one platform.

Tagline: **"Har Student Ka Sachcha Sharthi"**

---

## Problem We Are Solving

Students in rural India struggle with:
- Lack of career guidance after Class 10 and 12
- No awareness of scholarships and opportunities
- Poor access to quality study resources
- Language barrier (Hindi medium students ignored by most EdTech)

---

## Target Audience

- **Primary**: Class 6–12 students, especially rural students from Rajasthan (Pali, Jodhpur districts)
- **Language**: Hindi, English, Hinglish — UI copy and AI responses must support all three
- **Devices**: Low-end Android phones, slow 2G/3G connections
- **Secondary**: Urban students, parents, teachers

---

## Core Philosophy

SchoolSharthi is NOT a notes website.
SchoolSharthi is a **Student Growth Platform**.

Students should be able to: Learn + Explore Careers + Discover Opportunities + Build Confidence + Receive Guidance — all from one place.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Supabase (Database + Auth + Storage) |
| AI | Groq API |
| Hosting | Vercel |
| Fonts | Playfair Display (headings), Inter (body) |

---

## UI Design System

| Token | Value |
|-------|-------|
| Background | #FFFFFF |
| Surface | #F8F7F4 |
| Primary Text | #111111 |
| Accent (Gold) | #D4AF37 |
| Border | #E5E7EB |
| Heading Font | Playfair Display |
| Body Font | Inter |

**Design Style**: Light, Premium, Academic, Clean, Spacious, Human-Centered, Minimal

**Cards**: rounded-xl, soft shadow, hover animation, clean icons

**Mobile First**: Must work perfectly on Android low-end devices and rural network conditions

---

## Performance Targets

- Lighthouse Score: 90+
- First Load: under 2 seconds
- Responsive: 100%
- SEO Ready: Yes

---

## Database Tables (Supabase)

- `users` — Supabase auth users
- `profiles` — name, class, school, interests
- `notes` — class, subject, title, content, pdf_url
- `careers` — name, slug, overview, skills, roadmap, exams, future_scope
- `opportunities` — title, type, deadline, description, apply_url, class_range
- `draft_imports` — url, extracted_data, status (pending/published)

---

## Version 1 — Core Modules (MVP)

### 1. Home Page
Sections:
- Navbar
- Hero Section (headline + search bar)
- AI Search Box with placeholder "Aaj aap kya padhna chahte hain?"
- Quick Action Cards (AI Guide, Notes Hub, Career Explorer, Opportunities Hub)
- Today's Opportunity Spotlight
- Statistics Bar (10K+ Students, 500+ Notes, 300+ Opportunities, 50+ Careers)
- Quick Links
- Footer

### 2. AI Guide
- Purpose: Student doubt solving and career guidance
- Capabilities: Study questions, career guidance, scholarship info, exam guidance
- Languages: Hindi, English, Hinglish
- API: Groq API
- Model: llama-3.1-70b-versatile
- System prompt must instruct AI to respond in the same language the student uses

### 3. Notes Hub
- Class-wise notes (Class 6–12)
- Subject-wise notes
- PDF resources
- PYQs (Previous Year Questions)
- Filter by class and subject

### 4. Career Explorer
- Careers: Doctor, Engineer, Scientist, Teacher, Army Officer, Chartered Accountant (and more)
- Each career page has: Overview, Skills Required, Roadmap, Exams, Future Scope
- Dynamic routes: /careers/[slug]

### 5. Opportunities Hub
- Categories: Scholarships, Olympiads, Competitions, Government Programs
- Features: Search, Filter by type, Apply Link, Deadline display

### 6. Student Profile
- Fields: Name, Class, School (optional), Interests
- Personalized recommendations based on class and interests

### 7. Admin Panel
- Add Notes, Careers, Opportunities
- Review AI-generated drafts
- Publish content

### 8. AI Opportunity Importer (Unique Feature)
Workflow: Paste URL → AI Extracts Data → Draft Generated → Admin Reviews → Publish

---

## Folder Structure

```
schoolsharthi/
├── .cursorrules
├── .env.local
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── notes/page.tsx
│   ├── careers/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── opportunities/page.tsx
│   ├── ai-guide/page.tsx
│   ├── profile/page.tsx
│   ├── admin/page.tsx
│   └── api/
│       ├── ai-guide/route.ts
│       └── opportunities/route.ts
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── feature-cards.tsx
│   │   ├── stats-bar.tsx
│   │   └── opportunity-spotlight.tsx
│   ├── notes/
│   │   ├── notes-grid.tsx
│   │   └── notes-filter.tsx
│   ├── careers/
│   │   ├── career-card.tsx
│   │   └── career-detail.tsx
│   ├── opportunities/
│   │   └── opportunity-card.tsx
│   └── ai-guide/
│       └── chat-window.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── groq.ts
├── types/
│   └── index.ts
└── public/
    └── images/
```

---

## Coding Rules

- All components use TypeScript (.tsx)
- Server Components by default — add "use client" only for interactive UI
- Supabase client ONLY in /lib/supabase/ — never inline in components
- All TypeScript types ONLY in /types/index.ts
- shadcn/ui components in /components/ui/ — never modify manually
- Use next/image for all images
- No useEffect for data fetching — use Server Components
- No `any` type in TypeScript
- Keep bundle size small — low-end device target

---

## Version 2 (Future — Do Not Build Now)

Personal AI Mentor, Study Planner, Progress Tracking, AI Notes Generator, Achievement System, English Improvement, Smart Reminders

## Version 3 (Future — Do Not Build Now)

Student Community, Mentor Sessions, Live Workshops, Innovation Challenges, School Partnerships, National Student Network
