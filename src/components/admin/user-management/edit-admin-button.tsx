import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import AdminForm from "./admin-form";

interface EditAdminButtonProps {
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

export default function EditAdminButton({
  loadData,
  id,
  initialData,
}: EditAdminButtonProps) {
  const [openAdminDialog, setOpenAdminDialog] = useState(false);

  return (
    <Dialog open={openAdminDialog} onOpenChange={setOpenAdminDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <AdminForm
        mode="edit"
        id={id}
        refreshUsers={loadData}
        setFormOpen={setOpenAdminDialog}
        initialData={initialData}
      />
    </Dialog>
  );
}
