"use server";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/loginSchema";
import { auth, signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

type LoginResponse = { ok: true } | { ok: false; message: string };
type FetchFirstLoginResponse =
  | { ok: true; firstLogin: boolean }
  | { ok: false; message: string };
type ChangePasswordResponse = { ok: true } | { ok: false; message: string };

export async function login(input: unknown): Promise<LoginResponse> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { email, password } = parsed.data;

  const user = await prisma.users.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return { ok: false, message: "Email does not exist" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, message: "Invalid password" };
        default:
          return { ok: false, message: "Something went wrong" };
      }
    }
    console.log("login:", error);
    return { ok: false, message: "An unexpected error occurred" };
  }
}

export async function fetchFirstLogin(
  userId: string
): Promise<FetchFirstLoginResponse> {
  if (userId && userId.trim() === "") {
    return { ok: false, message: "Must provide a user ID" };
  }

  try {
    const response = await fetch(
      `${process.env.APP_API_BASE_URL}/api/first-login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch first login status:", response.statusText);
      return { ok: false, message: "Failed to fetch first login status" };
    }

    const data = await response.json();
    console.log(data);

    if (!data.user) {
      return { ok: false, message: "User not found" };
    }

    return { ok: true, firstLogin: data.user.firstLogin };
  } catch (error) {
    console.error("fetchFirstLogin:", error);
    return { ok: false, message: "Failed to fetch first login status" };
  }
}

export async function changePassword({
  newPassword,
  email,
}: {
  newPassword: string;
  // Email is used to get the user ID. It's optional because ID can be retrieved from the session. Basically, this is only used when the user is not logged in.
  email?: string;
}): Promise<ChangePasswordResponse> {
  const session = await auth();

  if (!newPassword) return { ok: false, message: "New password required" };

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userId =
      session?.user.id ??
      (await prisma.users.findFirst({ where: { email } }))?.id;

    if (!userId) return { ok: false, message: "User not found" };

    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword, firstLogin: false },
    });

    return { ok: true };
  } catch (error) {
    console.error("changePassword:", error);
    return { ok: false, message: "Failed to change password" };
  }
}
