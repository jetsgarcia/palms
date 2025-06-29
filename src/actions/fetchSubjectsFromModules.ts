"use server";

import { prisma } from "@/lib/prisma";
import { subjects } from "@prisma/client";

type Response = { ok: true; data: subjects[] } | { ok: false; message: string };

export async function fetchSubjectsFromModules({
  moduleIds,
}: {
  moduleIds: number[];
}): Promise<Response> {
  try {
    const subjects = await prisma.subjects.findMany({
      where: {
        moduleId: {
          in: moduleIds,
        },
      },
    });
    return { ok: true, data: subjects };
  } catch (error) {
    console.error("fetchSubjectsFromModules:", error);
    return {
      ok: false,
      message: `Failed to fetch subjects.`,
    };
  }
}
