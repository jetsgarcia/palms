"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type Response = { ok: true } | { ok: false; message: string };

export async function changePassword({
  newPassword,
  email,
}: {
  newPassword: string;
  // Email is used to get the user ID. It's optional because ID can be retrieved from the session. Basically, this is only used when the user is not logged in.
  email?: string;
}): Promise<Response> {
  const session = await auth();

  if (!newPassword) {
    return { ok: false, message: "New password required" };
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userId =
      session?.user.id ??
      (await prisma.users.findFirst({ where: { email } }))?.id;

    if (!userId) {
      return { ok: false, message: "User not found" };
    }

    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword, firstLogin: false },
    });

    return { ok: true };
  } catch (error) {
    console.error("changePassword:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
