import type { Metadata } from "next";
import "./globals.css";
import RecoilProvider from "@/components/recoil-provider";
import AuthProvider from "@/components/auth-provider";
import Loading from "@/components/loading";
import { ReactNode } from "react";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  applicationName: "큰사가왕 투표",
  title: "큰사가왕 투표",
  description: "2024 큰사가왕 온라인 투표",
  metadataBase: new URL("https://cnsagawang.moveto.kr"),
  openGraph: {
    title: "큰사가왕 투표",
    description: "2024 큰사가왕 온라인 투표",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="bg-slate-50">
      <body>
        <AuthProvider>
          <RecoilProvider>
            {children}
            <Loading />
          </RecoilProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
