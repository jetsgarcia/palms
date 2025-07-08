"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createSubject, updateSubject } from "@/actions/subject";
import { subjectFormSchema } from "@/schemas/subjectForm";
import { useEffect, useState } from "react";
import { readInstructor } from "@/actions/instructor";
import { users } from "@prisma/client";
import { CustomSelect } from "./ui/CustomSelect";

export default function SubjectForm({
  moduleId,
  initialData,
  mode,
  setSubjectOpen,
  getAllData,
}: {
  initialData?: z.infer<typeof subjectFormSchema>;
  moduleId: number;
  mode: "add" | "edit";
  setSubjectOpen: (open: boolean) => void;
  getAllData: () => Promise<void>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instructors, setInstructors] = useState<users[]>([]);

  const form = useForm<z.infer<typeof subjectFormSchema>>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      instructor: initialData?.instructor || "",
      moduleId,
    },
  });

  async function onSubmit(values: z.infer<typeof subjectFormSchema>) {
    setIsSubmitting(true);

    try {
      let response;

      if (mode === "add") {
        response = await createSubject(values);
      } else if (mode === "edit") {
        response = await updateSubject(values);
      }

      if (response && response.ok) {
        toast.success(
          mode === "edit"
            ? "Subject updated successfully"
            : "Subject added successfully"
        );
        await getAllData();
        setSubjectOpen(false);
        setIsSubmitting(false);
      } else if (response && !response.ok) {
        toast.error(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        mode === "edit" ? "Failed to edit subject" : "Failed to add subject"
      );
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const response = await readInstructor();

        if (response.ok) {
          setInstructors(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to get instructors");
      }
    }

    fetchInstructors();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Code <span className="text-destructive">*</span>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-destructive">*</span>
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
          name="instructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructor</FormLabel>
              <FormControl>
                <CustomSelect
                  value={field.value || ""}
                  onChange={field.onChange}
                  options={instructors.map((instructor) => {
                    const fullName = `${instructor.lastName}, ${
                      instructor.firstName
                    }${
                      instructor.middleInitial
                        ? ` ${instructor.middleInitial}.`
                        : ""
                    }${instructor.suffix ? `, ${instructor.suffix}` : ""}`;
                    return {
                      value: instructor.id.toString(),
                      label: fullName,
                    };
                  })}
                  placeholder="Select instructor"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
