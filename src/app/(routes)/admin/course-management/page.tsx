import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { columns, afos } from "./_components/columns";

export default function CourseManagementPage() {
  const data: afos[] = [
    {
      code: "INF",
      name: "Infantry",
      level: "Basic",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select defaultValue="Training Period 3 | 2025">
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Training Period 3 | 2025">
              Training Period 3 | 2025
            </SelectItem>
            <SelectItem value="Training Period 1 | 2026">
              Training Period 1 | 2026
            </SelectItem>
          </SelectContent>
        </Select>

        <Button>
          Add AFOS <Plus />
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
