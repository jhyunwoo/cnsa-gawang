import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id)
    return NextResponse.json({ result: "ACCESS DENIED" }, { status: 401 });

  const requestData = await request.json();
  const { name, studentId }: { name: string; studentId: string } = requestData;

  const updateUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: name,
      studentId: Number(studentId),
    },
  });
  return NextResponse.json({ result: "SUCCESS" });
}
