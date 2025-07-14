"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TrainingPeriodSelectionButton } from "@/components/admin/course-management/training-period-selection-button";
import DisplayModeToggle from "@/components/admin/course-management/display-mode-toggle";
import { Button } from "@/components/ui/button";

export default function CoursesManagementPage() {
  const [currentSelectedTrainingPeriod, setCurrentSelectedTrainingPeriod] =
    useState<number>();
  const [displayMode, setDisplayMode] = useState<"cards" | "table">("cards");

  return (
    <div className="space-y-4">
      {/* First layer */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button size="lg">
          <Plus /> Add course
        </Button>
      </div>
      {/* Second layer */}
      <div className="flex items-center justify-between">
        <TrainingPeriodSelectionButton
          currentSelectedTrainingPeriod={currentSelectedTrainingPeriod}
          setCurrentSelectedTrainingPeriod={setCurrentSelectedTrainingPeriod}
        />
        <DisplayModeToggle
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      </div>
    </div>
  );
}
