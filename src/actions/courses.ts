"use server";

import { courses } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { courseFormSchema } from "@/schemas/courseForm";
import { handlePrismaError } from "@/lib/handlePrismaError";

type CreateCourseResponse = { ok: true } | { ok: false; message: string };
type ReadCourseResponse =
  | { ok: true; data: courses[] }
  | { ok: false; message: string };
type UpdateCoursesResponse = { ok: true } | { ok: false; message: string };
type DeleteCoursesResponse = { ok: true } | { ok: false; message: string };

export async function createCourse(
  input: unknown
): Promise<CreateCourseResponse> {
  const parsed = courseFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    const response = await prisma.courses.create({
      data: {
        code,
        name,
        level,
        trainingPeriodId,
      },
    });

    console.log(response); // TODO: Test this to see what it returns
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "createCourse", "add course");
  }
}

export async function readCourses(): Promise<ReadCourseResponse> {
  try {
    const courses = await prisma.courses.findMany();
    return { ok: true, data: courses };
  } catch (error) {
    return handlePrismaError(error, "readCourses", "get courses");
  }
}

export async function readCoursesForTrainingPeriod(
  trainingPeriodId: number
): Promise<ReadCourseResponse> {
  try {
    const courses = await prisma.courses.findMany({
      where: { trainingPeriodId },
    });
    return { ok: true, data: courses };
  } catch (error) {
    return handlePrismaError(error, "readCourses", "get courses");
  }
}

export async function updateCourse(
  input: unknown
): Promise<UpdateCoursesResponse> {
  const parsed = courseFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, code, level, trainingPeriodId } = parsed.data;

  try {
    await prisma.courses.update({
      where: { code },
      data: {
        name,
        level,
        trainingPeriodId,
      },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "updateCourse", "edit course");
  }
}

export async function deleteCourse(
  code: string
): Promise<DeleteCoursesResponse> {
  if (!code) {
    return { ok: false, message: "Code is required" };
  }

  try {
    await prisma.courses.delete({
      where: { code },
    });
    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "deleteCourse", "delete course");
  }
}
