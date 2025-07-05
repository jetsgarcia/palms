"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { adminRegisterFormSchema } from "@/schemas/adminRegisterForm";
import { prisma } from "@/lib/prisma";
import { generatePassword } from "@/lib/generatePassword";
import { handlePrismaError } from "@/lib/handlePrismaError";

type RegisterAdminResponse = { ok: true } | { ok: false; message: string };

export async function createAdmin(
  input: unknown
): Promise<RegisterAdminResponse> {
  const parsed = adminRegisterFormSchema.safeParse(input);
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
        role: Role.ADMIN,
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
      return { ok: false, message: "Failed to send password email." };
    }

    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "registerAdmin", "register admin");
  }
}
