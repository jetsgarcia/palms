"use server";

import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { training_periods } from "@prisma/client";

type CreateTrainingPeriodResponse =
  | { ok: true }
  | { ok: false; message: string };
type ReadTrainingPeriodsResponse =
  | { ok: true; data: training_periods[] }
  | { ok: false; message: string };
type UpdateTrainingPeriodResponse =
  | { ok: true }
  | { ok: false; message: string };

export async function createTrainingPeriod(
  input: unknown
): Promise<CreateTrainingPeriodResponse> {
  const parsed = trainingPeriodFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, startDate, endDate, weeks } = parsed.data;

  try {
    await prisma.training_periods.create({
      data: { name, startDate, endDate, weeks },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(
      error,
      "createTrainingPeriod",
      "add training period"
    );
  }
}

export async function readTrainingPeriods(): Promise<ReadTrainingPeriodsResponse> {
  try {
    const trainingPeriods = await prisma.training_periods.findMany();
    return { ok: true, data: trainingPeriods };
  } catch (error) {
    return handlePrismaError(
      error,
      "readTrainingPeriods",
      "get training periods"
    );
  }
}

export async function updateTrainingPeriod(
  input: unknown,
  id: number
): Promise<UpdateTrainingPeriodResponse> {
  const parsed = trainingPeriodFormSchema.safeParse(input);
  if (!id) return { ok: false, message: "ID is required" };
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, startDate, endDate, weeks } = parsed.data;

  try {
    await prisma.training_periods.update({
      where: { id },
      data: { name, startDate, endDate, weeks },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(
      error,
      "updateTrainingPeriod",
      "edit training period"
    );
  }
}
