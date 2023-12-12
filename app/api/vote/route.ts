import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ result: "Access Denied" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const votes = await prisma.contest.findUnique({
    where: {
      show: true,
      id: id ? id : "",
    },
    include: {
      participants: {
        include: {
          participants: true,
        },
      },
    },
  });

  const participants: { id: string; name: string }[] = [];

  if (votes) {
    for (const participant of votes.participants) {
      participants.push({
        id: participant.participants.id,
        name: participant.participants.name,
      });
    }
  }
  return NextResponse.json(participants);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) return NextResponse.json({ request: "ACCESS DENIED" });

  const requestData = await request.json();
  const { voteId, participantId }: { voteId: string; participantId: string } =
    requestData;

  const checkMultipleVote = await prisma.vote.findFirst({
    where: {
      userId: session.user.id,
      contestId: voteId,
    },
  });
  if (checkMultipleVote) return NextResponse.json({ result: "ALREADY VOTED" });

  await prisma.vote.create({
    data: {
      participantId: participantId,
      userId: session.user.id,
      contestId: voteId,
    },
  });
  return NextResponse.json({ result: "SUCCESS" });
}
