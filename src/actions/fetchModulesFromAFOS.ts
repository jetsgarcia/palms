"use server";

import { prisma } from "@/lib/prisma";
import { modules } from "@prisma/client";

type Response = { ok: true; data: modules[] } | { ok: false; message: string };

export async function fetchModulesFromAFOS({
  afosCode,
}: {
  afosCode: string;
}): Promise<Response> {
  try {
    const modules = await prisma.modules.findMany({
      where: {
        afosCode: afosCode,
      },
    });
    return { ok: true, data: modules };
  } catch (error) {
    console.error("fetchModulesFromAFOS:", error);
    return {
      ok: false,
      message: `Failed to fetch modules from afos ${afosCode}.`,
    };
  }
}
