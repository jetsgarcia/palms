"use server";

import { prisma } from "@/lib/prisma";
import { AFOSType } from "@/types/afos";

type Response = { ok: true; data: AFOSType } | { ok: false; message: string };

export async function fetchAFOSDetails({
  afosCode,
}: {
  afosCode: string;
}): Promise<Response> {
  if (!afosCode) {
    return { ok: false, message: "AFOS code is required." };
  }

  try {
    const afos = await prisma.afos.findUnique({
      where: {
        code: afosCode,
      },
    });

    if (!afos) {
      return { ok: false, message: "AFOS not found." };
    }

    return { ok: true, data: afos };
  } catch (error) {
    console.error("fetchAFOSDetails:", error);
    return { ok: false, message: "Failed to fetch AFOS details." };
  }
}
