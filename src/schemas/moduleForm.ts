import { z } from "zod";

export const moduleFormSchema = z.object({
  id: z.number().optional(),
  number: z.number().min(1, { message: "Module number is required" }),
  name: z.string().min(1, { message: "Module name is required" }),
  afosCode: z.string().min(1, { message: "AFOS code is required" }),
});
