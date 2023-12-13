"use client";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReloadVotes() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function reload() {
    setLoading(true);
    router.refresh();
    setTimeout(() => setLoading(false), 500);
  }

  return (
    <button
      onClick={reload}
      type="button"
      className="p-2 w-full max-w-sm bg-slate-500 text-white rounded-lg flex items-center justify-center"
    >
      <ArrowPathIcon
        className={`w-6 h-6 text-slate-100 ${loading ? "animate-spin" : ""}`}
      />
    </button>
  );
}
