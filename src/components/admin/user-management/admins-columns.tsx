"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditAdminButton from "./edit-admin-button";

export type Admin = {
  id: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  suffix?: string;
  email: string;
};

export const adminsColumns = (
  loadData: () => Promise<void>
): ColumnDef<Admin>[] => [
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
    id: "actions",
    cell: ({ row }) => {
      return (
        <EditAdminButton
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
