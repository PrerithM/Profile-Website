import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prerith M's Portfolio",
  description:
    "Preith.M's Profile. Know about my skills, projects, and more.",
  openGraph: {
    title: "Prerith M's Portfolio",
    description:
      "Preith.M's Profile. Know about my skills, projects, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
