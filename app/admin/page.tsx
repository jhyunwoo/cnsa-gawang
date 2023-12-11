import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") redirect("/");

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div>Admin</div>
    </div>
  );
}
