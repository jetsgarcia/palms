"use server";

import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
import { prisma } from "@/lib/prisma";

type Response = { ok: true } | { ok: false; message: string };

export async function addTrainingPeriod(raw: unknown): Promise<Response> {
  const parsed = trainingPeriodFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input." };
  }

  const { name, startDate, endDate, weeks } = parsed.data;

  try {
    await prisma.training_periods.create({
      data: { name, startDate, endDate, weeks },
    });
    return { ok: true };
  } catch (error) {
    console.error("addTrainingPeriod:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
