"use server";

import { prisma } from "@/lib/prisma";

export async function fetchAFOS() {
  try {
    const afos = await prisma.afos.findMany();
    return { data: afos };
  } catch (error) {
    return { error };
  }
}
