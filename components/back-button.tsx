import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";

export default function BackButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <div className="w-full flex justify-start py-1">
      <Link
        type="button"
        href={href}
        className="flex space-x-1 items-center text-slate-800 hover:underline"
      >
        <ChevronLeftIcon className="w-6 h-6" />
        {children}
      </Link>
    </div>
  );
}
