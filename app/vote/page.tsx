"use client";

import { loadingState } from "@/lib/recoil";
import useVotes from "@/lib/use-votes";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Vote() {
  const { votes, votesLoading } = useVotes();
  const setLoading = useSetRecoilState(loadingState);

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
              key={vote.id}
              href={`/vote/${vote.id}`}
              className="w-full p-2 rounded-lg text-center max-w-sm bg-sky-400 text-white font-semibold text-lg"
            >
              {vote.participants.map((data) => {
                if (
                  data.participants.id ===
                  vote.participants[vote.participants.length - 1].participants
                    .id
                ) {
                  return data.participants.name;
                }
                return data.participants.name + " vs ";
              })}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
