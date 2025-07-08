"use server";

import bcrypt from "bcryptjs";
import { Role, users } from "@prisma/client";
import { instructorRegisterFormSchema } from "@/schemas/instructorRegisterForm";
import { prisma } from "@/lib/prisma";
import { generatePassword } from "@/lib/generatePassword";
import { handlePrismaError } from "@/lib/handlePrismaError";

type CreateInstructorResponse = { ok: true } | { ok: false; message: string };
type ReadInstructorResponse =
  | { ok: true; data: users[] }
  | { ok: false; message: string };

export async function createInstructor(
  input: unknown
): Promise<CreateInstructorResponse> {
  const parsed = instructorRegisterFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { firstName, lastName, middleInitial, suffix, email } = parsed.data;

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
        role: Role.INSTRUCTOR,
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
    return handlePrismaError(
      error,
      "registerInstructor",
      "register instructor"
    );
  }
}

export async function readInstructor(): Promise<ReadInstructorResponse> {
  try {
    const instructors = await prisma.users.findMany({
      where: {
        role: Role.INSTRUCTOR,
      },
    });

    return { ok: true, data: instructors };
  } catch (error) {
    return handlePrismaError(error, "readInstructor", "read instructor");
  }
}
