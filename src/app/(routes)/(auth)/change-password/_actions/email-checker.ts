"use server";

import { prisma } from "@/lib/prisma";

export async function emailChecker({ email }: { email: string }) {
  if (!email) {
    throw new Error("Email is required.");
  }

  try {
    const record = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!record) {
      return { error: "User does not exist" };
    }

    return { success: "User exists" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
