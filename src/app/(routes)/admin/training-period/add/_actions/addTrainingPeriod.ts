"use server";

import { z } from "zod";
import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
import { prisma } from "@/lib/prisma";

export async function addTrainingPeriod(
  values: z.infer<typeof trainingPeriodFormSchema>
) {
  try {
    await prisma.training_periods.create({
      data: {
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
        weeks: values.weeks,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
