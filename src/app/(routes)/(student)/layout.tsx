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
          <AppSidebar role="student" />
          <main className="flex-1 flex flex-col w-full">
            <header className="flex items-center justify-between p-2 border-b border-primary w-full sticky bg-background top-0">
              <div>
                <SidebarTrigger />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer text-sm">
                  {session?.user.firstName?.toUpperCase()}{" "}
                  {session?.user.middleInitial?.toUpperCase()}.{" "}
                  {session?.user.lastName?.toUpperCase()}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            {children}
          </main>
        </SidebarProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
