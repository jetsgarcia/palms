"use client";

import { Plus } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { readTrainingPeriods } from "@/actions/trainingPeriod";
import { training_periods } from "@prisma/client";
import { Button } from "@/components/ui/button";
import TrainingPeriod from "@/components/training-period";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TrainingPeriodForm from "@/components/training-period-form";

type FormContextType = {
  loadTrainingPeriods: () => Promise<void>;
};

const defaultFormContext: FormContextType = {
  loadTrainingPeriods: async () => {},
};

export const FormContext = createContext<FormContextType>(defaultFormContext);

export default function TrainingPeriodPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [active, setActive] = useState<
    "scheduled" | "inProgress" | "completed"
  >("scheduled");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [scheduledTrainingPeriods, setScheduledTrainingPeriods] = useState<
    training_periods[]
  >([]);
  const [inProgressTrainingPeriods, setInProgressTrainingPeriods] = useState<
    training_periods[]
  >([]);
  const [completedTrainingPeriods, setCompletedTrainingPeriods] = useState<
    training_periods[]
  >([]);

  async function loadTrainingPeriods() {
    try {
      const response = await readTrainingPeriods();

      if (response.ok) {
        const now = new Date();

        const scheduled: training_periods[] = response.data
          .filter((tp: training_periods) => tp.startDate > now)
          .sort((a, b) => a.id - b.id);
        const inProgress: training_periods[] = response.data
          .filter(
            (tp: training_periods) => tp.startDate <= now && tp.endDate >= now
          )
          .sort((a, b) => a.id - b.id);
        const completed: training_periods[] = response.data
          .filter((tp: training_periods) => tp.endDate < now)
          .sort((a, b) => a.id - b.id);

        setScheduledTrainingPeriods(scheduled);
        setInProgressTrainingPeriods(inProgress);
        setCompletedTrainingPeriods(completed);

        setLoading(false);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error loading training periods:", error);
      setError("Failed to load training periods.");

      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrainingPeriods();
  }, []);

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="grid gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center">
              <Button
                variant={active === "scheduled" ? "default" : "ghost"}
                onClick={() => {
                  setActive("scheduled");
                }}
              >
                Scheduled
              </Button>
              <Button
                variant={active === "inProgress" ? "default" : "ghost"}
                onClick={() => {
                  setActive("inProgress");
                }}
              >
                In Progress
              </Button>
              <Button
                variant={active === "completed" ? "default" : "ghost"}
                onClick={() => {
                  setActive("completed");
                }}
              >
                Completed
              </Button>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus /> Add training period
                </Button>
              </DialogTrigger>
              <TrainingPeriodForm
                mode="add"
                refreshTrainingPeriods={loadTrainingPeriods}
                setFormOpen={setOpenDialog}
              />
            </Dialog>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <FormContext.Provider value={{ loadTrainingPeriods }}>
              <div className="grid gap-4">
                {active === "scheduled" &&
                  (scheduledTrainingPeriods.length === 0 ? (
                    <div className="grid place-items-center text-muted-foreground h-[calc(100dvh-8.1rem)]">
                      No scheduled training periods
                    </div>
                  ) : (
                    <>
                      {scheduledTrainingPeriods.map((trainingPeriod) => (
                        <TrainingPeriod
                          key={trainingPeriod.id}
                          name={trainingPeriod.name}
                          id={trainingPeriod.id}
                          startDate={new Date(trainingPeriod.startDate)}
                          endDate={new Date(trainingPeriod.endDate)}
                          weeks={trainingPeriod.weeks}
                        />
                      ))}
                    </>
                  ))}

                {active === "inProgress" &&
                  (inProgressTrainingPeriods.length === 0 ? (
                    <div className="grid place-items-center text-muted-foreground h-[calc(100dvh-8.1rem)]">
                      No training periods in progress
                    </div>
                  ) : (
                    <>
                      {inProgressTrainingPeriods.map((trainingPeriod) => (
                        <TrainingPeriod
                          key={trainingPeriod.id}
                          name={trainingPeriod.name}
                          id={trainingPeriod.id}
                          startDate={new Date(trainingPeriod.startDate)}
                          endDate={new Date(trainingPeriod.endDate)}
                          weeks={trainingPeriod.weeks}
                        />
                      ))}
                    </>
                  ))}

                {active === "completed" &&
                  (completedTrainingPeriods.length === 0 ? (
                    <div className="grid place-items-center text-muted-foreground h-[calc(100dvh-8.1rem)]">
                      No completed training periods
                    </div>
                  ) : (
                    <>
                      {completedTrainingPeriods.map((trainingPeriod) => (
                        <TrainingPeriod
                          key={trainingPeriod.id}
                          name={trainingPeriod.name}
                          id={trainingPeriod.id}
                          startDate={new Date(trainingPeriod.startDate)}
                          endDate={new Date(trainingPeriod.endDate)}
                          weeks={trainingPeriod.weeks}
                        />
                      ))}
                    </>
                  ))}
              </div>
            </FormContext.Provider>
          )}
        </div>
      )}
    </>
  );
}
