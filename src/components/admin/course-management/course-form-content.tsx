"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCourse, updateCourse } from "@/actions/courses";
import { toast } from "sonner";
import { useState } from "react";
import { courseFormSchema } from "@/schemas/courseForm";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCourseStore } from "@/store";

interface CourseFormContentProps {
  mode: "create" | "edit";
  selectedTrainingPeriod: number;
  setCourseDialogOpen: (open: boolean) => void;
  initialData?: z.infer<typeof courseFormSchema>;
}

export function CourseFormContent({
  mode,
  selectedTrainingPeriod,
  setCourseDialogOpen,
  initialData,
}: CourseFormContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchCoursesForTrainingPeriod = useCourseStore(
    (state) => state.fetchCoursesForTrainingPeriod
  );

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialData ?? {
      code: "",
      name: "",
      trainingPeriodId: selectedTrainingPeriod,
    },
  });

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    setIsSubmitting(true);

    try {
      let response;

      if (mode === "create") {
        response = await createCourse(values);
      } else if (mode === "edit" && initialData) {
        response = await updateCourse(values);
      }

      if (response && response.ok) {
        fetchCoursesForTrainingPeriod(selectedTrainingPeriod);
        setCourseDialogOpen(false);
        toast.success(
          `Course ${mode === "create" ? "created" : "updated"} successfully`
        );
        form.reset();
        setIsSubmitting(false);
      } else if (response && !response.ok) {
        toast.error(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "Add" : "Edit"} course</DialogTitle>
        <DialogDescription>
          {mode === "create"
            ? "Fill in the details below to create a new course"
            : "Edit the course details below"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Code<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    disabled={mode === "edit"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Level<span className="text-destructive">*</span>
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-8">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
