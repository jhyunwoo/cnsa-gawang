import SignOutButton from "@/components/signout-button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Vote() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div>Vote</div>
      <SignOutButton>로그아웃</SignOutButton>
    </div>
  );
}
