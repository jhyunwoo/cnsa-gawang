import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "큰사가왕",
  description: "충남삼성고 큰사가왕 투표",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-slate-50">
      <body>{children}</body>
    </html>
  );
}
