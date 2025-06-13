"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trainingPeriodFormSchema } from "@/schemas/trainingPeriodForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { addTrainingPeriod } from "./_actions/addTrainingPeriod";

export default function AddTrainingPeriodPage() {
  const router = useRouter();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const form = useForm<z.infer<typeof trainingPeriodFormSchema>>({
    resolver: zodResolver(trainingPeriodFormSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      endDate: undefined,
      weeks: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof trainingPeriodFormSchema>) {
    const response = await addTrainingPeriod(values);

    if (!response) {
      throw new Error("No response from server");
    }

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Training period added successfully");
    router.push("/admin/training-period");
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-4">
        <CalendarDays size={40} />
        <div>
          <h1 className="text-2xl font-bold">Add Training Period</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to add a training period.
          </p>
        </div>
      </div>
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
                  <Input
                    placeholder="Training Period 1 | 2020"
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
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Start date <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover
                      open={openStartDate}
                      onOpenChange={setOpenStartDate}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="startDate"
                          className="justify-between font-normal"
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
                          endMonth={new Date(new Date().getFullYear() + 1, 11)}
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
              render={({ field }) => (
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
                          className="justify-between font-normal"
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
                          endMonth={new Date(new Date().getFullYear() + 1, 11)}
                          captionLayout="dropdown"
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            if (!startDate) return false;
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
                  <FormMessage />
                </FormItem>
              )}
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
          </div>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  router.push("/admin/training-period");
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
