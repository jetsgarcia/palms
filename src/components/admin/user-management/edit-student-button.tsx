import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import StudentForm from "./student-form";

interface EditStudentButtonProps {
  loadData: () => Promise<void>;
  id: string;
  initialData: {
    firstName: string;
    lastName: string;
    middleInitial?: string;
    trainingPeriod?: string;
    trainingPeriodId: number;
    suffix?: string;
    email: string;
    rank: string;
    serialNumber: string;
    afos?: string;
    course?: string | null;
  };
}

export default function EditStudentButton({
  loadData,
  id,
  initialData,
}: EditStudentButtonProps) {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);

  return (
    <Dialog open={openStudentDialog} onOpenChange={setOpenStudentDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <StudentForm
        mode="edit"
        id={id}
        refreshUsers={loadData}
        setFormOpen={setOpenStudentDialog}
        initialData={{
          ...initialData,
          trainingPeriod: initialData.trainingPeriodId,
          afos: initialData.afos ?? "",
          course: initialData.course ?? "",
        }}
      />
    </Dialog>
  );
}
