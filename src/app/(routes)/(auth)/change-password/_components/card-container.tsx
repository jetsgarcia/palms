"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import AuthBackButton from "./back-button";

interface StepIdentifierProps {
  steps: string[];
  type: "unauthenticated" | "authenticated";
}

export default function CardContainer({ steps, type }: StepIdentifierProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-4 p-4">
      <AuthBackButton />
      <div className="flex items-center w-min m-auto ">
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

      {/* TODO: Create forms */}
      {type === "unauthenticated" && <div>Unauthenticated</div>}
      {type === "authenticated" && <div>Authenticated</div>}
    </div>
  );
}
