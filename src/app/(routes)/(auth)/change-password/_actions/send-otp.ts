"use server";

import { prisma } from "@/lib/prisma";

export async function sendOTP({ email }: { email: string }) {
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

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        firstName: true,
      },
    });

    try {
      const response = await fetch(
        `${process.env.APP_API_BASE_URL}/api/otp/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user?.firstName,
            otp: otp,
            email: email,
          }),
        }
      );

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
