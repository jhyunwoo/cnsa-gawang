"use client";
import BackButton from "@/components/back-button";
import { loadingState } from "@/lib/recoil";
import useParticipants from "@/lib/use-participants";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Participants() {
  const { participants, participantsLoading } = useParticipants();
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    if (participantsLoading) setLoading(true);
    else setLoading(false);
  }, [participantsLoading, setLoading]);

  return (
    <div className="w-full min-h-screen p-4 flex flex-col">
      <BackButton href="/admin">관리자 페이지</BackButton>
      <h1 className="text-xl font-semibold">참가자 관리</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {participants?.map((data) => (
          <Link
            href={`/admin/participants/${data.id}`}
            key={data.id}
            className="flex flex-col p-2 px-3 bg-white rounded-md ring-2 ring-sky-300 hover:bg-sky-50 transition duration-150"
          >
            <h2 className="text-lg">{data.name}</h2>
            <p className="text-slate-700 text-sm">{data.description}</p>
          </Link>
        ))}
        <Link
          href={"/admin/participants/create"}
          className="text-center p-3 px-4 rounded-lg bg-sky-800 text-white font-semibold hover:bg-sky-700 transition duration-150"
        >
          참가자 추가
        </Link>
      </div>
    </div>
  );
}
