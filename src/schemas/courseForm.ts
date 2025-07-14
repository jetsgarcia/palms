import { Level } from "@prisma/client";
import { z } from "zod";

export const courseFormSchema = z.object({
  code: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  level: z.nativeEnum(Level, {
    errorMap: () => ({ message: "Level is required" }),
  }),
  trainingPeriodId: z.number({ required_error: "Training Period is required" }),
});
