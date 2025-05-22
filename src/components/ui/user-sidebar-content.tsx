"use client";

import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  BookOpenCheck,
  Calendar,
  ClipboardList,
  ClipboardSignature,
  FileCheck,
  HeartPulse,
  ListCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

// Sidebar items for students
const studentRecordsItems = [
  {
    title: "Registration",
    url: "#",
    icon: ClipboardSignature,
  },
  {
    title: "Class Schedule",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Examination",
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "Grades",
    url: "#",
    icon: FileCheck,
  },
  {
    title: "Clearances",
    url: "#",
    icon: BadgeCheck,
  },
  {
    title: "Health Status",
    url: "#",
    icon: HeartPulse,
  },
];

const registrarTransactionsItems = [
  {
    title: "Subjects",
    url: "#",
    icon: BookOpenCheck,
  },
  {
    title: "Evaluation",
    url: "#",
    icon: ListCheck,
  },
];

// Sidebar items for admin
const adminItems = [
  {
    title: "Training Period",
    url: "/admin/training-period",
    icon: Calendar,
  },
  {
    title: "Course Management",
    url: "#",
    icon: BookOpenCheck,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: ListCheck,
  },
  {
    title: "Evaluation",
    url: "#",
    icon: ClipboardList,
  },
];

interface SidebarLinkItemProps {
  userType: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

export function UserSidebarContent({ userType }: SidebarLinkItemProps) {
  const path = usePathname();
  const isActive = (url: string) => {
    return path === url;
  };

  return (
    <>
      {userType === "STUDENT" && (
        <SidebarContent className="bg-darkGreen-500 text-white pt-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white text-sm">
              STUDENT RECORDS
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {studentRecordsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="text-gray-300">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white text-sm">
              REGISTRAR TRANSACTIONS
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {registrarTransactionsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive(item.url)
                          ? "bg-green-900 text-white hover:bg-green-900 hover:text-white"
                          : ""
                      )}
                    >
                      <a href={item.url} className="text-gray-300">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
      {userType === "ADMIN" && (
        <SidebarContent className="bg-darkGreen-500 text-white pt-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive(item.url)
                          ? "bg-green-900 text-white hover:bg-green-900 hover:text-white"
                          : ""
                      )}
                    >
                      <a href={item.url} className="text-gray-300">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </>
  );
}
