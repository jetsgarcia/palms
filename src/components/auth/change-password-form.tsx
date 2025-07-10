"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { changePassword } from "@/actions/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordFields from "./password-fields";

interface ChangePasswordProps {
  firstName?: string;
  firstTimeLogin: boolean;
  withoutHeader?: boolean;
  logoutAfterChangePassword?: boolean;
  email?: string;
}

export default function ChangePasswordForm({
  firstName,
  firstTimeLogin,
  withoutHeader,
  logoutAfterChangePassword,
  email,
}: ChangePasswordProps) {
  const router = useRouter();
  const { data: session } = useSession();
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

  function getPasswordStrength() {
    let strength = 0;
    if (hasMinLength) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecialChar) strength += 20;
    return strength;
  }

  function getStrengthLabel() {
    const strength = getPasswordStrength();
    if (strength < 40) return "Weak";
    if (strength < 80) return "Medium";
    return "Strong";
  }

  function getStrengthColor() {
    const strength = getPasswordStrength();
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!passwordsMatch || getPasswordStrength() < 60) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await changePassword({
        newPassword: password,
        email: email,
      });

      if (response.ok) {
        if (logoutAfterChangePassword) {
          toast.success("Password changed successfully. Please log in again.");
          if (session) {
            signOut({ redirectTo: "/login" });
          }
        } else {
          toast.success("Password changed successfully.");
          router.refresh();
        }

        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to change password.");
    }
  }

  if (withoutHeader) {
    return (
      <PasswordFields
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        passwordsMatch={passwordsMatch}
        getPasswordStrength={getPasswordStrength}
        getStrengthLabel={getStrengthLabel}
        getStrengthColor={getStrengthColor}
        hasMinLength={hasMinLength}
        hasUppercase={hasUppercase}
        hasLowercase={hasLowercase}
        hasNumber={hasNumber}
        hasSpecialChar={hasSpecialChar}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-110">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl">
            <span>Change Password</span>
          </CardTitle>
          {firstTimeLogin && (
            <CardDescription>
              Welcome, {firstName}! For security reasons, please set a new
              password before continuing.
            </CardDescription>
          )}
          {!firstTimeLogin && (
            <CardDescription>
              Welcome {firstName}! You can enter your new password below.
            </CardDescription>
          )}
        </CardHeader>
        <div className="px-6">
          <PasswordFields
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            passwordsMatch={passwordsMatch}
            getPasswordStrength={getPasswordStrength}
            getStrengthLabel={getStrengthLabel}
            getStrengthColor={getStrengthColor}
            hasMinLength={hasMinLength}
            hasUppercase={hasUppercase}
            hasLowercase={hasLowercase}
            hasNumber={hasNumber}
            hasSpecialChar={hasSpecialChar}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
    </div>
  );
}
