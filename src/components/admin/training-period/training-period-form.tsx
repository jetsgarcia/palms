import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-dialog";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  createTrainingPeriod,
  updateTrainingPeriod,
} from "@/actions/trainingPeriod";
import { Button } from "../../ui/button";
import { ChevronDownIcon, Info } from "lucide-react";

interface TrainingPeriodFormProps {
  mode: "add" | "edit";
  refreshTrainingPeriods: () => void;
  setFormOpen: (open: boolean) => void;
  initialData?: z.infer<typeof trainingPeriodFormSchema>;
  id?: number;
}

export default function TrainingPeriodForm({
  mode,
  refreshTrainingPeriods,
  setFormOpen,
  initialData,
  id,
}: TrainingPeriodFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const form = useForm<z.infer<typeof trainingPeriodFormSchema>>({
    resolver: zodResolver(trainingPeriodFormSchema),
    defaultValues: initialData ?? {
      name: "",
      startDate: undefined,
      endDate: undefined,
      weeks: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof trainingPeriodFormSchema>) {
    setIsSubmitting(true);
    try {
      let response;

      if (mode === "edit" && id) {
        response = await updateTrainingPeriod(values, id);
      } else if (mode === "add") {
        response = await createTrainingPeriod(values);
      }

      if (response && response.ok) {
        toast.success(
          `Training period ${mode === "add" ? "added" : "updated"} successfully`
        );
        refreshTrainingPeriods();
        setFormOpen(false);
        setIsSubmitting(false);
      } else if (response && !response.ok) {
        toast.error(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Failed to ${mode === "add" ? "add" : "edit"} training period.`
      );
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "add" ? "Add" : "Edit"} training period
        </DialogTitle>
        <DialogDescription>
          {mode === "add"
            ? "Fill in the details below to add a training period."
            : "Edit the details below for this training period."}
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
                  Training period name{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Training Period 1 | 2020" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Start date <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="startDate"
                        className={cn(
                          "justify-between font-normal border-primary",
                          form.formState.errors.startDate
                            ? "border-destructive"
                            : ""
                        )}
                        type="button"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        captionLayout="dropdown"
                        endMonth={new Date(new Date().getFullYear() + 5, 11)}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenStartDate(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => {
              const hasStartDate = !!form.getValues("startDate");
              return (
                <FormItem className="flex-1">
                  <FormLabel>
                    End date <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="endDate"
                          className={cn(
                            "justify-between font-normal border-primary",
                            form.formState.errors.endDate
                              ? "border-destructive"
                              : "",
                            !hasStartDate ? "opacity-50 cursor-not-allowed" : ""
                          )}
                          type="button"
                          disabled={!hasStartDate}
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          endMonth={new Date(new Date().getFullYear() + 1, 11)}
                          captionLayout="dropdown"
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            if (!startDate) return true;
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            date.setHours(0, 0, 0, 0);
                            return date <= start;
                          }}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpenEndDate(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {!hasStartDate && (
                    <div className="flex items-center gap-2">
                      <Info size={16} color="gray" />
                      <span className="text-xs text-muted-foreground mt-1">
                        Pick a start date to enable end date selection
                      </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="weeks"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Weeks <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="12"
                    min={1}
                    step={1}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        field.onChange(undefined);
                      } else {
                        const num = Number(value);
                        if (!isNaN(num) && num >= 1) {
                          field.onChange(Math.floor(num));
                        }
                      }
                    }}
                  />
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
