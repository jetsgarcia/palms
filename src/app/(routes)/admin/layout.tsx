import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/logout-button";
import { ChevronDown, KeyRound } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar role="ADMIN" />
          <main className="flex-1 flex flex-col w-full">
            <header className="flex items-center justify-between p-2 border-b border-primary w-full sticky bg-background top-0">
              <div>
                <SidebarTrigger className="cursor-pointer" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground rounded-md pl-2 pr-1 py-1 transition-colors duration-200 ease-in-out">
                  <div className="flex items-center gap-1">
                    <span>
                      {session?.user.firstName?.toUpperCase()}{" "}
                      {session?.user.middleInitial?.toUpperCase()}.{" "}
                      {session?.user.lastName?.toUpperCase()}
                    </span>
                    <ChevronDown size={16} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link
                      href="/change-password"
                      className="flex items-center gap-2"
                    >
                      <KeyRound /> Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
