import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ result: "Access Denied" }, { status: 401 });

  const votes = await prisma.contest.findMany({
    where: {
      show: true,
    },
    include: {
      participants: {
        include: {
          participants: true,
        },
      },
    },
  });
  return NextResponse.json(votes);
}
