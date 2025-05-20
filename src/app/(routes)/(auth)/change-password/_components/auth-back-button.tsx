"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthBackButton() {
  const { data: session } = useSession();
  const router = useRouter();

  function handleBackButtonClick() {
    router.back();
    navigator.sendBeacon(
      "/api/delete-otp",
      JSON.stringify({ email: session?.user.email })
    );
  }

  return (
    <Button variant="ghost" onClick={handleBackButtonClick}>
      <ChevronLeft />
      <span>Go back</span>
    </Button>
  );
}
