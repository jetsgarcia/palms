"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserManagementMoreActionsButton from "./more-actions-button";

export type AllUsers = {
  id: string;
  name: string;
  email: string;
};

export const allUserColumns: ColumnDef<AllUsers>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserManagementMoreActionsButton userId={row.original.id} />;
    },
  },
];
