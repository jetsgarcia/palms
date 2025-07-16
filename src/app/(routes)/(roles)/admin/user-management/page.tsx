"use client";

import {
  Student,
  studentColumns,
} from "@/components/admin/user-management/student-columns";
import { DataTable } from "@/components/admin/user-management/student-data-table";
import { useEffect, useState } from "react";

const data: Student[] = [
  {
    serialNumber: "O-001",
    firstName: "John",
    middleInitial: "A",
    lastName: "Doe",
    suffix: "Jr.",
    email: "sample@email.com",
    rank: "Private",
    course: "Computer Science",
    trainingYear: "2023",
  },
  {
    serialNumber: "O-002",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-003",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-004",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-005",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-006",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-007",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-008",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-009",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-010",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-011",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
  {
    serialNumber: "O-012",
    firstName: "Jane",
    middleInitial: "B",
    lastName: "Smith",
    suffix: "",
    email: "asdasd@asdawd.com",
    rank: "Corporal",
    course: "Information Technology",
    trainingYear: "2022",
  },
];

export default function UserManagementPage() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page % 5 === 0 && page !== 0) {
      alert("Fetch next page");
    }
  }, [page]);

  return (
    <div>
      <DataTable
        columns={studentColumns}
        data={data}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
