"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface ChangePasswordProps {
  newPassword: string;
  email?: string;
}

export async function changePassword({
  newPassword,
  email,
}: ChangePasswordProps) {
  const session = await auth();

  if (!newPassword) {
    return { error: "New password required" };
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userId =
      session?.user.id ??
      (await prisma.users.findFirst({ where: { email } }))?.id;

    await prisma.users.update({
      where: { id: userId },
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
