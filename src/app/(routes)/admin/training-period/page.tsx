"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTrainingPeriods } from "./_actions/fetchTrainingPeriods";
import { TrainingPeriodType } from "@/types/trainingPeriod";
import TrainingPeriod from "./_components/training-period";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export default function TrainingPeriodPage() {
  const router = useRouter();
  const [active, setActive] = useState("scheduled");
  const [loading, setLoading] = useState(true);
  const [scheduledTrainingPeriods, setScheduledTrainingPeriods] = useState<
    TrainingPeriodType[]
  >([]);
  const [inProgressTrainingPeriods, setInProgressTrainingPeriods] = useState<
    TrainingPeriodType[]
  >([]);
  const [completedTrainingPeriods, setCompletedTrainingPeriods] = useState<
    TrainingPeriodType[]
  >([]);

  useEffect(() => {
    async function loadTrainingPeriods() {
      try {
        const trainingPeriods = await fetchTrainingPeriods();

        if (!trainingPeriods) {
          console.error("No training periods found");
          return;
        }

        const now = new Date();
        const scheduled = trainingPeriods.filter((tp) => tp.startDate > now);
        const inProgress = trainingPeriods.filter(
          (tp) => tp.startDate <= now && tp.endDate >= now
        );
        const completed = trainingPeriods.filter((tp) => tp.endDate < now);

        setScheduledTrainingPeriods(scheduled);
        setInProgressTrainingPeriods(inProgress);
        setCompletedTrainingPeriods(completed);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching training periods:", error);

        setLoading(false);
      }
    }

    loadTrainingPeriods();
  }, []);

  return (
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
          {active === "scheduled" && (
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
          )}
          {active === "inProgress" && (
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
          )}
          {active === "completed" && (
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
          )}
        </div>
      )}
    </div>
  );
}
