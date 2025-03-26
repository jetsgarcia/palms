import { auth } from "@/lib/auth";
import ChangePasswordForm from "./_components/change-password-form";

async function fetchFirstLogin(userId: string) {
  try {
    const response = await fetch("http://localhost:3000/api/first-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) throw new Error("Failed to fetch first login status");

    const { user } = await response.json();
    return user?.firstLogin;
  } catch (error) {
    console.error("Error fetching first login status:", error);
    return false;
  }
}

export default async function ChangePasswordPage() {
  const session = await auth();

  const firstLogin = await fetchFirstLogin(session?.user.id as string);

  // Change password authenticated users through email
  if (!session) {
    return <div></div>;
  }

  // Change password for first time login
  if (firstLogin) {
    return (
      <ChangePasswordForm
        firstTimeLogin={true}
        firstName={session.user.firstName}
        withCloseButton={false}
      />
    );
  }

  // Change password for authenticated users through login
  return <div></div>;
}
