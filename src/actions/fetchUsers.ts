"use server";

import { prisma } from "@/lib/prisma";
import { users } from "@prisma/client";

type Response = { ok: true; data: users[] } | { ok: false; message: string };

export async function fetchUsers(): Promise<Response> {
  try {
    const users = await prisma.users.findMany();
    return { ok: true, data: users };
  } catch (error) {
    console.error("fetchUsers:", error);
    return { ok: false, message: "Failed to fetch users list." };
  }
}
