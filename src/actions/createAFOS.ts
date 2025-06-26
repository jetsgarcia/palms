"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createAFOSFormSchema } from "@/schemas/createAFOSForm";

export async function createAFOS(values: z.infer<typeof createAFOSFormSchema>) {
  try {
    await prisma.afos.create({
      data: {
        code: values.code,
        name: values.name,
        level: values.level,
        trainingPeriod: {
          connect: { id: values.trainingPeriodId },
        },
      },
    });

    return { success: true };
  } catch (error) {
    return { error };
  }
}
