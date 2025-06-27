"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/user";

type Response = { ok: true; data: UserType[] } | { ok: false; message: string };

export async function fetchUsers(): Promise<Response> {
  try {
    const users = await prisma.users.findMany();
    return { ok: true, data: users };
  } catch (error) {
    console.error("fetchUsers:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
