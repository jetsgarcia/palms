"use server";

import { prisma } from "@/lib/prisma";
import { users } from "@prisma/client";

type Response = { ok: true; data: users[] } | { ok: false; message: string };

export async function fetchUsers(): Promise<Response> {
  try {
    const users = await prisma.users.findMany({
      include: {
        student: {
          include: {
            training_periods: true,
          },
        },
        subjects: true,
      },
    });
    return { ok: true, data: users };
  } catch (error) {
    console.error("fetchUsers:", error);
    return { ok: false, message: "Failed to fetch users list." };
  }
}
