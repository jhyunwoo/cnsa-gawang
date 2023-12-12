import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
      role?: string | null | undefined;
      created?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      studentId?: number | null | undefined;
    };
  }
  interface User {
    plan?: string | null | undefined;
    created?: string | null | undefined;
    studentId?: number | null | undefined;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
        role: user.role,
        created: user.created,
        studentId: user.studentId,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
