import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAF8] px-4 text-center">
      <div className="text-8xl font-bold text-[#E5E7EB]">404</div>
      <h1
        className="mt-4 text-2xl font-bold text-[#111111]"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Page nahi mili!
      </h1>
      <p className="mt-2 max-w-md text-gray-500">
        Jo page aap dhundh rahe hain woh exist nahi karta. Shayad URL galat ho
        ya page delete ho gaya ho.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#111111] px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800"
      >
        ← Home pe Wapas Jao
      </Link>
    </div>
  );
}
