"use client";

import { Button } from "@/components/ui/button";
import { allUserColumns } from "./_components/all-user-columns";
import { AllUserDataTable } from "./_components/all-user-data-table";
import { useState } from "react";
import { StudentsDataTable } from "./_components/students-data-table";
import { studentsColumns } from "./_components/students-columns";
import { InstructorsDataTable } from "./_components/instructors-data-table";
import { instructorsColumns } from "./_components/instructors-columns";
import { adminsColumns } from "./_components/admins-columns";
import { AdminsDataTable } from "./_components/admins-data-table";
import { Plus } from "lucide-react";

export default function UserManagementPage() {
  const allUsersData = [
    {
      id: "728ed52f",
      name: "Mary Grace",
      email: "m@example.com",
      role: "Student",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      role: "Admin",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      role: "Student",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      role: "Instructor",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      role: "Student",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      role: "Instructor",
    },
  ];
  const studentsData = [
    {
      serialNumber: "O-12375",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Signal",
      course: "Signal Advanced Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
    {
      serialNumber: "O-12978",
      name: "John Doe",
      email: "johndoe@sample.com",
      trainingPeriod: 1,
      trainingYear: 2024,
      rank: "1LT",
      afos: "Infantry",
      course: "Infantry Basic Course",
    },
  ];
  const instructorsData = [
    {
      name: "John Doe",
      email: "sample@email.com",
      assignedSubject: "Pistols",
    },
    {
      name: "John Doe",
      email: "sample@email.com",
      assignedSubject: "Rifles",
    },
  ];
  const adminsData = [
    {
      name: "John Doe",
      email: "lpdjeb@sample.com",
    },
  ];
  const [active, setActive] = useState("all");

  function changeUserType(type: string) {
    setActive(type);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            className="cursor-pointer"
            variant={active === "all" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("all");
            }}
          >
            All
          </Button>
          <Button
            className="cursor-pointer"
            variant={active === "students" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("students");
            }}
          >
            Students
          </Button>
          <Button
            className="cursor-pointer"
            variant={active === "instructors" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("instructors");
            }}
          >
            Instructors
          </Button>
          <Button
            className="cursor-pointer"
            variant={active === "admins" ? "default" : "ghost"}
            onClick={() => {
              changeUserType("admins");
            }}
          >
            Admins
          </Button>
        </div>
        <Button className="cursor-pointer">
          <Plus />
          Add
          {active === "all" && " User"}
          {active === "students" && " Student"}
          {active === "instructors" && " Instructor"}
          {active === "admins" && " Admin"}
        </Button>
      </div>
      <div className="container mx-auto">
        {active === "all" && (
          <AllUserDataTable columns={allUserColumns} data={allUsersData} />
        )}
        {active === "students" && (
          <StudentsDataTable columns={studentsColumns} data={studentsData} />
        )}
        {active === "instructors" && (
          <InstructorsDataTable
            columns={instructorsColumns}
            data={instructorsData}
          />
        )}
        {active === "admins" && (
          <AdminsDataTable columns={adminsColumns} data={adminsData} />
        )}
      </div>
    </div>
  );
}
