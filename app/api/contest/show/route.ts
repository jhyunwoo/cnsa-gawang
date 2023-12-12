import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN")
    return NextResponse.json({ result: "Access Denied", data: null });

  const requestData = await request.json();
  const { id, show }: { id: string; show: boolean } = requestData;

  const updateContestShow = await prisma.contest.update({
    where: {
      id,
    },
    data: {
      show,
    },
  });

  return NextResponse.json({ result: "SUCCESS", data: updateContestShow });
}
