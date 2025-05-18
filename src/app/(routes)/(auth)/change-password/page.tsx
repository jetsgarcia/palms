import { auth } from "@/lib/auth";
import ChangePasswordForm from "./_components/change-password-form";
import ChangePasswordWithOTPForm from "./_components/change-password-with-otp-form";
import { fetchFirstLogin } from "./_actions/fetch-first-login";

export default async function ChangePasswordPage() {
  const session = await auth();
  const firstLogin = await fetchFirstLogin(session?.user.id as string);

  // Change password for unauthenticated users
  if (!session) {
    return (
      <ChangePasswordWithOTPForm
        type="unauthenticated"
        logoutAfterChangePassword={false}
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
      type="authenticated"
      logoutAfterChangePassword={true}
    />
  );
}
