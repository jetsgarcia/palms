import { courses } from "@prisma/client";
import { create } from "zustand";
import { readCoursesForTrainingPeriod } from "@/actions/courses";
import { toast } from "sonner";

interface CourseStore {
  courses: courses[];
  loading: boolean;
  setCourses: (courses: courses[]) => void;
  fetchCoursesForTrainingPeriod: (trainingPeriodId: number) => Promise<void>;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  loading: false,
  setCourses: (courses) => set({ courses }),
  fetchCoursesForTrainingPeriod: async (trainingPeriodId: number) => {
    set({ loading: true });
    try {
      const response = await readCoursesForTrainingPeriod(trainingPeriodId);
      if (response.ok) {
        set({ courses: response.data });
      } else {
        console.error("Failed to fetch courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("An error occurred while fetching courses.");
    } finally {
      set({ loading: false });
    }
  },
}));
