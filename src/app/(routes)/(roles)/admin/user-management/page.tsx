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
import Loader from "@/components/loader";

export default function UserManagementPage() {
  const [allUsersData, setAllUsersData] = useState<UserType[]>([]);
  const [studentsData, setStudentsData] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [users, students] = await Promise.all([
        fetchUsers(),
        fetchStudents(),
      ]);

      setAllUsersData(users || []);
      const safeData: StudentType[] = (students ?? []).filter(
        (item): item is StudentType => item.student !== null
      );
      setStudentsData(safeData);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div>
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
                >
                  Student
                </Button>
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
