"use server";

import { z } from "zod";
import { adminRegisterFormSchema } from "../../../../../../schemas/adminRegisterForm";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function registerAdmin(
  values: z.infer<typeof adminRegisterFormSchema>
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

  const admin = {
    ...values,
    password: generatedPassword,
    role: Role.ADMIN,
    firstLogin: true,
  };

  await fetch(`${process.env.APP_API_BASE_URL}/api/send-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: admin.firstName,
      email: admin.email,
      password: admin.password,
    }),
  });

  try {
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    await prisma.users.create({
      data: {
        lastName: admin.lastName,
        firstName: admin.firstName,
        middleInitial: admin.middleInitial || null,
        suffix: admin.suffix || null,
        email: admin.email,
        password: hashedPassword,
        firstLogin: admin.firstLogin,
        role: admin.role,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
