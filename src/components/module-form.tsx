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
import { useState } from "react";
import { toast } from "sonner";
import { createModule, updateModule } from "@/actions/module";

interface ModuleFormProps {
  id: number;
  mode?: "add" | "edit";
  moduleNumber: number;
  afosCode: string;
  initialData?: {
    name: string;
  };
  setModuleOpen: (open: boolean) => void;
  getAllData: () => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(1, "Module name is required"),
});

export default function ModuleForm({
  id,
  mode,
  moduleNumber,
  afosCode,
  initialData,
  setModuleOpen,
  getAllData,
}: ModuleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      let response;
      if (mode === "edit") {
        response = await updateModule({
          id: id,
          number: moduleNumber,
          name: values.name,
          afosCode,
        });
      } else if (mode === "add") {
        response = await createModule({
          number: moduleNumber,
          name: values.name,
          afosCode,
        });
      }

      if (response && response.ok) {
        await getAllData();
        toast.success(
          mode === "edit"
            ? "Module updated successfully"
            : "Module added successfully"
        );
        setModuleOpen(false);
        setIsSubmitting(false);
      } else if (response && !response.ok) {
        toast.error(mode === "edit" ? response.message : response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting module:", error);
      toast.error(
        mode === "edit"
          ? "Failed to update module."
          : "Failed to create module."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || initialData?.name || ""}
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
