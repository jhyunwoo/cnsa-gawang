import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminVote() {
  const contests = await prisma.contest.findMany({
    include: { participants: true },
  });

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <h1 className="text-xl font-bold">투표</h1>
      <div className="grid grid-cols-1 gap-2 mt-4 w-full">
        {contests.map((data) => (
          <Link
            href={`/admin/vote/${data.id}`}
            key={data.id}
            className="flex bg-white p-2 px-3 rounded-md font-semibold ring-1 ring-slate-500"
          >
            {data.participants.map((participants, index) => (
              <div key={participants.id} className="mr-1">
                {participants.name}
                {index + 1 !== data.participants.length ? " vs" : ""}
              </div>
            ))}
          </Link>
        ))}
        <Link
          href={"/admin/vote/create"}
          className="text-center p-3 px-4 rounded-md bg-slate-800 text-white font-semibold hover:bg-slate-700 transition duration-150"
        >
          투표 생성
        </Link>
      </div>
    </div>
  );
}
