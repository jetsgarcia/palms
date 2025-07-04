import { Prisma } from "@prisma/client";

type PrismaErrorResponse = { ok: false; message: string };

export function handlePrismaError(
  error: unknown,
  functionName: string,
  action: string
): PrismaErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2000") {
      return { ok: false, message: "Input is too long" };
    } else if (error.code === "P2001") {
      return { ok: false, message: "Item not found" };
    } else if (error.code === "P2002") {
      return { ok: false, message: "Duplicate value found" };
    } else if (error.code === "P2033") {
      return { ok: false, message: "Number is too big" };
    } else {
      console.error(
        `Unhandled Prisma error code in ${functionName}:`,
        error.code
      );
      return { ok: false, message: `Failed to ${action}` };
    }
  } else {
    console.error(`Non-Prisma error in ${functionName}:`, error);
    return { ok: false, message: "An unexpected error occurred" };
  }
}
