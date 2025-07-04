"use server";

import { handlePrismaError } from "@/lib/handlePrismaError";
import { prisma } from "@/lib/prisma";

type SendOTPResponse = { ok: true } | { ok: false; message: string };
type VerifyOTPResponse = { ok: true } | { ok: false; message: string };

export async function sendOTP({
  email,
}: {
  email: string;
}): Promise<SendOTPResponse> {
  if (!email) {
    return { ok: false, message: "Email is required" };
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
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

    await fetch(`${process.env.APP_API_BASE_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.firstName,
        otp,
        email,
      }),
    });

    return { ok: true };
  } catch (error) {
    return handlePrismaError(error, "sendOTP", "send OTP");
  }
}

export async function verifyOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<VerifyOTPResponse> {
  if (!email || !otp) {
    return { ok: false, message: "Email and OTP are required" };
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
    return handlePrismaError(error, "verifyOTP", "verify OTP");
  }
}
