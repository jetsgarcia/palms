"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { AFOSDataTable } from "@/components/afos-data-table";
import { afosColumns, afos } from "@/components/afos-columns";
import { useEffect, useState } from "react";
import { fetchAFOS } from "@/actions/fetchAFOS";
import Loader from "@/components/loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddAFOSDialogContent from "@/components/add-afos-dialog-content";
import { Button } from "@/components/ui/button";
import { TrainingPeriodType } from "@/types/trainingPeriod";
import { fetchTrainingPeriods } from "@/actions/fetchTrainingPeriods";
import ErrorMessage from "@/components/errorMessage";

export default function CourseManagementPage() {
  const [AFOS, setAFOS] = useState<afos[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrainingPeriod, setSelectedTrainingPeriod] =
    useState<TrainingPeriodType>();
  const [trainingPeriods, setTrainingPeriods] = useState<TrainingPeriodType[]>(
    []
  );

  async function loadAFOS() {
    try {
      const response = await fetchAFOS();
      if (response.data) {
        setAFOS(response.data);
      } else {
        setAFOS([]);
        if (response.error) {
          console.error("Error fetching AFOS:", response.error);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await Promise.all([loadAFOS(), loadTrainingPeriods()]);

      setLoading(false);
    }

    async function loadTrainingPeriods() {
      try {
        const trainingPeriods = await fetchTrainingPeriods();
        if (!trainingPeriods) {
          console.error("No training periods found");
          return;
        }

        const now = new Date();

        const isInProgress = (tp: TrainingPeriodType) =>
          new Date(tp.startDate) <= now && new Date(tp.endDate) >= now;

        const isUpcoming = (tp: TrainingPeriodType) =>
          new Date(tp.startDate) > now;

        const isActiveOrUpcoming = (tp: TrainingPeriodType) =>
          new Date(tp.endDate) >= now;

        const inProgress = trainingPeriods.find(isInProgress);
        const nextScheduled = trainingPeriods.find(isUpcoming);

        if (inProgress) {
          setSelectedTrainingPeriod(inProgress);
        } else if (nextScheduled) {
          setSelectedTrainingPeriod(nextScheduled);
        }

        setTrainingPeriods(trainingPeriods.filter(isActiveOrUpcoming));
      } catch (error) {
        console.error("Error fetching training periods:", error);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedTrainingPeriod && (
                <>
                  <Select
                    value={selectedTrainingPeriod.name}
                    onValueChange={(value) => {
                      const tp = trainingPeriods.find(
                        (tp) => tp.name === value
                      );
                      if (tp) setSelectedTrainingPeriod(tp);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select training period" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingPeriods.map((tp) => (
                        <SelectItem key={tp.id} value={tp.name}>
                          {tp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    Duration:{" "}
                    {selectedTrainingPeriod.startDate.toLocaleDateString()} -{" "}
                    {selectedTrainingPeriod.endDate.toLocaleDateString()}
                  </div>
                </>
              )}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus /> Add AFOS
                </Button>
              </DialogTrigger>
              {selectedTrainingPeriod && (
                <AddAFOSDialogContent
                  trainingPeriodId={selectedTrainingPeriod.id}
                  setOpenDialog={setOpenDialog}
                  refreshAFOS={loadAFOS}
                />
              )}
            </Dialog>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <AFOSDataTable
              columns={afosColumns}
              data={AFOS.filter((afos) =>
                selectedTrainingPeriod
                  ? afos.trainingPeriodId === selectedTrainingPeriod.id
                  : false
              )}
            />
          )}
        </div>
      )}
    </>
  );
}
