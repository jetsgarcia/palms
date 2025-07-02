"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditAFOSButton from "./edit-afos-button";

export type afos = {
  code: string;
  name: string;
  level: "Basic" | "Advanced";
  trainingPeriodId: number;
};

export const afosColumns = (
  refreshAFOS: () => Promise<void>
): ColumnDef<afos>[] => [
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
    id: "edit",
    cell: ({ row }) => {
      return (
        <EditAFOSButton
          code={row.original.code}
          trainingPeriodId={row.original.trainingPeriodId}
          refreshAFOS={refreshAFOS}
          initialValues={{
            name: row.original.name,
            code: row.original.code,
            level: row.original.level,
          }}
        />
      );
    },
  },
];
