"use client";

import SignOutButton from "@/components/signout-button";
import { loadingState } from "@/lib/recoil";
import useVotes from "@/lib/use-votes";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Vote() {
  const { votes, votesLoading, votesMutate } = useVotes();
  const [reload, setReload] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  function reloadVotes() {
    setReload(true);
    votesMutate();
    setTimeout(() => setReload(false), 1000);
  }

  useEffect(() => {
    if (votesLoading) setLoading(true);
    else setLoading(false);
  }, [votesLoading, setLoading]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col p-4">
      <div className="p-4 bg-white rounded-lg flex flex-col items-center justify-center w-full shadow-md max-w-lg">
        <div className="text-2xl font-bold p-4">큰사가왕 투표</div>
        <div className="flex flex-col space-y-2 w-full items-center">
          {votes?.map((vote) => (
            <Link
              key={vote?.id}
              href={`/vote/${vote?.id}`}
              className="w-full p-2 rounded-lg text-center max-w-sm bg-sky-400 hover:bg-sky-500 transition duration-150 text-white font-semibold text-lg"
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
          <button
            type="button"
            className="p-2 w-full max-w-sm bg-slate-400 text-white hover:bg-slate-500 transition duration-150 rounded-lg flex items-center justify-center"
            onClick={reloadVotes}
          >
            {reload ? (
              <Cog6ToothIcon className="w-6 h-6 animate-spin text-slate-100" />
            ) : (
              "새로고침"
            )}
          </button>
        </div>
      </div>
      <SignOutButton className="text-sm text-red-500 p-4 hover:underline decoration-red-500">
        로그아웃
      </SignOutButton>
    </div>
  );
}
