"use server";

import { prisma } from "@/lib/prisma";

export async function fetchAFOS() {
  try {
    const afos = await prisma.afos.findMany();
    return afos;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
