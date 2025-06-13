"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { instructorRegisterFormSchema } from "@/schemas/instructorRegisterForm";
import { registerInstructor } from "./_actions/registerInstructor";
import { toast } from "sonner";

export default function RegisterInstructorPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof instructorRegisterFormSchema>>({
    resolver: zodResolver(instructorRegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleInitial: "",
      suffix: "",
      email: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof instructorRegisterFormSchema>
  ) {
    const response = await registerInstructor(values);

    if (!response) {
      throw new Error("No response from server");
    }

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Instructor registered successfully");
    router.push("/admin/user-management");
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-4">
        <UserPlus size={40} />
        <div>
          <h1 className="text-2xl font-bold">Register Instructor</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to register a new instructor.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Last name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Reyes"
                      {...field}
                      onChange={(e) => {
                        // Capitalize every word
                        const value = e.target.value
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                          .replace(/\B\w/g, (char) => char.toLowerCase());
                        field.onChange(value);
                      }}
                      value={(field.value || "")
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .replace(/\B\w/g, (char) => char.toLowerCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    First name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan"
                      {...field}
                      onChange={(e) => {
                        // Capitalize every word
                        const value = e.target.value
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                          .replace(/\B\w/g, (char) => char.toLowerCase());
                        field.onChange(value);
                      }}
                      value={(field.value || "")
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .replace(/\B\w/g, (char) => char.toLowerCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <FormField
              control={form.control}
              name="middleInitial"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Middle initial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="A"
                      maxLength={1}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^a-zA-Z]/g, "")
                          .toUpperCase()
                          .slice(0, 1);
                        field.onChange(value);
                      }}
                      value={field.value?.toUpperCase() || ""}
                    />
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
                    <Input placeholder="III" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <Input
                    placeholder="example@domain.com"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      field.onChange(value);
                    }}
                    value={field.value?.toLowerCase() || ""}
                  />
                </FormControl>
                <FormDescription>
                  The password will be sent to this email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  router.push("/admin/user-management");
                }}
              >
                Go back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
