import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "SchoolSharthi — Har Student Ka Sachcha Sharthi",
  description:
    "India's student growth platform. AI study assistant, career guidance, scholarships for Class 6-12 students.",
  keywords:
    "school students career scholarships olympiads RBSE India Hindi",
  openGraph: {
    title: "SchoolSharthi",
    description: "Har Student Ka Sachcha Sharthi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
