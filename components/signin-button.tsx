"use client";

import { signIn } from "next-auth/react";
import { ReactNode } from "react";

export default function SignInButton({
  children,
  provider,
  className,
}: {
  children: ReactNode;
  provider: "kakao";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => signIn(provider)}
      className={className}
    >
      {children}
    </button>
  );
}
