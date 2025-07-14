import { cn } from "@/lib/utils";
import { LayoutGrid, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

const modes = [
  {
    name: "Cards",
    icon: LayoutGrid,
  },
  {
    name: "Table",
    icon: Table,
  },
];

interface DisplayModeToggleProps {
  displayMode: "cards" | "table";
  setDisplayMode: (mode: "cards" | "table") => void;
}

export default function DisplayModeToggle({
  displayMode,
  setDisplayMode,
}: DisplayModeToggleProps) {
  return (
    <div className="bg-gray-200 rounded-md p-1">
      {modes.map((mode) => {
        const Icon = mode.icon;

        return (
          <Button
            key={mode.name}
            size="icon"
            variant="ghost"
            className={cn(
              "hover:bg-gray-100",
              displayMode === mode.name.toLowerCase() &&
                "bg-gray-100 shadow hover:bg-gray-100"
            )}
            onClick={() =>
              setDisplayMode(mode.name.toLowerCase() as "cards" | "table")
            }
            aria-label={mode.name}
          >
            <Icon />
          </Button>
        );
      })}
    </div>
  );
}
