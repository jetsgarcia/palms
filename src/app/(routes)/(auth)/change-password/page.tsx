import { auth } from "@/lib/auth";
import ChangePasswordForm from "@/components/change-password-form";
import ChangePasswordWithOTPForm from "@/components/change-password-with-otp-form";
import { fetchFirstLogin } from "@/actions/fetchFirstLogin";

export default async function ChangePasswordPage() {
  const session = await auth();

  // Change password for unauthenticated users
  if (!session) {
    return (
      <ChangePasswordWithOTPForm
        type="unauthenticated"
        logoutAfterChangePassword={false}
      />
    );
  }

  // Only fetch firstLogin if user is authenticated
  let firstLogin = false;
  try {
    const response = await fetchFirstLogin(session?.user.id as string);
    if (response.ok) {
      firstLogin = response.firstLogin;
    }
  } catch (error) {
    console.error(error);
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
      type="authenticated"
      logoutAfterChangePassword={true}
    />
  );
}
