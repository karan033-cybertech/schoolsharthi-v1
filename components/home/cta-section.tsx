import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-8">
      <div className="mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-[#111111] to-[#2D2D2D] md:mx-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="px-8 py-12 md:px-16">
            <span className="mb-4 inline-block rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold text-black">
              Free Forever
            </span>
            <h2
              className="text-4xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Start Your Learning Journey Today!
            </h2>
            <p className="mt-3 max-w-md text-base text-gray-400">
              Join thousands of students and take the first step towards your
              success.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-bold text-black transition-all hover:bg-yellow-400"
            >
              Sign Up – It&apos;s Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative flex h-full items-end justify-center overflow-hidden bg-transparent">
            <Image
              src="/images/cta-student.png"
              alt="Student learning"
              width={400}
              height={400}
              loading="lazy"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
