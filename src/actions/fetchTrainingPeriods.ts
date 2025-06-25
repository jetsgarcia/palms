"use server";

import { prisma } from "@/lib/prisma";

export async function fetchTrainingPeriods() {
  try {
    const trainingPeriods = await prisma.training_periods.findMany();
    return { data: trainingPeriods };
  } catch (error) {
    return { error };
  }
}
