"use client";

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
import { useEffect, useState } from "react";
import { fetchAFOS } from "./actions/fetchAFOS";
import Loader from "@/components/loader";

export default function CourseManagementPage() {
  const [AFOS, setAFOS] = useState<afos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAFOS() {
      const afos = await fetchAFOS();

      setAFOS(afos || []);
      setLoading(false);
    }

    loadAFOS();
  }, []);

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
      {loading ? <Loader /> : <DataTable columns={columns} data={AFOS} />}
    </div>
  );
}
