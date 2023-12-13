"use client";

import BackButton from "@/components/back-button";
import { loadingState } from "@/lib/recoil";
import useVoters from "@/lib/use-voters";
import Image from "next/image";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Voters() {
  const { voters, votersLoading } = useVoters();
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    if (votersLoading) setLoading(true);
    else setLoading(false);
  }, [setLoading, votersLoading]);

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <BackButton href="/admin">관리자 페이지</BackButton>
      <h1 className="text-xl font-bold">투표자 관리</h1>
      <div className="mt-4 grid grid-cols1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {voters?.map((data) => (
          <div
            key={data.id}
            className="flex items-center space-x-2 bg-white rounded-lg p-1"
          >
            <Image
              src={data.image ? data.image : ""}
              alt={data.name ? data.name : ""}
              width={40}
              height={40}
              priority
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{data?.name}</p>
              <p className="text-sm">학번: {data?.studentId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
