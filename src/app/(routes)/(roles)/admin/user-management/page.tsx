"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { allUserColumns } from "@/components/all-user-columns";
import { AllUserDataTable } from "@/components/all-user-data-table";
import { StudentsDataTable } from "@/components/students-data-table";
import { studentsColumns } from "@/components/students-columns";
import { InstructorsDataTable } from "@/components/instructors-data-table";
import { instructorsColumns } from "@/components/instructors-columns";
import { adminsColumns } from "@/components/admins-columns";
import { AdminsDataTable } from "@/components/admins-data-table";
import { fetchUsers } from "@/actions/fetchUsers";
import { StudentType } from "@/types/student";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import { readStudents } from "@/actions/student";
import { users } from "@prisma/client";

export default function UserManagementPage() {
  const [allUsersData, setAllUsersData] = useState<users[]>([]);
  const [studentsData, setStudentsData] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState("all");
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [usersResult, studentsResult] = await Promise.all([
          fetchUsers(),
          readStudents(),
        ]);

        if (!usersResult.ok) {
          setError(usersResult.message || "Failed to fetch users");
          setAllUsersData([]);
          setStudentsData([]);
          return;
        }
        if (!studentsResult.ok) {
          setError(studentsResult.message || "Failed to fetch students");
          setAllUsersData(usersResult.data || []);
          setStudentsData([]);
          return;
        }

        setAllUsersData(usersResult.data || []);
        setStudentsData(studentsResult.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant={active === "all" ? "default" : "ghost"}
                onClick={() => {
                  setActive("all");
                }}
              >
                All
              </Button>
              <Button
                variant={active === "students" ? "default" : "ghost"}
                onClick={() => {
                  setActive("students");
                }}
              >
                Students
              </Button>
              <Button
                variant={active === "instructors" ? "default" : "ghost"}
                onClick={() => {
                  setActive("instructors");
                }}
              >
                Instructors
              </Button>
              <Button
                variant={active === "admins" ? "default" : "ghost"}
                onClick={() => {
                  setActive("admins");
                }}
              >
                Admins
              </Button>
            </div>
            {active === "all" ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select User</DialogTitle>
                    <DialogDescription>
                      Please select the user you want to register.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:text-white"
                      onClick={() => {
                        router.push("/admin/user-management/add-student");
                      }}
                    >
                      Student
                    </Button>{" "}
                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:text-white"
                      onClick={() => {
                        router.push("/admin/user-management/add-instructor");
                      }}
                    >
                      Instructor
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:text-white"
                      onClick={() => {
                        router.push("/admin/user-management/add-admin");
                      }}
                    >
                      Admin
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={() => {
                  if (active === "admins") {
                    router.push("/admin/user-management/add-admin");
                  }

                  if (active === "instructors") {
                    router.push("/admin/user-management/add-instructor");
                  }
                  if (active === "students") {
                    router.push("/admin/user-management/add-student");
                  }
                }}
              >
                <Plus />
                Add
                {active === "students" && " Student"}
                {active === "instructors" && " Instructor"}
                {active === "admins" && " Admin"}
              </Button>
            )}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="container mx-auto">
              {active === "all" && (
                <AllUserDataTable
                  columns={allUserColumns}
                  data={allUsersData.map((user) => ({
                    id: user.id,
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    role: user.role,
                  }))}
                />
              )}
              {active === "students" && (
                <StudentsDataTable
                  columns={studentsColumns}
                  data={studentsData.map((user) => ({
                    id: user.id,
                    serialNumber: user.student.serialNumber,
                    name:
                      user.firstName +
                      " " +
                      (user.middleInitial ? user.middleInitial + " " : "") +
                      user.lastName,
                    email: user.email,
                    trainingPeriod: user.student.trainingPeriod,
                    trainingYear: user.student.trainingYear,
                    rank: user.student.rank,
                    afos: user.student.afos,
                    course: user.student.course,
                  }))}
                />
              )}
              {active === "instructors" && (
                <InstructorsDataTable
                  columns={instructorsColumns}
                  data={allUsersData
                    .filter((user) => user.role === "INSTRUCTOR")
                    .map((user) => ({
                      id: user.id,
                      name: user.firstName + " " + user.lastName,
                      email: user.email,
                      assignedSubject: "",
                    }))}
                />
              )}
              {active === "admins" && (
                <AdminsDataTable
                  columns={adminsColumns}
                  data={allUsersData
                    .filter((user) => user.role === "ADMIN")
                    .map((user) => ({
                      id: user.id,
                      name: user.firstName + " " + user.lastName,
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
