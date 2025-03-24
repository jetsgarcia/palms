import { auth } from "@/lib/auth";
import ChangePasswordForm from "./_components/change-password-form";

export default async function ChangePasswordPage() {
  const session = await auth();

  // Change password authenticated users through email
  if (!session) {
    return <div></div>;
  }

  // Change password for first time login
  if (session.user.firstLogin) {
    return (
      <ChangePasswordForm
        firstTimeLogin={true}
        firstName={session.user.firstName}
      />
    );
  }

  // Change password for authenticated users through login
  return <div></div>;
}
