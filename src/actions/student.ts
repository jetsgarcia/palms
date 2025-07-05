"use server";

import { handlePrismaError } from "@/lib/handlePrismaError";
import { prisma } from "@/lib/prisma";
import { StudentType } from "@/types/student";

type ReadStudentsResponse =
  | { ok: true; data: StudentType[] }
  | { ok: false; message: string };

export async function readStudents(): Promise<ReadStudentsResponse> {
  try {
    const students = await prisma.users.findMany({
      where: {
        role: "STUDENT",
      },
      include: {
        student: true,
      },
    });

    const filteredStudents = students
      .filter((user) => user.student !== null)
      .map((user) => ({
        ...user,
        student: user.student as NonNullable<typeof user.student>,
      })) as StudentType[];

    return { ok: true, data: filteredStudents };
  } catch (error) {
    return handlePrismaError(error, "readStudents", "get students");
  }
}
