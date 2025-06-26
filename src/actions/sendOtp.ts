"use server";

import { prisma } from "@/lib/prisma";

export async function sendOTP({ email }: { email: string }) {
  if (!email) {
    return { error: "Email required" };
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        firstName: true,
      },
    });

    if (!user) {
      return { error: "Email used does not exist" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.otp.create({
      data: {
        userEmail: email,
        otp,
      },
    });

    try {
      await fetch(`${process.env.APP_API_BASE_URL}/api/otp/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.firstName,
          otp: otp,
          email: email,
        }),
      });
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return { error: "Failed to send OTP email" };
    }
    return { success: "Email sent" };
  } catch (error) {
    return { error };
  }
}
