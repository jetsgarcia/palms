"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function sendOTP({ email }: { email: string }) {
  const session = await auth();

  if (!email) {
    return { error: "Email required" };
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.otp.create({
      data: {
        userEmail: email,
        otp,
      },
    });

    try {
      const response = await fetch(`${process.env.APP_API_BASE_URL}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: session?.user.firstName,
          otp: otp,
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }

    return { success: "Email sent" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }

  return null;
}
