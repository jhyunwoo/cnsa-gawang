"use client";

import { loadingState } from "@/lib/recoil";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";

export default function Loading() {
  const isLoading = useRecoilValue(loadingState);
  return (
    <div
      className={`w-full h-screen fixed top-0 flex items-center justify-center bg-slate-100/50 ${
        isLoading ? "" : "hidden"
      }`}
    >
      <Cog6ToothIcon className="w-14 h-14 animate-spin text-slate-700" />
    </div>
  );
}
