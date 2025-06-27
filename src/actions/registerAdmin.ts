"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { adminRegisterFormSchema } from "@/schemas/adminRegisterForm";
import { prisma } from "@/lib/prisma";

type Response = { ok: true } | { ok: false; message: string };

export async function registerAdmin(
  values: z.infer<typeof adminRegisterFormSchema>
): Promise<Response> {
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
    return { ok: false, message: "Email already exists" };
  }

  const generatedPassword = generateSecurePassword();

  const admin = {
    ...values,
    password: generatedPassword,
    role: Role.ADMIN,
    firstLogin: true,
  };

  const emailResponse = await fetch(
    `${process.env.APP_API_BASE_URL}/api/send-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: admin.firstName,
        email: admin.email,
        password: admin.password,
      }),
    }
  );

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Failed to send password email:", errorText);
    return { ok: false, message: "Failed to send password email." };
  }

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

    return { ok: true };
  } catch (error) {
    console.error("registerAdmin:", error);
    return { ok: false, message: "Database error. Please retry later." };
  }
}
