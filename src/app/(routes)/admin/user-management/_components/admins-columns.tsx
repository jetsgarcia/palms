"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserManagementMoreActionsButton from "./user-management-more-actions-button";

export type Admin = {
  id: string;
  name: string;
  email: string;
};

export const adminsColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserManagementMoreActionsButton userId={row.original.id} />;
    },
  },
];
