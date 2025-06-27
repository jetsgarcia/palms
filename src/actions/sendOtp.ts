"use server";

import { prisma } from "@/lib/prisma";

type Response = { ok: true } | { ok: false; message: string };

export async function sendOTP({ email }: { email: string }): Promise<Response> {
  if (!email) {
    return { ok: false, message: "Email required" };
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
      return { ok: false, message: "Email does not exist" };
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
      return { ok: false, message: "Failed to send otp" };
    }
    return { ok: true };
  } catch (error) {
    console.error("sendOTP:", error);
    return { ok: false, message: "Failed to send OTP." };
  }
}
