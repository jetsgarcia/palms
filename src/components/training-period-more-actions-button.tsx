import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "./ui/dialog";
import TrainingPeriodForm from "./training-period-form";
import { useContext, useState } from "react";
import { FormContext } from "@/app/(routes)/(roles)/admin/training-period/page";
import z from "zod";
import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";

interface MoreActionsButtonProps {
  initialData: z.infer<typeof trainingPeriodFormSchema>;
  id?: number;
}

export default function TrainingPeriodMoreActionsButton({
  initialData,
  id,
}: MoreActionsButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const formContext = useContext(FormContext);

  const { loadTrainingPeriods } = formContext;
  // TODO: Implement delete training period functionality

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <TrainingPeriodForm
        mode="edit"
        refreshTrainingPeriods={loadTrainingPeriods}
        setFormOpen={setOpenDialog}
        initialData={initialData}
        id={id}
      />
    </Dialog>

    // <Trash /> Delete training period
  );
}
