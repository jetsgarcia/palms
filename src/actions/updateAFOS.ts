"use server";

import { prisma } from "@/lib/prisma";
import { AFOSFormSchema } from "@/schemas/AFOSForm";

type Response = { ok: true } | { ok: false; message: string };

export async function updateAFOS(raw: unknown): Promise<Response> {
  const parsed = AFOSFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input." };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    await prisma.afos.update({
      where: { code },
      data: {
        name,
        level,
        trainingPeriodId,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("updateAFOS:", error);
    return { ok: false, message: "Failed to edit AFOS." };
  }
}
