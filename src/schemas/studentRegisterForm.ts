import { z } from "zod";

export const studentRegisterFormSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleInitial: z
    .string()
    .max(1, { message: "Middle initial should only be 1 letter" })
    .optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  rank: z.string().min(1, { message: "Rank is required" }),
  course: z
    .string({ required_error: "Course is required" })
    .min(1, { message: "Course is required" }),
});
