"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import ChangePasswordForm from "./change-password-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendOTP } from "../_actions/send-otp";
import { verifyOTP } from "../_actions/verify-otp";

export default function OTPVerification() {
  const { data: session } = useSession();
  const [step, setStep] = useState<"initial" | "otp" | "success">("initial");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("");

  // For displaying the masked email address
  useEffect(() => {
    if (session) {
      setMaskedEmail(maskEmail(session.user.email as string));
    }
  }, [session]);

  // For countdown timer to trigger delete or activate resend button
  useEffect(() => {
    if (step === "otp" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      if (session?.user.email) {
        navigator.sendBeacon(
          "/api/delete-otp",
          JSON.stringify({ email: session?.user.email })
        );
      }
      setCanResend(true);
    }
  }, [countdown, session?.user.email, step]);

  // For deleting OTP on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!session?.user.email) return;

      // Send request before leaving
      fetch("/api/delete-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user.email }),
        keepalive: true, // Ensures the request completes before closing
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session?.user.email]);

  function maskEmail(email: string) {
    if (!email) return "";

    const [username, domain] = email.split("@");

    if (username.length <= 2) {
      return email; // Too short to mask effectively
    }

    const firstChar = username[0];
    const lastChar = username[username.length - 1];
    const maskedUsername = `${firstChar}${"*".repeat(
      username.length - 2
    )}${lastChar}`;

    return `${maskedUsername}@${domain}`;
  }

  async function handleSendOTP() {
    setLoading(true);

    try {
      sendOTP({ email: session?.user.email as string }).then((response) => {
        if (response) {
          if (response.error) {
            alert(response.error);
          }
          setLoading(false);
          setStep("otp");
          setCountdown(600);
          setCanResend(false);
        }
      });
    } catch (err) {
      alert("Failed to send OTP. Error: " + err);
    }
  }

  async function handleResendOTP() {
    setLoading(true);

    try {
      try {
        sendOTP({ email: session?.user.email as string }).then((response) => {
          if (response) {
            if (response.error) {
              alert(response.error);
              setLoading(false);
            }
            setCountdown(600);
            setCanResend(false);
            setOtp("");
            setLoading(false);
          }
        });
      } catch (err) {
        alert("Failed to send OTP. Error: " + err);
      }
    } catch (err) {
      alert("Failed to resend OTP. Error: " + err);
    }
  }

  function handleVerifyOTP() {
    setLoading(true);

    if (otp.length !== 6) {
      return;
    }

    try {
      verifyOTP({ email: session?.user.email as string, otp: otp }).then(
        (response) => {
          if (response) {
            if (response.error) {
              alert(response.error);
              setLoading(false);
            }

            if (response.success) {
              setStep("success");
              setLoading(false);
            }
          }
        }
      );
    } catch (err) {
      alert("Failed to verify OTP. Error: " + err);
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  return (
    <div className="grid gap-8">
      <div className="flex items-center mb-4 w-full">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === "initial" || step === "otp" || step === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              1
            </div>
            <div
              className={cn(
                "h-1 w-12",
                step === "initial" ? "bg-muted" : "bg-primary"
              )}
            />
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === "otp" || step === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              2
            </div>
            <div
              className={cn(
                "h-1 w-12",
                step === "success" ? "bg-primary" : "bg-muted"
              )}
            />
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              3
            </div>
          </div>
        </div>
      </div>
      {step !== "success" && (
        <Card className="w-full max-w-md mx-auto shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
            <CardDescription>
              {step === "initial" && (
                <p className="text-sm w-full">
                  For security reasons, we need to verify your identity before
                  you can change your password. We&apos;ll send a 6-digit
                  verification code to your registered email address.
                </p>
              )}

              {step === "otp" && (
                <p className="text-sm text-muted-foreground w-full">
                  {formatTime(countdown) === "0:00"
                    ? "The code has expired. Please request a new code."
                    : `We've sent a 6-digit verification code to ${maskedEmail}. The code will expire in ${formatTime(
                        countdown
                      )}.`}
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === "initial" && (
              <Button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  {!canResend && (
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}

                  <div className="text-sm text-center w-full">
                    {canResend ? (
                      <Button
                        variant={canResend ? "default" : "ghost"}
                        onClick={handleResendOTP}
                        disabled={loading}
                        className="h-auto cursor-pointer w-full"
                      >
                        Resend code
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">
                        Resend code in {formatTime(countdown)}
                      </span>
                    )}
                  </div>
                </div>

                {!canResend && (
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {step === "success" && (
        <div className="grid place-items-center">
          <ChangePasswordForm
            firstTimeLogin={false}
            firstName={session?.user?.firstName}
          />
        </div>
      )}
    </div>
  );
}
