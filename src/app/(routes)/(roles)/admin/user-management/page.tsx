"use client";

import StudentTab from "@/components/admin/user-management/student-tab";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UserManagementPage() {
  const [selectedTab, setSelectedTab] = useState<
    "Students" | "Instructors" | "Admin"
  >("Students");

  return (
    <div className="space-y-4">
      <div className="tabs">
        <Button
          variant={selectedTab === "Students" ? "default" : "ghost"}
          onClick={() => setSelectedTab("Students")}
        >
          Students
        </Button>
        <Button
          variant={selectedTab === "Instructors" ? "default" : "ghost"}
          onClick={() => setSelectedTab("Instructors")}
        >
          Instructors
        </Button>
        <Button
          variant={selectedTab === "Admin" ? "default" : "ghost"}
          onClick={() => setSelectedTab("Admin")}
        >
          Admin
        </Button>
      </div>
      {selectedTab === "Students" && <StudentTab />}
    </div>
  );
}
