import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "../../ui/dialog";
import TrainingPeriodForm from "./training-period-form";
import { useContext, useState } from "react";
import { FormContext } from "@/app/(routes)/(roles)/admin/training-period/page";
import z from "zod";
import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { deleteTrainingPeriod } from "@/actions/trainingPeriod";
import { toast } from "sonner";

interface MoreActionsButtonProps {
  initialData: z.infer<typeof trainingPeriodFormSchema>;
  id?: number;
}

export default function TrainingPeriodMoreActions({
  initialData,
  id,
}: MoreActionsButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const formContext = useContext(FormContext);

  const { loadTrainingPeriods } = formContext;

  async function handleDelete() {
    if (!id) {
      console.error("ID is required for deletion");
      return;
    }

    try {
      const response = await deleteTrainingPeriod(id);
      if (response.ok) {
        toast.success("Training period deleted successfully");
        await loadTrainingPeriods();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting training period:", error);
      toast.error("Failed to delete training period");
    }
  }
  return (
    <div className="flex items-center gap-2">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="ghost">
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete training period</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;
              {initialData.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
