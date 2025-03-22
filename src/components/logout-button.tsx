import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="cursor-pointer">
        Logout
      </Button>
    </form>
  );
}
