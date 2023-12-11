"use client";

import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function SignOutButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => signOut()} className={className}>
      {children}
    </button>
  );
}
