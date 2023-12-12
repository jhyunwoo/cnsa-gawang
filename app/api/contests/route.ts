import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ result: "Access denied" });
  }

  const contests = await prisma.contest.findMany({
    include: {
      participants: {
        include: {
          participants: true,
        },
      },
    },
    orderBy: {
      created: "desc",
    },
  });
  return NextResponse.json(contests);
}
