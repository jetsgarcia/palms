import { courses } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteCourse } from "@/actions/courses";
import { useCourseStore } from "@/store";

interface DeleteCourseDialogProps {
  deleteCourseDialogOpen: boolean;
  setDeleteCourseDialogOpen: (open: boolean) => void;
  selectedCourse: courses;
}

export default function DeleteCourseDialog({
  deleteCourseDialogOpen,
  setDeleteCourseDialogOpen,
  selectedCourse,
}: DeleteCourseDialogProps) {
  const fetchCoursesForTrainingPeriod = useCourseStore(
    (state) => state.fetchCoursesForTrainingPeriod
  );

  async function handleDelete() {
    try {
      const response = await deleteCourse(selectedCourse.code);

      if (response.ok) {
        toast.success("Course deleted successfully");
        setDeleteCourseDialogOpen(false);
        fetchCoursesForTrainingPeriod(selectedCourse.trainingPeriodId);
      } else {
        toast.error(response.message || "Failed to delete course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    }
  }

  return (
    <AlertDialog
      open={deleteCourseDialogOpen}
      onOpenChange={(open) => {
        setDeleteCourseDialogOpen(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            course and its modules along with the subjects.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
