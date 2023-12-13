import SignOutButton from "@/components/signout-button";
import Link from "next/link";
import ReloadVotes from "./reload-votes";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const colors = [
  "bg-sky-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-teal-500",
];

export default async function Vote() {
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

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col p-4">
      <div className="p-4 bg-white rounded-lg flex flex-col items-center justify-center w-full shadow-md max-w-lg">
        <div className="text-2xl font-bold p-4">큰사가왕 투표</div>
        <div className="flex flex-col space-y-2 w-full items-center">
          {votes?.map((vote, index) => (
            <Link
              key={vote?.id}
              href={`/vote/${vote?.id}`}
              className={`w-full p-2 rounded-lg text-center max-w-sm ${colors[index]} transition duration-150 text-white font-semibold text-lg`}
            >
              {vote.participants.map((data) => {
                if (
                  data?.participants?.id ===
                  vote?.participants[vote?.participants?.length - 1]
                    .participants?.id
                ) {
                  return data.participants?.name;
                }
                return data?.participants?.name + " vs ";
              })}
            </Link>
          ))}
          <ReloadVotes />
          <p className="text-sm text-slate-900">
            투표가 보이지 않을 경우 새로고침 해주세요.
          </p>
        </div>
      </div>
      <SignOutButton className="text-sm text-red-500 p-4 hover:underline decoration-red-500">
        로그아웃
      </SignOutButton>
    </div>
  );
}
