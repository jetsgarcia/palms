"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function login(values: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(values);

  if (parsed.error) {
    return { error: "Invalid fields" };
  }

  const { email, password } = parsed.data;

  const user = await prisma.users.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return { error: "Email does not exist" };
  }

  try {
    let redirectTo = "/";
    if (user.role === "ADMIN") {
      redirectTo = "/admin";
    } else if (user.role === "STUDENT") {
      redirectTo = "/student";
    } else if (user.role === "INSTRUCTOR") {
      redirectTo = "/instructor";
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }

  return null;
}
