import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN")
    return NextResponse.json({ result: "ACCESS DENIED" }, { status: 401 });

  const voters = await prisma.user.findMany({
    orderBy: {
      studentId: "asc",
    },
  });
  return NextResponse.json(voters);
}
