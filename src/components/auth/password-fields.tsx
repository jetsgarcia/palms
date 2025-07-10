import { Check, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface PasswordFieldsProps {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
  passwordsMatch: boolean;
  getPasswordStrength: () => number;
  getStrengthLabel: () => string;
  getStrengthColor: () => string;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PasswordFields({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordsMatch,
  getPasswordStrength,
  getStrengthLabel,
  getStrengthColor,
  hasMinLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecialChar,
  isSubmitting,
  onSubmit,
}: PasswordFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
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
                <span className="text-red-500">Passwords do not match</span>
              </>
            )}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!passwordsMatch || getPasswordStrength() < 60 || isSubmitting}
      >
        Change Password
      </Button>
    </form>
  );
}
