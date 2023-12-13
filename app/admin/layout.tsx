import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export const metadata: Metadata = {
  applicationName: "큰사가왕 투표 | 관리자",
  title: "큰사가왕 투표 | 관리자",
  description: "2023 큰사가왕 온라인 투표 관리자 페이지",
  metadataBase: new URL("https://cnsagawang.moveto.kr"),
  openGraph: {
    title: "큰사가왕 투표 | 관리자",
    description: "2023 큰사가왕 온라인 투표 관리자 페이지",
    images: ["/og-image.png"],
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") redirect("/");

  return (
    <div className="mx-auto w-full max-w-7xl flex flex-col">{children}</div>
  );
}
