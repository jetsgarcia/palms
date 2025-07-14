import Link from "next/link";
import { courses } from "@prisma/client";
import { useEffect, useState } from "react";
import { useCourseStore } from "@/store";
import { BookOpen, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseColumns } from "./course-columns";
import { CourseDataTable } from "./course-data-table";
import { Dialog } from "@/components/ui/dialog";
import { CourseFormContent } from "./course-form-content";

interface CourseListProps {
  selectedTrainingPeriod: number;
  displayMode?: "cards" | "table";
}

export function CourseList({
  selectedTrainingPeriod,
  displayMode,
}: CourseListProps) {
  const [editCourseDialogOpen, setEditCourseDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<courses>();
  const courses = useCourseStore((state) => state.courses);
  const loading = useCourseStore((state) => state.loading);
  const fetchCoursesForTrainingPeriod = useCourseStore(
    (state) => state.fetchCoursesForTrainingPeriod
  );

  useEffect(() => {
    fetchCoursesForTrainingPeriod(selectedTrainingPeriod);
  }, [selectedTrainingPeriod, fetchCoursesForTrainingPeriod]);

  return loading && courses.length === 0 ? (
    <Loader />
  ) : (
    <>
      {displayMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <>
            {courses &&
              courses.map((course) => (
                <Card
                  key={course.code}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="flex-row items-center justify-between flex">
                    <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <BookOpen size={20} />
                      <span>{course.name}</span>
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCourse(course);
                            setEditCourseDialogOpen(true);
                          }}
                        >
                          <Edit />
                          Edit course
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 />
                          Delete course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="flex items-center justify-between text-gray-500">
                      <span>Code: {course.code}</span>
                      <span className="font-medium tracking-wide">
                        Level: {course.level}
                      </span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex">
                    <Button className="flex-1" asChild>
                      <Link href={`/admin/course-management/${course.code}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            {/* Display a message if no courses are available */}
            {courses.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[25rem] col-span-1 sm:col-span-2 md:col-span-4 text-center text-gray-500">
                <BookOpen size={56} className="mb-2 opacity-50" />
                <span>No courses available for this training period</span>
              </div>
            )}
          </>
        </div>
      )}
      {displayMode === "table" && (
        <CourseDataTable columns={courseColumns} data={courses} />
      )}
      {selectedCourse && (
        <Dialog
          open={editCourseDialogOpen}
          onOpenChange={(open) => {
            setEditCourseDialogOpen(open);
          }}
        >
          {selectedTrainingPeriod && (
            <CourseFormContent
              mode="edit"
              selectedTrainingPeriod={selectedTrainingPeriod}
              setCourseDialogOpen={setEditCourseDialogOpen}
              initialData={selectedCourse}
            />
          )}
        </Dialog>
      )}
    </>
  );
}
