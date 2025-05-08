"use client";

import { ColumnDef } from "@tanstack/react-table";
import MoreActionsButton from "./more-actions-button";

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
      return <MoreActionsButton userId={row.original.id} />;
    },
  },
];
