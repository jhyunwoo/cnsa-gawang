"use client";

import BackButton from "@/components/back-button";
import { loadingState } from "@/lib/recoil";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface Inputs {
  name: string;
  description: string;
}
export default function CreateParticipant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const setLoading = useSetRecoilState(loadingState);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const createParticipant = await fetch("/api/participant", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
        data: {
          contentId: string | null;
          description: string | null | undefined;
          id: string;
          name: string;
        } | null;
      }>;
    });
    if (createParticipant.result === "SUCCESS") {
      router.push(`/admin/participants`);
    } else alert("참가자 추가에 실패했습니다.");
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <BackButton href="/admin/participants">참가자 관리</BackButton>

      <h1 className="text-xl font-bold">참가자 추가</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  mt-4">
        <div className="mt-2 text-lg">이름</div>
        <input
          className="p-2 rounded-md outline-none mt-1 ring-sky-300 ring-2 focus:ring-sky-500 transition duration-150"
          {...register("name", {
            required: { value: true, message: "이름을 입력해주세요." },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
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
