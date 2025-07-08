import { z } from "zod";

export const subjectFormSchema = z.object({
  code: z.string().min(1, { message: "Subject code is required" }),
  name: z.string().min(1, { message: "Subject name is required" }),
  instructor: z.string().optional(),
  moduleId: z.number().min(1, { message: "Module ID is required" }),
});
