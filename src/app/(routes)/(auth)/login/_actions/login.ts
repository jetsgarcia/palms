"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const lowerCaseEmail = email.toLowerCase();

  // Make sure email exists
  const userExists = await prisma.users.findFirst({
    where: { email: lowerCaseEmail },
  });

  if (!userExists) {
    return { error: "Email does not exist" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
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
