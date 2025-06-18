"use server";

import { prisma } from "@/lib/prisma";

export async function fetchUsers() {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function fetchStudents() {
  try {
    const students = await prisma.users.findMany({
      where: {
        role: "STUDENT",
      },
      include: {
        student: true,
      },
    });
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}
