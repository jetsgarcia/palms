import { z } from "zod";

export const instructorRegisterFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleInitial: z
    .string()
    .max(1, { message: "Middle initial should only be 1 letter" })
    .optional(),
  suffix: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
});
