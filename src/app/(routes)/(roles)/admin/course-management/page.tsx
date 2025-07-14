"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TrainingPeriodSelectionButton } from "@/components/admin/course-management/training-period-selection-button";
import DisplayModeToggle from "@/components/admin/course-management/display-mode-toggle";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/components/admin/course-management/course-list";
import Loader from "@/components/loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CourseFormContent } from "@/components/admin/course-management/course-form-content";

export default function CoursesManagementPage() {
  const [selectedTrainingPeriod, setSelectedTrainingPeriod] =
    useState<number>();
  const [displayMode, setDisplayMode] = useState<"cards" | "table">("cards");
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="space-y-4">
        {/* First layer */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Courses</h1>
          <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus /> Add course
              </Button>
            </DialogTrigger>
            {selectedTrainingPeriod && (
              <CourseFormContent
                selectedTrainingPeriod={selectedTrainingPeriod}
                setCourseDialogOpen={setCourseDialogOpen}
              />
            )}
          </Dialog>
        </div>
        {/* Second layer */}
        <div className="flex items-center justify-between">
          <TrainingPeriodSelectionButton
            selectedTrainingPeriod={selectedTrainingPeriod}
            setSelectedTrainingPeriod={setSelectedTrainingPeriod}
          />
          <DisplayModeToggle
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />
        </div>
      </div>
      {/* Main content */}
      {selectedTrainingPeriod ? (
        <CourseList
          selectedTrainingPeriod={selectedTrainingPeriod}
          displayMode={displayMode}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
