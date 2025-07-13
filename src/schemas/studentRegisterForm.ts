import { z } from "zod";

export const studentRegisterFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleInitial: z
    .string()
    .max(1, { message: "Middle initial should only be 1 letter" })
    .optional(),
  suffix: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  trainingPeriod: z.number().min(1, { message: "Training period is required" }),
  rank: z.string().min(1, { message: "Rank is required" }),
  afos: z.string().min(1, { message: "AFOS is required" }),
  course: z.string().min(1, { message: "Course is required" }),
});
