"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { readTrainingPeriods } from "@/actions/trainingPeriod";
import TrainingPeriod from "@/components/training-period";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import { training_periods } from "@prisma/client";

export default function TrainingPeriodPage() {
  const router = useRouter();
  const [active, setActive] = useState("scheduled");
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

  useEffect(() => {
    async function loadTrainingPeriods() {
      try {
        const response = await readTrainingPeriods();

        if (response.ok) {
          const now = new Date();

          const scheduled: training_periods[] = response.data.filter(
            (tp: training_periods) => tp.startDate > now
          );
          const inProgress: training_periods[] = response.data.filter(
            (tp: training_periods) => tp.startDate <= now && tp.endDate >= now
          );
          const completed: training_periods[] = response.data.filter(
            (tp: training_periods) => tp.endDate < now
          );

          setScheduledTrainingPeriods(scheduled);
          setInProgressTrainingPeriods(inProgress);
          setCompletedTrainingPeriods(completed);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading training periods:", error);
        setError("Failed to load training periods.");

        setLoading(false);
      }
    }

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
            <Button onClick={() => router.push("/admin/training-period/add")}>
              <Plus /> Add training period
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
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
          )}
        </div>
      )}
    </>
  );
}
