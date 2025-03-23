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
import Image from "next/image";
import PhilippineArmyLogo from "@/assets/images/army_logo_3000x3000.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

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

interface AppSidebarProps {
  role: "student" | "admin" | "instructor";
}

export function AppSidebar({ role }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="bg-darkGreen-500 text-white py-4 border-b border-primary">
        <Link href="/">
          <div className="flex items-center space-x-2 text-3xl font-extrabold">
            <Image
              src={PhilippineArmyLogo}
              alt="Philippine Army Logo"
              width={40}
            />
            <span>PALMS</span>
          </div>
        </Link>
      </SidebarHeader>
      {role === "student" && (
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
        </SidebarContent>
      )}
    </Sidebar>
  );
}
