"use server";

import { prisma } from "@/lib/prisma";
import { CourseCatalogType } from "@/types/courseCatalog";

type Response =
  | { ok: true; data: CourseCatalogType }
  | { ok: false; message: string };

export async function fetchCourseCatalog({
  code,
}: {
  code: string;
}): Promise<Response> {
  if (!code) {
    return { ok: false, message: "Course code is required" };
  }

  try {
    const courseCatalog = await prisma.courses.findUnique({
      where: {
        code,
      },
      include: {
        modules: {
          include: {
            subjects: {
              include: {
                users: true,
              },
            },
          },
        },
      },
    });

    if (!courseCatalog) {
      return { ok: false, message: "Course not found" };
    }

    return {
      ok: true,
      data: courseCatalog as CourseCatalogType,
    };
  } catch (error) {
    console.error("fetchCourseCatalog:", error);
    return {
      ok: false,
      message: "Failed to fetch courses catalog",
    };
  }
}
