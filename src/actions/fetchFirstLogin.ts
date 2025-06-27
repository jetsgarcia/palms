"use server";

type Response =
  | { ok: true; firstLogin: boolean }
  | { ok: false; message: string };

export async function fetchFirstLogin(userId: string): Promise<Response> {
  if (userId.trim() === "") {
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

    if (!response.ok)
      return { ok: false, message: "Failed to fetch first login status" };

    const { user } = await response.json();
    if (!user) {
      return { ok: false, message: "User not found" };
    }
    return { ok: true, firstLogin: user.firstLogin };
  } catch (error) {
    console.error("fetchFirstLogin:", error);
    return { ok: false, message: "Failed to fetch first login status" };
  }
}
