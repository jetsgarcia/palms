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
import { adminRegisterFormSchema } from "@/schemas/adminRegisterForm";
import { createAdmin, updateAdmin } from "@/actions/admin";

interface AdminFormProps {
  mode: "add" | "edit";
  refreshUsers: () => void;
  setFormOpen: (open: boolean) => void;
  id?: string;
  initialData?: z.infer<typeof adminRegisterFormSchema>;
}

export default function AdminForm({
  mode,
  refreshUsers,
  setFormOpen,
  id,
  initialData,
}: AdminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof adminRegisterFormSchema>>({
    resolver: zodResolver(adminRegisterFormSchema),
    defaultValues: initialData ?? {
      firstName: "",
      lastName: "",
      middleInitial: "",
      suffix: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof adminRegisterFormSchema>) {
    setIsSubmitting(true);
    try {
      let response;

      if (mode === "edit" && id) {
        response = await updateAdmin(values, id);
      } else if (mode === "add") {
        response = await createAdmin(values);
      }

      if (response && response.ok) {
        toast.success(
          `Admin ${mode === "add" ? "registered" : "updated"} successfully`
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
      toast.error(`Failed to ${mode === "add" ? "register" : "edit"} admin.`);
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "add" ? "Register" : "Edit"} admin</DialogTitle>
        <DialogDescription>
          {mode === "add"
            ? "Fill in the details below to register an admin."
            : "Edit the details below for this admin."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          <FormField
            control={form.control}
            name="middleInitial"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          <FormField
            control={form.control}
            name="suffix"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Suffix</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
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
