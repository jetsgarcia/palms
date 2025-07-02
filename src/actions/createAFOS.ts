"use server";

import { prisma } from "@/lib/prisma";
import { AFOSFormSchema } from "@/schemas/AFOSForm";

type Response = { ok: true } | { ok: false; message: string };

export async function createAFOS(raw: unknown): Promise<Response> {
  const parsed = AFOSFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input." };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    await prisma.afos.create({
      data: {
        code: code,
        name: name,
        level: level,
        trainingPeriod: {
          connect: { id: trainingPeriodId },
        },
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("createAFOS:", error);
    return { ok: false, message: "Failed to create AFOS." };
  }
}
