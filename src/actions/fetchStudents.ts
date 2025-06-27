"use server";

import { prisma } from "@/lib/prisma";
import { StudentType } from "@/types/student";

type Response =
  | { ok: true; data: StudentType[] }
  | { ok: false; message: string };

export async function fetchStudents(): Promise<Response> {
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
    console.error("fetchStudents:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
