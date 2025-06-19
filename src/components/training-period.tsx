import TrainingPeriodMoreActionsButton from "./training-period-more-actions-button";

interface TrainingPeriodProps {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  weeks: number;
}

export default function TrainingPeriod({
  name,
  id,
  startDate,
  endDate,
  weeks,
}: TrainingPeriodProps) {
  return (
    <div className="rounded-lg border px-6 py-4 shadow-sm w-full hover:bg-gray-50 ease-in-out duration-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{name}</h2>
        <TrainingPeriodMoreActionsButton trainingPeriodId={id} />
      </div>
      <div className="flex">
        <div className="flex flex-col w-80">
          <div className="text-sm text-gray-500">ID</div>
          <div>{id}</div>
        </div>
        <div className="flex flex-col w-120">
          <div className="text-sm text-gray-500">Date Range</div>
          <div>
            {startDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">Weeks</div>
          <div>{weeks}</div>
        </div>
      </div>
    </div>
  );
}
