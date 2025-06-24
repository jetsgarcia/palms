import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoreActionsButtonProps {
  code: string;
}

export default function AFOSMoreActionsButton({
  code,
}: MoreActionsButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            // TODO: Implement edit afos functionality
            console.log(`Edit user with ID: ${code}`);
          }}
        >
          <Edit /> Edit AFOS
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={() => {
            // TODO: Implement delete afos functionality
            console.log(`Delete user with ID: ${code}`);
          }}
        >
          <Trash /> Delete AFOS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
