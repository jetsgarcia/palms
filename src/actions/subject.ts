"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { subjectFormSchema } from "@/schemas/subjectForm";

type CreateSubjectResponse = { ok: true } | { ok: false; message: string };
type UpdateSubjectResponse = { ok: true } | { ok: false; message: string };
type DeleteSubjectResponse = { ok: true } | { ok: false; message: string };

export async function createSubject(
  input: unknown
): Promise<CreateSubjectResponse> {
  const parsed = subjectFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { code, name, instructor, moduleId } = parsed.data;

  try {
    await prisma.subjects.create({
      data: {
        code,
        name,
        instructorId: instructor || null,
        moduleId,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("Error creating subject:", error);
    return handlePrismaError(error, "createSubject", "add subject");
  }
}

export async function updateSubject(
  input: unknown
): Promise<UpdateSubjectResponse> {
  const parsed = subjectFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { code, name, instructor, moduleId } = parsed.data;

  try {
    await prisma.subjects.update({
      where: { code },
      data: {
        name,
        instructorId: instructor || null,
        moduleId,
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "updateSubject", "edit subject");
  }
}

export async function deleteSubject(
  code: string
): Promise<DeleteSubjectResponse> {
  if (code === null || code === undefined) {
    return { ok: false, message: "Subject code is required" };
  }
  try {
    await prisma.subjects.delete({
      where: { code },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "deleteSubject", "delete subject");
  }
}
