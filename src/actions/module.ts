"use server";

import z from "zod";
import { prisma } from "@/lib/prisma";
import { moduleFormSchema } from "@/schemas/moduleForm";
import { handlePrismaError } from "@/lib/handlePrismaError";

type CreateModuleResponse = { ok: true } | { ok: false; message: string };
type UpdateModuleResponse = { ok: true } | { ok: false; message: string };
type DeleteModuleResponse = { ok: true } | { ok: false; message: string };

export async function createModule(
  input: unknown
): Promise<CreateModuleResponse> {
  const parsed = moduleFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { number, name, afosCode } = parsed.data;

  try {
    await prisma.modules.create({
      data: {
        number,
        name,
        afosCode,
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "createModule", "add module");
  }
}

export async function updateModule(
  input: unknown
): Promise<UpdateModuleResponse> {
  const updateModuleSchema = moduleFormSchema.extend({ id: z.number() });

  const parsed = updateModuleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { id, number, name, afosCode } = parsed.data;

  try {
    await prisma.modules.update({
      where: { id },
      data: {
        number,
        name,
        afosCode,
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "updateModule", "edit module");
  }
}

export async function deleteModule(id: number): Promise<DeleteModuleResponse> {
  if (id === null || id === undefined) {
    return { ok: false, message: "Module ID is required" };
  }
  try {
    await prisma.modules.delete({
      where: { id },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "deleteModule", "delete module");
  }
}
