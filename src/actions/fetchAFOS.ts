"use server";

import { prisma } from "@/lib/prisma";
import { AFOSType } from "@/types/afos";

type Response = { ok: true; data: AFOSType[] } | { ok: false; message: string };

export async function fetchAFOS(): Promise<Response> {
  try {
    const afos = await prisma.afos.findMany();
    return { ok: true, data: afos };
  } catch (error) {
    console.error("fetchAFOS:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
