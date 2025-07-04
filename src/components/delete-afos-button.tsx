"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import { deleteAFOS } from "@/actions/afos";

interface DeleteAFOSButtonProps {
  code: string;
  name: string;
  refreshAFOS: () => Promise<void>;
}

export default function DeleteAFOSButton({
  code,
  name,
  refreshAFOS,
}: DeleteAFOSButtonProps) {
  async function handleDelete(code: string) {
    try {
      const response = await deleteAFOS(code);

      if (response.ok) {
        await refreshAFOS();
        toast.success("AFOS deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete AFOS");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete AFOS");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="z-50">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the AFOS
            record and its modules along with the subjects.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(code)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
