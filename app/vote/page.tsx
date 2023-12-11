import SignOutButton from "@/components/signout-button";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
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
