import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAFOSFormSchema } from "@/schemas/createAFOSForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface AddAFOSDialogContentProps {
  trainingPeriodId: number;
}

export default function AddAFOSDialogContent({
  trainingPeriodId,
}: AddAFOSDialogContentProps) {
  const form = useForm<z.infer<typeof createAFOSFormSchema>>({
    resolver: zodResolver(createAFOSFormSchema),
    defaultValues: {
      code: "",
      name: "",
      level: "Basic",
      trainingPeriodId: trainingPeriodId,
    },
  });

  async function onSubmit(values: z.infer<typeof createAFOSFormSchema>) {
    console.log("Form submitted with values:", values);
    // const response = await createAFOS(values);

    // if (!response) {
    //   throw new Error("No response from server");
    // }

    // if (response.error) {
    //   toast.error(response.error);
    //   return;
    // }

    // toast.success("AFOS added successfully");
    // router.push("/admin/course-management");
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add AFOS</DialogTitle>
        <DialogDescription>
          Fill in the details below to add an AFOS.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  AFOS name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Infantry"
                    {...field}
                    onChange={(e) => {
                      // Capitalize every first word
                      const value = e.target.value
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .replace(/\B\w/g, (char) => char.toLowerCase());
                      field.onChange(value);
                    }}
                    value={(field.value || "")
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                      .replace(/\B\w/g, (char) => char.toLowerCase())}
                    onBlur={(e) => {
                      const formatted = e.target.value
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .replace(/\B\w/g, (char) => char.toLowerCase());
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    AFOS code <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="INF"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.toUpperCase());
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
              name="level"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Level <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
