"use server";

import { prisma } from "@/lib/prisma";
import { AFOSDetailsModuleAndSubjectType } from "@/types/AFOSDetailsModuleAndSubjectType";

type Response =
  | { ok: true; data: AFOSDetailsModuleAndSubjectType }
  | { ok: false; message: string };

export async function fetchAFOSWithModulesAndSubjects({
  afosCode,
}: {
  afosCode: string;
}): Promise<Response> {
  if (!afosCode) {
    return { ok: false, message: "AFOS code is required." };
  }

  try {
    const afosFullDetails = await prisma.afos.findUnique({
      where: {
        code: afosCode,
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

    if (!afosFullDetails) {
      return { ok: false, message: "AFOS not found." };
    }

    return {
      ok: true,
      data: afosFullDetails as AFOSDetailsModuleAndSubjectType,
    };
  } catch (error) {
    console.error("fetchAFOSWithModulesAndSubjects:", error);
    return {
      ok: false,
      message: "Failed to fetch AFOS, modules and subjects.",
    };
  }
}
