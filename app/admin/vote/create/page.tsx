"use client";

import { loadingState } from "@/lib/recoil";
import useParticipants from "@/lib/use-participants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function CreateVote() {
  const [selected, setSelected] = useState<string[]>([]);

  const { participants, participantsLoading } = useParticipants();

  const setLoading = useSetRecoilState(loadingState);
  const router = useRouter();

  function handleSelect(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((data) => data !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  async function createContest() {
    if (selected.length < 2) {
      alert("2명 이상의 참가자를 선택해주세요.");
      return;
    }
    setLoading(true);
    const create = await fetch("/api/contest", {
      method: "POST",
      body: JSON.stringify({ participants: selected }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
        data: {
          id: string;
          show: boolean;
        };
      }>;
    });
    if (create.result === "SUCCESS") router.push("/admin/vote");
    setLoading(false);
  }

  useEffect(() => {
    if (participantsLoading) setLoading(true);
    else setLoading(false);
  }, [participantsLoading, setLoading]);

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <h1 className="text-xl font-bold">투표 생성</h1>
      <div className="mt-4">
        <h2 className="text-lg text-slate-700 border-b-2">참가자 선택</h2>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {participants?.map((data) => (
            <button
              type="button"
              key={data.id}
              onClick={() => handleSelect(data.id)}
              className={`p-1 px-2 rounded-md text-center font-semibold text-lg ${
                selected.includes(data.id)
                  ? "bg-sky-700 text-white"
                  : "bg-sky-100 text-sky-700"
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={createContest}
        className="p-2 rounded-lg bg-sky-600 text-white font-semibold text-center mt-4 hover:bg-sky-500 transition duration-150"
      >
        투표 생성
      </button>
    </div>
  );
}
