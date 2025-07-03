"use server";

import { prisma } from "@/lib/prisma";

type CreateModuleResponse = { ok: true } | { ok: false; message: string };

interface CreateModule {
  number: number;
  name: string;
  afosCode: string;
}

export async function createModule(
  raw: CreateModule
): Promise<CreateModuleResponse> {
  const { number, name, afosCode } = raw;

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
    console.error("createModule:", error);
    return { ok: false, message: "Failed to create module." };
  }
}

type UpdateModuleResponse = { ok: true } | { ok: false; message: string };

interface UpdateModule {
  id: number;
  number: number;
  name: string;
  afosCode: string;
}

export async function updateModule(
  raw: UpdateModule
): Promise<UpdateModuleResponse> {
  const { id, number, name, afosCode } = raw;

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
    console.error("updateModule:", error);
    return { ok: false, message: "Failed to update module." };
  }
}
