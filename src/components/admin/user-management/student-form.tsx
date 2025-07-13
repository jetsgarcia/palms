import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../../ui/button";
import { studentRegisterFormSchema } from "@/schemas/studentRegisterForm";
import { createStudent } from "@/actions/student";

interface StudentFormProps {
  mode: "add" | "edit";
  refreshUsers: () => void;
  setFormOpen: (open: boolean) => void;
  initialData?: z.infer<typeof studentRegisterFormSchema>;
  id?: string;
}

export default function StudentForm({
  mode,
  refreshUsers,
  setFormOpen,
  initialData,
  id,
}: StudentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof studentRegisterFormSchema>>({
    resolver: zodResolver(studentRegisterFormSchema),
    defaultValues: initialData ?? {
      firstName: "",
      lastName: "",
      middleInitial: "",
      suffix: "",
      email: "",
      serialNumber: "",
      rank: "",
      afos: "",
      course: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentRegisterFormSchema>) {
    setIsSubmitting(true);
    try {
      let response;

      if (mode === "edit" && id) {
        // response = await updateStudent(values, id);
      } else if (mode === "add") {
        response = await createStudent(values);
      }

      if (response && response.ok) {
        toast.success(
          `Student ${mode === "add" ? "registered" : "updated"} successfully`
        );
        setFormOpen(false);
        refreshUsers();
        setIsSubmitting(false);
        form.reset();
      } else if (response && !response.ok) {
        toast.error(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${mode === "add" ? "register" : "edit"} student.`);
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent className="min-w-min">
      <DialogHeader>
        <DialogTitle>
          {mode === "add" ? "Register" : "Edit"} student
        </DialogTitle>
        <DialogDescription>
          {mode === "add"
            ? "Fill in the details below to register a student."
            : "Edit the details below for this student."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Serial number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suffix</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-32">
              <FormField
                control={form.control}
                name="middleInitial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle initial</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={1}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/[^a-zA-Z]/g, "")
                            .toUpperCase()
                            .slice(0, 1);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="trainingPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Training Period{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="trainingPeriod"
                        name="trainingPeriod"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rank <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="afos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      AFOS <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Course <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
