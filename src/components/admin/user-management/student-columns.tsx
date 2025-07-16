import { ColumnDef } from "@tanstack/react-table";

export type Student = {
  serialNumber: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  suffix?: string;
  email: string;
  rank: string;
  course: string;
  trainingYear: string;
};

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "middleInitial",
    header: "Middle Initial",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
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
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "trainingYear",
    header: "Training Year",
  },
];
