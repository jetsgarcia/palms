"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Level } from "@prisma/client";
import { createAFOS } from "@/actions/createAFOS";
// Import updateAFOS if it exists, otherwise you need to implement it
// import { updateAFOS } from "@/actions/updateAFOS";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { capitalizeWords, cn } from "@/lib/utils";
import { updateAFOS } from "@/actions/updateAFOS";

interface AFOSFormDialogContentProps {
  trainingPeriodId: number;
  setOpenDialog: (open: boolean) => void;
  refreshAFOS: () => Promise<void>;
  mode: "add" | "edit";
  initialValues?: {
    name: string;
    code: string;
    level: Level;
  };
}

type FormErrors = {
  name?: string;
  code?: string;
  level?: string;
};

export default function AFOSFormDialogContent({
  trainingPeriodId,
  setOpenDialog,
  refreshAFOS,
  mode,
  initialValues,
}: AFOSFormDialogContentProps) {
  const [name, setName] = useState<string>(initialValues?.name || "");
  const [code, setCode] = useState<string>(initialValues?.code || "");
  const [level, setLevel] = useState<string>(initialValues?.level || "");
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
      let response;
      if (mode === "edit") {
        response = await updateAFOS({
          name,
          code,
          level: level as Level,
          trainingPeriodId,
        });
      } else if (mode === "add") {
        response = await createAFOS({
          name,
          code,
          level: level as Level,
          trainingPeriodId,
        });
      }

      if (response && response.ok) {
        await refreshAFOS();
        toast.success(
          mode === "edit"
            ? "AFOS updated successfully"
            : "AFOS added successfully"
        );
        setOpenDialog(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting AFOS:", error);
      toast.error(
        mode === "edit" ? "Failed to update AFOS." : "Failed to create AFOS."
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "edit" ? "Edit AFOS" : "Add AFOS"}</DialogTitle>
        <DialogDescription>
          {mode === "edit"
            ? "Update the details below to edit the AFOS."
            : "Fill in the details below to add an AFOS."}
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
            {mode === "edit" ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
