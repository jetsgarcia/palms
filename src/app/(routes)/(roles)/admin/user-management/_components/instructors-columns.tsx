"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserManagementMoreActionsButton from "./user-management-more-actions-button";

export type Instructors = {
  id: string;
  name: string;
  email: string;
  assignedSubject: string;
};

export const instructorsColumns: ColumnDef<Instructors>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "assignedSubject",
    header: "Assigned Subject",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserManagementMoreActionsButton userId={row.original.id} />;
    },
  },
];
