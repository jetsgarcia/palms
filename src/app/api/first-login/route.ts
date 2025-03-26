import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { firstLogin: true },
    });

    return Response.json({ user });
  } catch (error) {
    return Response.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
