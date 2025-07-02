"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AFOSDataTable } from "@/components/afos-data-table";
import { afosColumns, afos } from "@/components/afos-columns";
import { fetchAFOS } from "@/actions/fetchAFOS";
import Loader from "@/components/loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AFOSFormDialogContent from "@/components/afos-form-dialog-content";
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

      if (response.ok) {
        setAFOS(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch AFOS");
    }
  }

  useEffect(() => {
    async function loadTrainingPeriods(
      setSelectedTrainingPeriod: (tp: TrainingPeriodType) => void,
      setTrainingPeriods: (tp: TrainingPeriodType[]) => void,
      setError: (err: string | null) => void
    ) {
      try {
        const response = await fetchTrainingPeriods();

        if (response.ok) {
          const now = new Date();

          const activeOrUpcoming = response.data
            .filter((tp: TrainingPeriodType) => new Date(tp.endDate) >= now)
            .sort(
              (a: TrainingPeriodType, b: TrainingPeriodType) =>
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
            );

          if (activeOrUpcoming.length > 0) {
            setSelectedTrainingPeriod(activeOrUpcoming[0]);
          }
          setTrainingPeriods(activeOrUpcoming);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch training periods");
      }
    }

    async function loadData() {
      setLoading(true);
      await Promise.all([
        loadAFOS(),
        loadTrainingPeriods(
          setSelectedTrainingPeriod,
          setTrainingPeriods,
          setError
        ),
      ]);
      setLoading(false);
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
                    <div>
                      Duration:{" "}
                      {new Date(
                        selectedTrainingPeriod.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        selectedTrainingPeriod.endDate
                      ).toLocaleDateString()}
                    </div>{" "}
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
                <AFOSFormDialogContent
                  mode="add"
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
              columns={afosColumns(loadAFOS)}
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
