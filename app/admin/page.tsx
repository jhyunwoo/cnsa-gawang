import Link from "next/link";

export default function Admin() {
  return (
    <div className="w-full h-screen flex p-4 flex-col">
      <h1 className="text-xl font-semibold">큰사가왕 관리자 페이지</h1>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Link
          className="bg-white text-center py-4 rounded-md font-semibold text-lg hover:bg-slate-100 transition duration-150 px-3 ring-2 ring-slate-500"
          href={"/admin/participants"}
        >
          참가자 관리
        </Link>
        <Link
          className="bg-white text-center py-4 rounded-md font-semibold text-lg hover:bg-slate-100 transition duration-150 px-3 ring-2 ring-slate-500"
          href={"/admin/vote"}
        >
          투표 관리
        </Link>
      </div>
    </div>
  );
}
