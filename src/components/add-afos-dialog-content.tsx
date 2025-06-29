"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Level } from "@prisma/client";
import { createAFOS } from "@/actions/createAFOS";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { capitalizeWords, cn } from "@/lib/utils";

interface AddAFOSDialogContentProps {
  trainingPeriodId: number;
  setOpenDialog: (open: boolean) => void;
  refreshAFOS: () => Promise<void>;
}

type FormErrors = {
  name?: string;
  code?: string;
  level?: string;
};

export default function AddAFOSDialogContent({
  trainingPeriodId,
  setOpenDialog,
  refreshAFOS,
}: AddAFOSDialogContentProps) {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!code.trim()) {
      newErrors.code = "Code is required";
    }

    if (!level) {
      newErrors.level = "Level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const resetForm = () => {
    setName("");
    setCode("");
    setLevel("");
    setErrors({});
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createAFOS({
        name,
        code,
        level: level as Level,
        trainingPeriodId,
      });

      if (response.ok) {
        await refreshAFOS();
        toast.success("AFOS added successfully");
        setOpenDialog(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding AFOS:", error);
      toast.error("Failed to create AFOS.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add AFOS</DialogTitle>
        <DialogDescription>
          Fill in the details below to add an AFOS.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => {
                // Capitalize every first word
                const value = capitalizeWords(e.target.value);
                setName(value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              onBlur={(e) => {
                const formatted = capitalizeWords(e.target.value);
                setName(formatted);
              }}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-8 flex-row">
          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">
              Code <span className="text-destructive">*</span>
            </label>
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (errors.code) {
                  setErrors((prev) => ({ ...prev, code: undefined }));
                }
              }}
            />
            {errors.code && (
              <p className="text-sm text-destructive">{errors.code}</p>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">
              Level <span className="text-destructive">*</span>
            </label>
            <select
              className={cn(
                "cursor-pointer w-full border border-gray-950 rounded-md px-3 py-[.39rem]",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                level ? "text-black" : "text-muted-foreground"
              )}
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                if (errors.level) {
                  setErrors((prev) => ({ ...prev, level: undefined }));
                }
              }}
            >
              <option value="" hidden disabled>
                Select level
              </option>
              <option value="Basic">Basic</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.level && (
              <p className="text-sm text-destructive">{errors.level}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
