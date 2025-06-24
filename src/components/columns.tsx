"use client";

import { ColumnDef } from "@tanstack/react-table";

export type afos = {
  code: string;
  name: string;
  level: "Basic" | "Advanced";
  trainingPeriodId: number;
};

export const columns: ColumnDef<afos>[] = [
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
];
