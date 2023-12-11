import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
      role?: string | null | undefined;
      created?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
    };
  }
  interface User {
    role?: string | null | undefined;
    created?: string | null | undefined;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
