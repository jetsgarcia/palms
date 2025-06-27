"use client";

import { fetchAFOSDetails } from "@/actions/fetchAFOSDetails";
import ErrorMessage from "@/components/errorMessage";
import { AFOSType } from "@/types/afos";
import { useEffect, useState, use } from "react";

export default function ModulesAndSubjectsPage({
  params,
}: {
  params: Promise<{ afosCode: string }>;
}) {
  const { afosCode } = use(params);
  const [afosDetails, setAFOSDetails] = useState<AFOSType>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAFOSDetails(afosCode: string) {
      try {
        const response = await fetchAFOSDetails({ afosCode });

        if (response.ok) {
          setAFOSDetails({
            code: response.data.code,
            name: response.data.name,
            level: response.data.level,
            trainingPeriodId: response.data.trainingPeriodId,
          });
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("Error loading AFOS details:", error);
        setError("Failed to load AFOS details.");
      }
    }

    loadAFOSDetails(afosCode);
  }, [afosCode]);

  return (
    <>
      {error ? <ErrorMessage error={error} /> : <div>{afosDetails?.name}</div>}
    </>
  );
}
