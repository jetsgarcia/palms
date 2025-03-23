import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button
        type="submit"
        className="cursor-pointer flex items-center gap-2 w-full"
      >
        <LogOut />
        Logout
      </button>
    </form>
  );
}
