"use client";

import type React from "react";
import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { changePassword } from "../_actions/change-password";

interface ChangePasswordProps {
  firstName?: string;
  firstTimeLogin: boolean;
  withCloseButton: boolean;
}

export default function ChangePasswordForm({
  firstName,
  firstTimeLogin,
  withCloseButton,
}: ChangePasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  // Calculate password strength
  const getPasswordStrength = () => {
    let strength = 0;
    if (hasMinLength) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecialChar) strength += 20;
    return strength;
  };

  const getStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength < 40) return "Weak";
    if (strength < 80) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch || getPasswordStrength() < 60) {
      return;
    }

    setIsSubmitting(true);

    changePassword({ newPassword: password }).then((response) => {
      if (response?.success) {
        router.push("/");
      } else {
        alert(response?.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            <div className="flex justify-between items-center">
              <span>Change Password</span>
              {withCloseButton && (
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <X />
                </Button>
              )}
            </div>
          </CardTitle>
          {firstTimeLogin && (
            <CardDescription>
              Welcome {firstName}! For security reasons, please set a new
              password before continuing.
            </CardDescription>
          )}
          {!firstTimeLogin && (
            <CardDescription>
              Welcome {firstName}! You can enter your new password below.
            </CardDescription>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  placeholder="Enter your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
              </div>

              {password && (
                <>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Password strength: {getStrengthLabel()}
                      </span>
                      <span className="text-sm">{getPasswordStrength()}%</span>
                    </div>
                    <Progress
                      value={getPasswordStrength()}
                      className={getStrengthColor()}
                    />
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      {hasMinLength ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {hasUppercase ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>At least one uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {hasLowercase ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>At least one lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {hasNumber ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>At least one number</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {hasSpecialChar ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>At least one special character</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  placeholder="Confirm your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </Button>
              </div>

              {confirmPassword && (
                <div className="mt-1 flex items-center gap-2 text-sm">
                  {passwordsMatch ? (
                    <>
                      <Check size={16} className="text-green-500" />
                      <span className="text-green-500">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      <span className="text-red-500">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={
                !passwordsMatch || getPasswordStrength() < 60 || isSubmitting
              }
            >
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
