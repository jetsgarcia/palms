"use server";

import { prisma } from "@/lib/prisma";

type Response = { ok: true } | { ok: false; message: string };

export async function verifyOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<Response> {
  if (!email || !otp) {
    return { ok: false, message: "Email and OTP are required." };
  }

  try {
    const record = await prisma.otp.findFirst({
      where: {
        userEmail: email,
        otp: otp,
      },
    });

    if (!record) {
      return { ok: false, message: "Invalid OTP" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { ok: false, message: "Failed to verify OTP." };
  }
}
