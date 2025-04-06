import { auth } from "@/lib/auth";
import ChangePasswordForm from "./_components/change-password-form";
import ChangePasswordWithOTPForm from "./_components/change-password-with-otp-form";

export default async function ChangePasswordPage() {
  const session = await auth();
  const firstLogin = await fetchFirstLogin(session?.user.id as string);

  // Change password for unauthenticated users
  if (!session) {
    return (
      <ChangePasswordWithOTPForm
        steps={["Enter Email", "Verify OTP", "Change Password"]}
        type="unauthenticated"
      />
    );
  }

  // Change password for first time login
  if (firstLogin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ChangePasswordForm
          firstTimeLogin={true}
          firstName={session.user.firstName}
        />
      </div>
    );
  }

  // Change password for authenticated users
  return (
    <ChangePasswordWithOTPForm
      steps={["Enter Email", "Verify OTP", "Change Password"]}
      type="authenticated"
    />
  );
}

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
