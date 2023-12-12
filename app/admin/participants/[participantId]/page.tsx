import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Participant({
  params,
}: {
  params: { participantId: string };
}) {
  const participant = await prisma.participants.findUnique({
    where: {
      id: params.participantId,
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <h1 className="font-bold text-xl">참가자 관리 - {participant?.name}</h1>
      <div className="mt-4 flex flex-col">
        <div>이름: {participant?.name}</div>
        <div>설명: {participant?.description}</div>
      </div>
      <Link
        href={`/admin/participants/${participant?.id}/edit`}
        className="w-full p-2 px-3 bg-sky-50 ring-2 ring-sky-500 text-sky-900 mt-4 hover:bg-sky-100 transition duration-150 font-semibold rounded-lg text-center hover:bg"
      >
        수정
      </Link>
    </div>
  );
}
