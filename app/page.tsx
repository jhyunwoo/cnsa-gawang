import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/signin-button";
import { authOptions } from "@/lib/auth-options";

export default async function Main() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/vote");

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-3xl p-8 font-bold">큰사가왕 투표</h1>
        <SignInButton
          provider="kakao"
          className="bg-yellow-400 font-semibold w-full p-2 rounded-md text-white hover:bg-yellow-300 transition duration-150"
        >
          카카오로 로그인
        </SignInButton>
      </div>
    </div>
  );
}
