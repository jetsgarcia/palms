"use client";

import { ColumnDef } from "@tanstack/react-table";
import AFOSMoreActionsButton from "./afos-more-actions-button";

export type afos = {
  code: string;
  name: string;
  level: "Basic" | "Advanced";
  trainingPeriodId: number;
};

export const afosColumns: ColumnDef<afos>[] = [
  {
    accessorKey: "code",
    header: "AFOS Code",
  },
  {
    accessorKey: "name",
    header: "AFOS Name",
  },
  {
    accessorKey: "level",
    header: "AFOS Level",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <AFOSMoreActionsButton code={row.original.code} />;
    },
  },
];
