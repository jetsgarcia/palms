"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import AuthBackButton from "./auth-back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { sendOTP } from "../_actions/send-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "../_actions/verify-otp";
import ChangePasswordForm from "./change-password-form";
import { emailChecker } from "../_actions/email-checker";

interface ChangePasswordWithOTPFormProps {
  steps: string[];
  type: "unauthenticated" | "authenticated";
}

export default function ChangePasswordWithOTPForm({
  steps,
  type,
}: ChangePasswordWithOTPFormProps) {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  // For countdown timer to trigger delete or activate resend button
  useEffect(() => {
    if (currentStep === 1 && countdown > 0) {
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
  }, [countdown, session?.user.email, currentStep]);

  // For deleting OTP on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!session?.user.email) return;

      // Send request before leaving
      fetch("/api/delete-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user.email }),
        keepalive: true,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session?.user.email]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  async function handleSendOTP(email: string) {
    setLoading(true);

    const existingEmail = await emailChecker({ email: email });
    if (existingEmail?.error) {
      alert(existingEmail.error);
      setLoading(false);
      return;
    }

    if (!existingEmail) {
      alert("Email not registered. Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      sendOTP({ email: email }).then((response) => {
        if (response) {
          if (response.error) {
            alert(response.error);
          }
          setLoading(false);
          setCurrentStep(1);
          setCountdown(600);
          setCanResend(false);
        }
      });
    } catch (err) {
      alert("Failed to send OTP. Error: " + err);
    }
  }

  async function handleResendOTP(email: string) {
    setLoading(true);

    try {
      try {
        sendOTP({ email: email }).then((response) => {
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

  function handleVerifyOTP(email: string) {
    setLoading(true);

    if (otp.length !== 6) {
      return;
    }

    try {
      verifyOTP({ email: email, otp: otp }).then((response) => {
        if (response) {
          if (response.error) {
            alert(response.error);
            setLoading(false);
          }

          if (response.success) {
            setCurrentStep(2);
            setLoading(false);
          }
        }
      });
    } catch (err) {
      alert("Failed to verify OTP. Error: " + err);
    }
  }

  return (
    <div className="p-4 mb-8">
      <AuthBackButton />
      <div className="flex items-center w-min m-auto mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* For number indicator */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>

            {/* For horizontal line */}
            {index <= steps.length - 2 && (
              <div
                className={cn(
                  "h-1 w-12",
                  index <= currentStep - 1 ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="w-110 m-auto mt-0 bg-white">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            {currentStep === 0 && (
              <p>
                We&apos;ll send a 6-digit verification code to your registered
                email address.
              </p>
            )}

            {currentStep === 1 && (
              <p className="text-sm text-muted-foreground w-full">
                {formatTime(countdown) === "0:00"
                  ? "The code has expired. Please request a new code."
                  : `We've sent a 6-digit verification code to your email. The code will expire in ${formatTime(
                      countdown
                    )}.`}
              </p>
            )}

            {currentStep === 2 && (
              <p>
                Enter your new password below. Make sure it meets the
                requirements.
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <>
              {type === "unauthenticated" && (
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mb-4"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendOTP(email);
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleSendOTP(email)}
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
                </div>
              )}
              {type === "authenticated" && (
                <Button
                  onClick={() => handleSendOTP(session?.user.email as string)}
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
            </>
          )}

          {currentStep === 1 && (
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
                      onClick={() => {
                        if (session?.user.email) {
                          handleResendOTP(session?.user.email);
                        } else if (email) {
                          handleResendOTP(email);
                        }
                      }}
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
                  onClick={() => {
                    if (session?.user.email) {
                      handleVerifyOTP(session?.user.email);
                    } else if (email) {
                      handleVerifyOTP(email);
                    }
                  }}
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

          {currentStep === 2 && (
            <ChangePasswordForm firstTimeLogin={false} withoutHeader={true} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
