"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ClassName } from "@/types";

const CLASS_OPTIONS: { value: ClassName | ""; label: string }[] = [
  { value: "", label: "Select your class" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

const inputClassName =
  "w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassName | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    className: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors = {
      fullName: "",
      className: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name kam se kam 2 characters ka hona chahiye";
    }
    if (!selectedClass) {
      newErrors.className = "Class select karna zaroori hai";
    }
    if (!email.trim()) {
      newErrors.email = "Email zaroori hai";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Valid email daalo";
    }
    if (password.length < 6) {
      newErrors.password = "Password kam se kam 6 characters ka hona chahiye";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password match nahi kar raha";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName.trim(),
            class_name: selectedClass,
          },
        },
      });

      if (error) {
        setErrors((prev) => ({ ...prev, email: error.message }));
        return;
      }

      if (data.user && !data.session) {
        setShowSuccess(true);
        return;
      }

      router.push("/dashboard");
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "Signup failed. Dobara try karo.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1
            className="mt-6 text-2xl font-bold text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Email Bheja Gaya! ✅
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            Humne <span className="font-semibold text-[#111111]">{email}</span> pe confirmation link bheja hai.
          </p>
          <p className="mt-2 text-sm text-gray-500">Email kholke link pe click karo.</p>
          <p className="mt-1 text-sm text-gray-400">Spam folder bhi check karo.</p>
          <Link
            href="/login"
            className="mt-8 inline-block w-full rounded-xl bg-[#D4AF37] py-3 font-bold text-[#111111] transition-all hover:bg-yellow-400"
          >
            Login Karo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/images/logo.png"
            alt="SchoolSharthi Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold text-[#111111]">SCHOOLSHARTHI</span>
        </div>

        <h1
          className="mt-6 text-center text-2xl font-bold text-[#111111]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Create Account
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Join SchoolSharthi and start your learning journey today.
        </p>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="full-name"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={inputClassName}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="class"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                Class
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(e.target.value as ClassName | "")
                }
                className={inputClassName}
              >
                {CLASS_OPTIONS.map((option) => (
                  <option key={option.value || "default"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.className && (
                <p className="mt-1 text-xs text-red-500">{errors.className}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="school"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                School
              </label>
              <input
                id="school"
                type="text"
                placeholder="Enter your school (optional)"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClassName}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={`${inputClassName} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`${inputClassName} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#D4AF37] py-3 font-bold text-[#111111] transition-all hover:bg-yellow-400 disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold text-[#D4AF37] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
