import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoreActionsButtonProps {
  trainingPeriodId: string;
}

export default function TrainingPeriodMoreActionsButton({
  trainingPeriodId,
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
            // TODO: Implement edit training period functionality
            console.log(`Edit training period with ID: ${trainingPeriodId}`);
          }}
        >
          <Edit /> Edit training period
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={() => {
            // TODO: Implement delete training period functionality
            console.log(`Delete training period with ID: ${trainingPeriodId}`);
          }}
        >
          <Trash /> Delete training period
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
