"use client";

import { loadingState } from "@/lib/recoil";
import useVoteParticipants from "@/lib/use-vote-participants";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-pruple-500"];

export default function Vote({ params }: { params: { voteId: string } }) {
  const { participants } = useVoteParticipants(params.voteId);
  const setLoading = useSetRecoilState(loadingState);
  const router = useRouter();

  async function vote(id: string) {
    setLoading(true);
    const createVote = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        voteId: params.voteId,
        participantId: id,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
      }>;
    });
    if (createVote.result === "ALREADY VOTED") alert("이미 투표하셨습니다.");
    else {
      alert("투표 완료");
    }
    router.push("/vote");
    setLoading(false);
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-4 justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">
          {participants?.map((data, index) => {
            if (participants.length === index + 1) {
              return `${data.name}`;
            } else {
              return `${data.name} vs `;
            }
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4 space-x-2 fixed bottom-4 px-4">
        {participants?.map((data, index) => (
          <button
            key={data.id}
            type="button"
            onClick={() => vote(data.id)}
            className={`p-2 w-full aspect-1 text-lg font-semibold text-white rounded-lg ${colors[index]}`}
          >
            {data.name}
          </button>
        ))}
      </div>
    </div>
  );
}
