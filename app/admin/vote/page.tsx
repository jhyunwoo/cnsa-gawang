"use client";

import { loadingState } from "@/lib/recoil";
import useContests from "@/lib/use-contests";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function AdminVote() {
  const setLoading = useSetRecoilState(loadingState);
  const { contests, contestsLoading } = useContests();

  useEffect(() => {
    if (contestsLoading) setLoading(true);
    else setLoading(false);
  }, [contestsLoading, setLoading]);

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <h1 className="text-xl font-bold">투표</h1>
      <div className="grid grid-cols-1 gap-2 mt-4 w-full">
        {contests?.map((data) => (
          <Link
            href={`/admin/vote/${data?.id}`}
            key={data?.id}
            className={`flex bg-white p-2 px-3 rounded-md font-semibold ring-2 ${
              data.show ? "ring-green-500" : "ring-red-500"
            }`}
          >
            {data?.participants.map((participants, index) => (
              <div key={participants.participantsId} className="mr-1">
                {participants.participants?.name}
                {index + 1 !== data?.participants?.length ? " vs" : ""}
              </div>
            ))}
          </Link>
        ))}
        <Link
          href={"/admin/vote/create"}
          className="text-center p-3 px-4 rounded-lg bg-sky-800 text-white font-semibold hover:bg-sky-700 transition duration-150"
        >
          투표 생성
        </Link>
      </div>
    </div>
  );
}
