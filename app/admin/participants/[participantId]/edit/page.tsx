"use client";

import useParticipant from "@/lib/use-participant";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  description: string;
}

export default function EditParticipant({
  params,
}: {
  params: { participantId: string };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { participant } = useParticipant(params.participantId);
  console.log(participant);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateParticipant = await fetch("/api/participant", {
      method: "PUT",
      body: JSON.stringify({
        id: params.participantId,
        name: data.name,
        description: data.description,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
        data: object | null;
      }>;
    });
    console.log(updateParticipant);
  };

  return (
    <div className="w-full min-h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold">참가자 수정</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  mt-4">
        <div className="mt-2 text-lg">이름</div>
        <input
          className="p-2 rounded-md outline-none mt-1 ring-sky-300 ring-2 focus:ring-sky-500 transition duration-150"
          {...register("name", {
            required: { value: true, message: "이름을 입력해주세요." },
          })}
        />
        <div className="mt-2 text-lg">설명</div>
        <textarea
          className="p-2 rounded-md outline-none mt-1 ring-sky-300 ring-2 focus:ring-sky-500 transition duration-150"
          {...register("description")}
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-sky-400 mt-4 hover:bg-sky-500 transition duration-150 text-white"
        >
          수정
        </button>
      </form>
    </div>
  );
}
