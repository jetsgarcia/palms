import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string;
    middleInitial?: string;
    role?: string;
  }

  interface Session {
    user: {
      firstName?: string;
      lastName?: string;
      middleInitial?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          email: user.email,
          role: user.role,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleInitial: user.middleInitial || undefined,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.middleInitial = user.middleInitial;
        token.lastName = user.lastName;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.middleInitial = token.middleInitial as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
});
