import { z } from "zod";

export const trainingPeriodFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    weeks: z.number().min(1, { message: "Weeks must be at least 1" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must not be earlier than start date",
    path: ["endDate"],
  })
  .refine((data) => data.startDate >= new Date(), {
    message: "Start date must not be in the past",
    path: ["startDate"],
  })
  .refine(
    (data) => {
      const oneYearLater = new Date(data.startDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      return data.endDate <= oneYearLater;
    },
    {
      message: "Date range must not exceed 1 year",
      path: ["endDate"],
    }
  );
