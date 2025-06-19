"use server";

export async function fetchFirstLogin(userId: string) {
  try {
    const response = await fetch(
      `${process.env.APP_API_BASE_URL}/api/first-login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch first login status");

    const { user } = await response.json();
    return user?.firstLogin;
  } catch (error) {
    console.error("Error fetching first login status:", error);
    return false;
  }
}
