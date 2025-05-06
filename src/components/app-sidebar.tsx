import Image from "next/image";
import PhilippineArmyLogo from "@/assets/images/army_logo_3000x3000.png";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import { UserSidebarContent } from "./ui/user-sidebar-content";

interface AppSidebarProps {
  role: "STUDENT" | "ADMIN" | "INSTRUCTOR";
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
      <UserSidebarContent userType={role} />
    </Sidebar>
  );
}
