"use server";

import { z } from "zod";
import { instructorRegisterFormSchema } from "../../../../../../schemas/instructorRegisterForm";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function registerInstructor(
  values: z.infer<typeof instructorRegisterFormSchema>
) {
  function generateSecurePassword(length: number = 12): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }
    return password;
  }

  const existingUser = await prisma.users.findUnique({
    where: {
      email: values.email,
    },
  });

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const generatedPassword = generateSecurePassword();

  const instructor = {
    ...values,
    password: generatedPassword,
    role: Role.INSTRUCTOR,
    firstLogin: true,
  };

  await fetch(`${process.env.APP_API_BASE_URL}/api/send-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: instructor.firstName,
      email: instructor.email,
      password: instructor.password,
    }),
  });

  try {
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    await prisma.users.create({
      data: {
        lastName: instructor.lastName,
        firstName: instructor.firstName,
        middleInitial: instructor.middleInitial || null,
        suffix: instructor.suffix || null,
        email: instructor.email,
        password: hashedPassword,
        firstLogin: instructor.firstLogin,
        role: instructor.role,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
