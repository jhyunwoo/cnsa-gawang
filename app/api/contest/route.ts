import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN")
    return NextResponse.json({ result: "Access Denied" });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const contest = await prisma.contest.findUnique({
    where: {
      id: id ? id : "",
    },
    include: {
      participants: {
        include: {
          participants: true,
        },
      },
      votes: true,
    },
  });

  return NextResponse.json(contest);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN")
    return NextResponse.json({ result: "Access Denied" });
  const requestData = await request.json();
  const { participants }: { participants: string[] } = requestData;

  const createContest = await prisma.contest.create({
    data: {
      participants: {
        create: participants.map((data) => ({ participantsId: data })),
      },
    },
  });
  return NextResponse.json({ result: "SUCCESS", data: createContest });
}
