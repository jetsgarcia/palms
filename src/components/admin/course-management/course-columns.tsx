import { Button } from "@/components/ui/button";
import { courses } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const courseColumns: ColumnDef<courses>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
