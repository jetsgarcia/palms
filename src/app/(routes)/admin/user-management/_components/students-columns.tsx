"use client";

import { ColumnDef } from "@tanstack/react-table";
import MoreActionsButton from "./more-actions-button";

export type Student = {
  id: string;
  serialNumber: string;
  name: string;
  email: string;
  trainingPeriod: number;
  trainingYear: number;
  rank: string;
  afos: string;
  course: string | null;
};

export const studentsColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "trainingPeriod",
    header: "Training Period",
  },
  {
    accessorKey: "trainingYear",
    header: "Training Year",
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
      return <MoreActionsButton userId={row.original.id} />;
    },
  },
];
