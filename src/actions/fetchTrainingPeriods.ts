"use server";

import { prisma } from "@/lib/prisma";

export async function fetchTrainingPeriods() {
  try {
    const trainingPeriods = await prisma.training_periods.findMany();
    return trainingPeriods;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
