"use server";

import { prisma } from "@/lib/prisma";

export async function verifyOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  if (!email || !otp) {
    throw new Error("Email and OTP are required.");
  }

  try {
    const record = await prisma.otp.findFirst({
      where: {
        userEmail: email,
        otp: otp,
      },
    });

    if (!record) {
      return { error: "Invalid OTP" };
    }

    return { success: "OTP verified" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
