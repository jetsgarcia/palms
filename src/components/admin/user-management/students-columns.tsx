"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditStudentButton from "./edit-student-button";

export type Student = {
  id: string;
  serialNumber?: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  suffix?: string;
  email: string;
  trainingPeriod: string;
  trainingPeriodId: number;
  rank: string;
  afos?: string;
  course?: string | null;
};

export const studentsColumns = (
  loadData: () => Promise<void>
): ColumnDef<Student>[] => [
  {
    accessorKey: "serialNumber",
    header: "Serial number",
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "middleInitial",
    header: "Middle initial",
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
    accessorKey: "trainingPeriod",
    header: "Training period",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "afos",
    header: "AFOS",
  },
  {
    accessorKey: "course",
    header: "Course",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <EditStudentButton
          loadData={loadData}
          id={row.original.id}
          initialData={{
            serialNumber: row.original.serialNumber ?? "",
            firstName: row.original.firstName,
            middleInitial: row.original.middleInitial,
            lastName: row.original.lastName,
            suffix: row.original.suffix,
            email: row.original.email,
            trainingPeriod: row.original.trainingPeriod,
            trainingPeriodId: row.original.trainingPeriodId,
            rank: row.original.rank,
            afos: row.original.afos,
            course: row.original.course,
          }}
        />
      );
    },
  },
];
