"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generatePassword } from "@/lib/generatePassword";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { studentRegisterFormSchema } from "@/schemas/studentRegisterForm";

type CreateStudentResponse = { ok: true } | { ok: false; message: string };
type UpdateStudentResponse = { ok: true } | { ok: false; message: string };

export async function createStudent(
  input: unknown
): Promise<CreateStudentResponse> {
  const parsed = studentRegisterFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const {
    firstName,
    lastName,
    middleInitial,
    suffix,
    email,
    serialNumber,
    trainingPeriod,
    rank,
    afos,
    course,
  } = parsed.data;

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { ok: false, message: "Email already exists" };
    }

    const generatedPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    await prisma.users.create({
      data: {
        lastName,
        firstName,
        middleInitial: middleInitial || null,
        suffix: suffix || null,
        email,
        password: hashedPassword,
        firstLogin: true,
        role: Role.STUDENT,
        student: {
          create: {
            serialNumber,
            trainingPeriodId: trainingPeriod,
            rank,
            afos,
            course: course || null,
            remarks: "",
          },
        },
      },
    });

    const emailResponse = await fetch(
      `${process.env.APP_API_BASE_URL}/api/send-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          password: generatedPassword,
        }),
      }
    );

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Failed to send password email:", errorText);
      return { ok: false, message: "Failed to send email containing password" };
    }

    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "createStudent", "register student");
  }
}

export async function updateStudent(
  input: unknown,
  id: string
): Promise<UpdateStudentResponse> {
  const parsed = studentRegisterFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  if (!id) {
    return { ok: false, message: "User ID is required" };
  }

  const {
    firstName,
    lastName,
    middleInitial,
    suffix,
    email,
    serialNumber,
    trainingPeriod,
    rank,
    afos,
    course,
  } = parsed.data;

  try {
    await prisma.users.update({
      where: { id },
      data: {
        firstName,
        lastName,
        middleInitial: middleInitial || null,
        suffix: suffix || null,
        email,
        student: {
          update: {
            serialNumber,
            trainingPeriodId: trainingPeriod,
            rank,
            afos,
            course: course || null,
          },
        },
      },
    });

    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "updateInstructor", "edit instructor");
  }
}
