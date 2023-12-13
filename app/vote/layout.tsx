import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export default async function VoteLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) redirect("/");

  const userInfo = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userInfo?.studentId) redirect("/add-voter-info");

  return <>{children}</>;
}
