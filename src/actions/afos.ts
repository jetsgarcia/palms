"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { AFOSFormSchema } from "@/schemas/AFOSForm";
import { afos } from "@prisma/client";

type CreateAFOSResponse = { ok: true } | { ok: false; message: string };
type ReadAFOSResponse =
  | { ok: true; data: afos[] }
  | { ok: false; message: string };
type UpdateAFOSResponse = { ok: true } | { ok: false; message: string };
type DeleteAFOSResponse = { ok: true } | { ok: false; message: string };

export async function createAFOS(input: unknown): Promise<CreateAFOSResponse> {
  const parsed = AFOSFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    await prisma.afos.create({
      data: {
        code,
        name,
        level,
        trainingPeriod: {
          connect: { id: trainingPeriodId },
        },
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "createAFOS", "add AFOS");
  }
}

export async function readAFOS(): Promise<ReadAFOSResponse> {
  try {
    const afos = await prisma.afos.findMany();
    return { ok: true, data: afos };
  } catch (error) {
    return handlePrismaError(error, "readAFOS", "get AFOS");
  }
}

export async function updateAFOS(input: unknown): Promise<UpdateAFOSResponse> {
  const parsed = AFOSFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    await prisma.afos.update({
      where: { code },
      data: {
        name,
        level,
        trainingPeriod: {
          connect: { id: trainingPeriodId },
        },
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "updateAFOS", "update AFOS");
  }
}

export async function deleteAFOS(code: string): Promise<DeleteAFOSResponse> {
  if (!code) {
    return { ok: false, message: "Code is required" };
  }

  try {
    await prisma.afos.delete({
      where: { code },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "deleteAFOS", "delete AFOS");
  }
}
