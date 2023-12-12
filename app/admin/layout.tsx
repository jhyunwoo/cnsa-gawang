import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") redirect("/");

  return <>{children}</>;
}