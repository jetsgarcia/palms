import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { StudentForm } from "./student-form";
import { useState } from "react";

interface EditStudentButtonProps {
  initialData: {
    serialNumber: string;
    firstName: string;
    middleInitial?: string;
    lastName: string;
    suffix?: string;
    email: string;
    rank: string;
    course: string;
    courseCode: string;
  };
}

export function EditStudentButton({ initialData }: EditStudentButtonProps) {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  return (
    <Dialog open={openStudentDialog} onOpenChange={setOpenStudentDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 />
        </Button>
      </DialogTrigger>
      <StudentForm
        mode="edit"
        setOpenDialog={setOpenStudentDialog}
        initialData={initialData}
      />
    </Dialog>
  );
}
