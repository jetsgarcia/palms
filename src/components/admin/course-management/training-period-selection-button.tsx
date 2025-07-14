import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { training_periods } from "@prisma/client";
import { readTrainingPeriods } from "@/actions/trainingPeriod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TrainingPeriodSelectionButtonProps {
  currentSelectedTrainingPeriod?: number;
  setCurrentSelectedTrainingPeriod: (id: number) => void;
}

export function TrainingPeriodSelectionButton({
  currentSelectedTrainingPeriod,
  setCurrentSelectedTrainingPeriod,
}: TrainingPeriodSelectionButtonProps) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [trainingPeriods, setTrainingPeriods] = useState<training_periods[]>(
    []
  );

  useEffect(() => {
    async function fetchTrainingPeriods() {
      try {
        const response = await readTrainingPeriods();

        if (response.ok) {
          // Sort training periods by endDate descending
          const sorted = [...response.data].sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
          setTrainingPeriods(sorted);

          // Set default value to the training period with the highest endDate (now first in sorted array)
          if (sorted && sorted.length > 0) {
            setCurrentSelectedTrainingPeriod(sorted[0].id);
          }
          setLoading(false);
        } else {
          toast.error("Failed to fetch training periods");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch training periods");
        setLoading(false);
      }
    }

    fetchTrainingPeriods();
  }, [setCurrentSelectedTrainingPeriod]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[201px] justify-between"
        >
          {loading ? (
            <span className="flex flex-1 justify-center">
              <Loader2Icon className="animate-spin" />
            </span>
          ) : (
            <>
              {currentSelectedTrainingPeriod &&
                trainingPeriods.find(
                  (tp) => tp.id === currentSelectedTrainingPeriod
                )?.name}
            </>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[201px] p-0">
        <Command>
          <CommandInput className="h-9" />
          <CommandList>
            <CommandEmpty>No training period found</CommandEmpty>
            <CommandGroup>
              {trainingPeriods.map((tp) => (
                <CommandItem
                  key={tp.id}
                  value={tp.id.toString()}
                  onSelect={(currentValue) => {
                    const numValue = Number(currentValue);
                    if (numValue !== currentSelectedTrainingPeriod) {
                      setCurrentSelectedTrainingPeriod(numValue);
                    }
                    setOpen(false);
                  }}
                >
                  {tp.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentSelectedTrainingPeriod === tp.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
