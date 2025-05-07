"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Student = {
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
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
