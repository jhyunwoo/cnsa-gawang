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

  const participant = await prisma.participants.findUnique({
    where: {
      id: id ? id : "",
    },
  });

  return NextResponse.json(participant);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN")
    return NextResponse.json({ result: "Access Denied", data: null });
  const requestData = await request.json();
  const {
    id,
    name,
    description,
  }: { id: string; name: string; description: string } = requestData;
  const updateParticipant = await prisma.participants.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
  return NextResponse.json({ result: "SUCCESS", data: updateParticipant });
}
