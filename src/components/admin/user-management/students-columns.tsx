"use client";

import { ColumnDef } from "@tanstack/react-table";
// import UserManagementMoreActionsButton from "./user-management-more-actions-button";

export type Student = {
  id: string;
  serialNumber?: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  email: string;
  trainingPeriod?: number;
  trainingYear?: number;
  rank?: string;
  afos?: string;
  course?: string | null;
};

export const studentsColumns: ColumnDef<Student>[] = [
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
      // return <UserManagementMoreActionsButton userId={row.original.id} />;
    },
  },
];
