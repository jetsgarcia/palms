"use server";

import { prisma } from "@/lib/prisma";

type Response = { ok: true } | { ok: false; message: string };

export async function deleteAFOS(code: string): Promise<Response> {
  if (!code) {
    return { ok: false, message: "Code is required." };
  }

  try {
    await prisma.afos.delete({
      where: { code },
    });
    return { ok: true };
  } catch (error) {
    console.error("deleteAFOS:", error);
    return { ok: false, message: "Failed to delete AFOS." };
  }
}
