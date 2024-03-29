"use client";

import BackButton from "@/components/back-button";
import { loadingState } from "@/lib/recoil";
import useContest from "@/lib/use-contest";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Contest({ params }: { params: { contestId: string } }) {
  const { contest, contestMutate, contestLoading } = useContest(
    params?.contestId
  );
  const setLoading = useSetRecoilState(loadingState);
  const router = useRouter();

  function countVote(
    id: string,
    votes: {
      contestId: string;
      created: Date;
      id: string;
      participantId: string;
      userId: string;
    }[]
  ) {
    let count = 0;
    votes.map((data) => {
      if (data.participantId === id) {
        count += 1;
      }
    });
    return count;
  }

  async function chageShow(show: boolean | undefined) {
    setLoading(true);
    const updateContest = await fetch("/api/contest/show", {
      method: "PUT",
      body: JSON.stringify({ id: contest?.id, show: !show }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
        data: { id: string; show: boolean };
      }>;
    });
    if (updateContest.result !== "SUCCESS")
      alert("투표 공개 여부 변경에 실패했습니다.");
    contestMutate();
    setLoading(false);
  }

  async function deleteContest() {
    setLoading(true);
    const deleteContestRequest = await fetch("/api/contest", {
      method: "DELETE",
      body: JSON.stringify({ id: contest?.id }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
      }>;
    });
    if (deleteContestRequest.result !== "SUCCESS")
      alert("투표 삭제에 실패했습니다.");
    else {
      alert("투표가 삭제되었습니다.");
      router.push("/admin/vote");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (contestLoading) setLoading(true);
    else setLoading(false);
  }, [contestLoading, setLoading]);

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <BackButton href="/admin/vote">투표 관리</BackButton>
      <h1 className="text-xl font-bold">
        투표 관리 |{" "}
        {contest?.participants?.map((data, index) => {
          if (index + 1 !== contest?.participants?.length) {
            return `${data?.participants?.name} vs `;
          } else {
            return `${data?.participants?.name}`;
          }
        })}
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col">
          <h2 className="text-slate-700 border-b-2">참가자</h2>
          <div className="flex space-x-2 mt-1">
            {contest?.participants.map((data) => (
              <Link
                href={`/admin/participants/${data?.participants?.id}`}
                className="text-lg font-semibold bg-sky-600 text-white p-1 px-3 rounded-md hover:bg-sky-500 transition duration-150"
                key={data.participants.id}
              >
                {data.participants.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col">
          <h2 className="text-slate-700 border-b-2">투표 현황</h2>
          <div className="flex flex-col space-y-1">
            {contest?.participants.map((data) => (
              <div
                key={data.participants.id}
                className="flex items-center justify-between border-b-2 last:border-b-0 py-1"
              >
                <div className="text-lg font-semibold bg-sky-500 text-white p-1 px-3 rounded-md ">
                  {data.participants.name}
                </div>
                <div className="text-lg font-semibold">
                  {countVote(data.participants.id, contest.votes)} 표
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className={`p-2 text-center font-semibold rounded-lg transition duration-150 text-white ${
            contest?.show
              ? "bg-red-500 hover:bg-red-400"
              : "bg-green-500 hover:bg-green-400"
          }`}
          onClick={() => chageShow(contest?.show)}
        >
          {contest?.show ? "투표 비공개" : "투표 공개"}
        </button>
        <button
          type="button"
          onClick={deleteContest}
          className="bg-red-500 text-white space-x-2 p-2 rounded-lg flex items-center justify-center transition duration-150 hover:bg-red-600"
        >
          <TrashIcon className="w-6 h-6" />
          <p>투표 삭제</p>
        </button>
      </div>
    </div>
  );
}
