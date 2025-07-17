import { readCourses } from "@/actions/courses";
import { createStudent } from "@/actions/student";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
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
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { studentRegisterFormSchema } from "@/schemas/studentRegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { courses } from "@prisma/client";
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface StudentFormProps {
  setOpenDialog: (open: boolean) => void;
}

export function StudentForm({ setOpenDialog }: StudentFormProps) {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<courses[]>([]);

  const form = useForm<z.infer<typeof studentRegisterFormSchema>>({
    resolver: zodResolver(studentRegisterFormSchema),
    defaultValues: {
      serialNumber: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
      suffix: "",
      rank: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentRegisterFormSchema>) {
    setIsSubmitting(true);

    try {
      const response = await createStudent(values);

      if (response.ok) {
        toast.success("Student registered successfully");
        form.reset();
        setIsSubmitting(false);
        setOpenDialog(false);
      } else {
        toast.error(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error("An error occurred while registering the student");
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await readCourses();
        if (response.ok) {
          setCourses(response.data);
          setLoading(false);
        } else {
          console.log("Error fetching courses:", response.message);
          toast.error("Failed to fetch courses");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("An error occurred while fetching courses");
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const courseRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Register student</DialogTitle>
        <DialogDescription>
          Fill out the form below to register a new student
        </DialogDescription>
      </DialogHeader>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2Icon size={48} color="darkGreen" className="animate-spin" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First row*/}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Serial number<span className="text-destructive">*</span>
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
                name="rank"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Rank<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second row*/}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-3">
                    <FormLabel>
                      First name<span className="text-destructive">*</span>
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
                      <Input {...field} className="uppercase" maxLength={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Third row*/}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-3">
                    <FormLabel>
                      Last name<span className="text-destructive">*</span>
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
            </div>

            {/* Fourth row */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      onKeyDown={(e) => {
                        if (e.key === "Tab" && !e.shiftKey) {
                          e.preventDefault();
                          courseRef.current?.focus();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fifth row */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          ref={courseRef}
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            form.formState.errors.course
                              ? "border-destructive focus-visible:ring-destructive"
                              : "border-primary",
                            !field.value && "text-gray-500 hover:text-gray-500"
                          )}
                        >
                          {courses.length > 0
                            ? (() => {
                                const selected = courses.find(
                                  (course) => course.code === field.value
                                );
                                if (!selected) return "Select a course";
                                return selected.code;
                              })()
                            : "Select a course"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[29rem] p-0">
                        <Command>
                          <CommandInput
                            className="h-9"
                            placeholder="Search course..."
                          />
                          <CommandList>
                            <CommandEmpty>No course found</CommandEmpty>
                            <CommandGroup>
                              {courses.map((course) => {
                                return (
                                  <CommandItem
                                    key={course.code}
                                    value={course.code}
                                    onSelect={() => {
                                      if (field.value !== course.code) {
                                        field.onChange(course.code);
                                      }
                                      setOpen(false);
                                    }}
                                  >
                                    {course.code}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value === course.code
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      )}
    </DialogContent>
  );
}
