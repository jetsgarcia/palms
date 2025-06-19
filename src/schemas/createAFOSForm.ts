import { Level } from "@prisma/client";
import { z } from "zod";

export const createAFOSFormSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  level: z.nativeEnum(Level, {
    errorMap: () => ({ message: "Level is required" }),
  }),
  trainingPeriodId: z
    .number()
    .min(1, { message: "Training Period is required" }),
});
