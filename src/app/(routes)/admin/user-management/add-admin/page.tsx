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

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleInitial: z
    .string()
    .max(1, { message: "Middle initial should only be 1 letter" })
    .optional(),
  suffix: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
});

export default function RegisterAdminPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleInitial: "",
      suffix: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Do something with the form values.
    console.log(values);
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-4">
        <UserPlus size={40} />
        <div>
          <h1 className="text-2xl font-bold">Register Admin</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to register a new admin.
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
                    <Input placeholder="Reyes" {...field} />
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
                    <Input placeholder="Juan" {...field} />
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
                    <Input placeholder="A" {...field} />
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
                  <Input placeholder="example@domain.com" {...field} />
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
