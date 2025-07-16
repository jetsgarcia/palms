"use client";

import StudentTab from "@/components/admin/user-management/student-tab";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, Plus } from "lucide-react";
import { useState } from "react";

export default function UserManagementPage() {
  const [selectedTab, setSelectedTab] = useState<
    "Student" | "Instructor" | "Admin"
  >("Student");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <div>
          <Button size="lg">
            <Plus /> Add {selectedTab.toLowerCase()}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[8rem] flex items-center justify-between"
            >
              {selectedTab} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedTab("Student")}>
              Students
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTab("Instructor")}>
              Instructors
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTab("Admin")}>
              Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="sm" className="text-sm w-fit">
          <Filter /> Filter
        </Button>
      </div>

      {/* Main content */}
      {selectedTab === "Student" && <StudentTab />}
    </div>
  );
}
