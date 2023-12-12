"use client";

import { loadingState } from "@/lib/recoil";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface Inputs {
  name: string;
  studentId: number;
}

export default function AddVoterInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const setLoading = useSetRecoilState(loadingState);
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const updateUser = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({
        name: data.name,
        studentId: data.studentId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{
        result: string;
      }>;
    });
    if (updateUser.result !== "SUCCESS")
      alert("투표자 정보 추가에 실패했습니다.");
    else router.push("/vote");

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div className="text-xl font-semibold p-4">투표자 정보</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="text-lg text-slate-600">이름</div>
          <input
            className="outline-none w-full p-1 px-2 rounded-md ring-2 ring-sky-500"
            {...register("name", {
              required: { value: true, message: "이름을 입력하세요." },
              minLength: { value: 2, message: "올바른 이름을 입력하세요." },
              maxLength: { value: 3, message: "올바른 이름을 입력하세요." },
            })}
          />
          <p
            className={`${
              errors.name ? "visible" : "invisible"
            } text-red-500 text-sm py-[2px]`}
          >
            {errors.name ? errors.name?.message : "ERROR MESSAGE"}
          </p>
          <div className="text-lg text-slate-600">학번 (5자리)</div>
          <input
            className="outline-none w-full p-1 px-2 rounded-md ring-2 ring-sky-500"
            {...register("studentId", {
              required: { value: true, message: "학번을 입력하세요." },
              min: { value: 30000, message: "올바른 학번을 입력하세요." },
              max: { value: 31240, message: "올바른 학번을 입력하세요." },
            })}
          />
          <p
            className={`${
              errors.studentId ? "visible" : "invisible"
            } text-red-500 text-sm py-[2px]`}
          >
            {errors.studentId ? errors.studentId?.message : "ERROR MESSAGE"}
          </p>
          <button
            type="submit"
            className="w-full p-2 text-center bg-sky-500 text-white rounded-lg text-lg font-semibold"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
