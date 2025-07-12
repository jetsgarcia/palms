"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditInstructorButton from "./edit-instructor-button";

export type Instructors = {
  id: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  suffix?: string;
  email: string;
  assignedSubject?: string;
};

export const instructorsColumns = (
  loadData: () => Promise<void>
): ColumnDef<Instructors>[] => [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "middleInitial",
    header: "Middle Initial",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "suffix",
    header: "Suffix",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "assignedSubject",
    header: "Assigned Subjects",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <EditInstructorButton
          loadData={loadData}
          id={row.original.id}
          initialData={{
            firstName: row.original.firstName,
            middleInitial: row.original.middleInitial,
            lastName: row.original.lastName,
            suffix: row.original.suffix,
            email: row.original.email,
          }}
        />
      );
    },
  },
];
