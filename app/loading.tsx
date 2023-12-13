import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="w-full h-screen fixed top-0 flex items-center justify-center bg-slate-100/50">
      <Cog6ToothIcon className="w-14 h-14 animate-spin text-slate-700" />
    </div>
  );
}
