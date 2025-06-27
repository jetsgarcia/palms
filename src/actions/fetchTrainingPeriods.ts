"use server";

import { prisma } from "@/lib/prisma";
import { TrainingPeriodType } from "@/types/trainingPeriod";

type Response =
  | { ok: true; data: TrainingPeriodType[] }
  | { ok: false; message: string };

export async function fetchTrainingPeriods(): Promise<Response> {
  try {
    const trainingPeriods = await prisma.training_periods.findMany();
    return { ok: true, data: trainingPeriods };
  } catch (error) {
    console.error("fetchTrainingPeriods:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
