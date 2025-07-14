"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCourse } from "@/actions/courses";
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
  selectedTrainingPeriod: number;
  setCourseDialogOpen: (open: boolean) => void;
}

export function CourseFormContent({
  selectedTrainingPeriod,
  setCourseDialogOpen,
}: CourseFormContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchCoursesForTrainingPeriod = useCourseStore(
    (state) => state.fetchCoursesForTrainingPeriod
  );

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      code: "",
      name: "",
      trainingPeriodId: selectedTrainingPeriod,
    },
  });

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    setIsSubmitting(true);

    try {
      const response = await createCourse(values);

      if (response.ok) {
        fetchCoursesForTrainingPeriod(selectedTrainingPeriod);
        setCourseDialogOpen(false);
        toast.success("Course created successfully");
        form.reset();
        setIsSubmitting(false);
      } else {
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
        <DialogTitle>Add course</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new course.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
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
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
