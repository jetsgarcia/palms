"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { useState } from "react";
import AFOSFormDialogContent from "./afos-form-dialog-content";

interface EditAFOSButtonProps {
  code: string;
  trainingPeriodId: number;
  refreshAFOS: () => Promise<void>;
  initialValues?: {
    name: string;
    code: string;
    level: "Basic" | "Advanced";
  };
}

export default function EditAFOSButton({
  trainingPeriodId,
  refreshAFOS,
  initialValues,
}: EditAFOSButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="z-50">
          <Edit />
        </Button>
      </DialogTrigger>
      <AFOSFormDialogContent
        mode="edit"
        trainingPeriodId={trainingPeriodId}
        setOpenDialog={setOpenDialog}
        refreshAFOS={refreshAFOS}
        initialValues={initialValues}
      />
    </Dialog>
  );
}
