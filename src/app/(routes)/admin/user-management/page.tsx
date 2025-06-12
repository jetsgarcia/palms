"use client";

import { Button } from "@/components/ui/button";
import { allUserColumns } from "./_components/all-user-columns";
import { AllUserDataTable } from "./_components/all-user-data-table";
import { useEffect, useState } from "react";
import { StudentsDataTable } from "./_components/students-data-table";
import { studentsColumns } from "./_components/students-columns";
import { InstructorsDataTable } from "./_components/instructors-data-table";
import { instructorsColumns } from "./_components/instructors-columns";
import { adminsColumns } from "./_components/admins-columns";
import { AdminsDataTable } from "./_components/admins-data-table";
import { Plus } from "lucide-react";
import { fetchStudents, fetchUsers } from "./_actions/fetchUsers";
import { UserType } from "@/types/user";
import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";
import { StudentType } from "@/types/student";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function UserManagementPage() {
  const [allUsersData, setAllUsersData] = useState<UserType[]>([]);
  const [studentsData, setStudentsData] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    async function loadUsers() {
      const data = await fetchUsers();
      setAllUsersData(data || []);
      setLoading(false);
    }

    loadUsers();
  }, []);

  useEffect(() => {
    async function loadStudents() {
      const data = await fetchStudents();
      const safeData: StudentType[] = (data ?? []).filter(
        (item): item is StudentType => item.student !== null
      );
      setStudentsData(safeData);
    }

    loadStudents();
  }, []);

  const [active, setActive] = useState("all");

  function changeUserType(type: string) {
    setActive(type);
  }

  function navigateToRegisterAdmin() {
    router.push("/admin/user-management/add-admin");
  }

  function navigateToRegisterInstructor() {
    router.push("/admin/user-management/add-instructor");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant={active === "all" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("all");
            }}
          >
            All
          </Button>
          <Button
            variant={active === "students" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("students");
            }}
          >
            Students
          </Button>
          <Button
            variant={active === "instructors" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("instructors");
            }}
          >
            Instructors
          </Button>
          <Button
            variant={active === "admins" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("admins");
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
                >
                  Student
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-white"
                  onClick={navigateToRegisterInstructor}
                >
                  Instructor
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-white"
                  onClick={navigateToRegisterAdmin}
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
        <div className="flex items-center justify-center h-140">
          <DotPulse size="43" speed="1.3" color="black" />
        </div>
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
                  user.middleInitial +
                  " " +
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
    </div>
  );
}
