"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function changePassword({ newPassword }: { newPassword: string }) {
  const session = await auth();

  if (!newPassword) {
    return { error: "New password required" };
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session?.user.id },
      data: { password: hashedPassword, firstLogin: false },
    });

    return { success: "Password changed successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }

  return null;
}
