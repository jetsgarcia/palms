import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import InstructorForm from "./instructor-form";

interface EditInstructorButtonProps {
  loadData: () => Promise<void>;
  id: string;
  initialData: {
    firstName: string;
    lastName: string;
    middleInitial?: string;
    suffix?: string;
    email: string;
  };
}

export default function EditInstructorButton({
  loadData,
  id,
  initialData,
}: EditInstructorButtonProps) {
  const [openInstructorDialog, setOpenInstructorDialog] = useState(false);

  return (
    <Dialog open={openInstructorDialog} onOpenChange={setOpenInstructorDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <InstructorForm
        mode="edit"
        id={id}
        refreshUsers={loadData}
        setFormOpen={setOpenInstructorDialog}
        initialData={initialData}
      />
    </Dialog>
  );
}
