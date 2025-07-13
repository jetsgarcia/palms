"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { fetchUsers } from "@/actions/fetchUsers";
import { AllUsersType } from "@/types/allUsers";
import { Button } from "@/components/ui/button";
import { StudentsDataTable } from "@/components/admin/user-management/students-data-table";
import { studentsColumns } from "@/components/admin/user-management/students-columns";
import { InstructorsDataTable } from "@/components/admin/user-management/instructors-data-table";
import { instructorsColumns } from "@/components/admin/user-management/instructors-columns";
import { adminsColumns } from "@/components/admin/user-management/admins-columns";
import { AdminsDataTable } from "@/components/admin/user-management/admins-data-table";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import InstructorForm from "@/components/admin/user-management/instructor-form";
import AdminForm from "@/components/admin/user-management/admin-form";
import StudentForm from "@/components/admin/user-management/student-form";

const roles = [
  {
    key: "student",
    label: "Students",
    addPath: "/admin/user-management/add-student",
  },
  {
    key: "instructor",
    label: "Instructors",
    addPath: "/admin/user-management/add-instructor",
  },
  {
    key: "admin",
    label: "Admins",
    addPath: "/admin/user-management/add-admin",
  },
];

export default function UserManagementPage() {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openInstructorDialog, setOpenInstructorDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [allUsersData, setAllUsersData] = useState<AllUsersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<"student" | "instructor" | "admin">(
    "student"
  );

  async function loadData() {
    try {
      const response = await fetchUsers();

      if (response.ok) {
        setAllUsersData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred while getting data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {roles.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={active === key ? "default" : "ghost"}
                  onClick={() => setActive(key as typeof active)}
                >
                  {label}
                </Button>
              ))}
            </div>
            {active === "student" && (
              <Dialog
                open={openStudentDialog}
                onOpenChange={setOpenStudentDialog}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add student
                  </Button>
                </DialogTrigger>
                <StudentForm
                  mode="add"
                  refreshUsers={loadData}
                  setFormOpen={setOpenStudentDialog}
                />
              </Dialog>
            )}
            {active === "instructor" && (
              <Dialog
                open={openInstructorDialog}
                onOpenChange={setOpenInstructorDialog}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add instructor
                  </Button>
                </DialogTrigger>
                <InstructorForm
                  mode="add"
                  refreshUsers={loadData}
                  setFormOpen={setOpenInstructorDialog}
                />
              </Dialog>
            )}
            {active === "admin" && (
              <Dialog open={openAdminDialog} onOpenChange={setOpenAdminDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add admin
                  </Button>
                </DialogTrigger>
                <AdminForm
                  mode="add"
                  refreshUsers={loadData}
                  setFormOpen={setOpenAdminDialog}
                />
              </Dialog>
            )}
          </div>

          {/* Main content */}
          {loading ? (
            <Loader />
          ) : (
            <div className="container mx-auto">
              {active === "student" && (
                <StudentsDataTable
                  columns={studentsColumns(loadData)}
                  data={allUsersData
                    .filter((user) => user.role === "STUDENT" && user.student)
                    .map((user) => ({
                      id: user.id,
                      serialNumber: user.student?.serialNumber ?? "",
                      firstName: user.firstName,
                      middleInitial: user.middleInitial ?? "",
                      lastName: user.lastName,
                      suffix: user.suffix ?? "",
                      trainingPeriod: user.training_periods?.name ?? "",
                      trainingPeriodId: user.training_periods?.id ?? 0,
                      email: user.email,
                      rank: user.student?.rank ?? "",
                      afos: user.student?.afos ?? "",
                      course: user.student?.course ?? "",
                    }))}
                />
              )}
              {active === "instructor" && (
                <InstructorsDataTable
                  columns={instructorsColumns(loadData)}
                  data={allUsersData
                    .filter((user) => user.role === "INSTRUCTOR")
                    .map((user) => ({
                      id: user.id,
                      firstName: user.firstName,
                      middleInitial: user.middleInitial ?? undefined,
                      lastName: user.lastName,
                      suffix: user.suffix ?? undefined,
                      email: user.email,
                      assignedSubject:
                        user.subjects
                          ?.map((subject) => subject.code)
                          .join(", ") || "None",
                    }))}
                />
              )}
              {active === "admin" && (
                <AdminsDataTable
                  columns={adminsColumns(loadData)}
                  data={allUsersData
                    .filter((user) => user.role === "ADMIN")
                    .map((user) => ({
                      id: user.id,
                      firstName: user.firstName,
                      middleInitial: user.middleInitial ?? undefined,
                      lastName: user.lastName,
                      suffix: user.suffix ?? undefined,
                      email: user.email,
                    }))}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
