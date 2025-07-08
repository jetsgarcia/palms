"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/actions/fetchUsers";
import { AllUsersType } from "@/types/allUsers";
import { Button } from "@/components/ui/button";
import { allUserColumns } from "@/components/admin/user-management/all-user-columns";
import { AllUserDataTable } from "@/components/admin/user-management/all-user-data-table";
import { StudentsDataTable } from "@/components/admin/user-management/students-data-table";
import { studentsColumns } from "@/components/admin/user-management/students-columns";
import { InstructorsDataTable } from "@/components/admin/user-management/instructors-data-table";
import { instructorsColumns } from "@/components/admin/user-management/instructors-columns";
import { adminsColumns } from "@/components/admin/user-management/admins-columns";
import { AdminsDataTable } from "@/components/admin/user-management/admins-data-table";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const roles = [
  { key: "all", label: "All", addPath: null },
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
  const [allUsersData, setAllUsersData] = useState<AllUsersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<
    "all" | "student" | "instructor" | "admin"
  >("all");
  const router = useRouter();

  useEffect(() => {
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
                    {roles
                      .filter(({ key }) => key !== "all")
                      .map(({ key, label, addPath }) => (
                        <Button
                          key={key}
                          variant="outline"
                          className="hover:bg-primary hover:text-white"
                          onClick={() => {
                            if (addPath) {
                              router.push(addPath);
                            }
                          }}
                        >
                          {label}
                        </Button>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={() => {
                  switch (active) {
                    case "admin":
                      router.push("/admin/user-management/add-admin");
                      break;
                    case "instructor":
                      router.push("/admin/user-management/add-instructor");
                      break;
                    case "student":
                      router.push("/admin/user-management/add-student");
                      break;
                  }
                }}
              >
                <Plus />
                Add {active}
              </Button>
            )}
          </div>

          {/* Main content */}
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
              {active === "student" && (
                <StudentsDataTable
                  columns={studentsColumns}
                  data={allUsersData
                    .filter((user) => user.role === "STUDENT" && user.student)
                    .map((user) => ({
                      id: user.id,
                      serialNumber: user.student?.serialNumber,
                      name:
                        user.firstName +
                        " " +
                        (user.middleInitial ? user.middleInitial + " " : "") +
                        user.lastName,
                      email: user.email,
                      trainingPeriod: user.student?.trainingPeriod,
                      trainingYear: user.student?.trainingYear,
                      rank: user.student?.rank,
                      afos: user.student?.afos,
                      course: user.student?.course,
                    }))}
                />
              )}
              {active === "instructor" && (
                <InstructorsDataTable
                  columns={instructorsColumns}
                  data={allUsersData
                    .filter((user) => user.role === "INSTRUCTOR")
                    .map((user) => ({
                      id: user.id,
                      name: user.firstName + " " + user.lastName,
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
