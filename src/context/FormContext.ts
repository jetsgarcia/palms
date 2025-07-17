import { createContext } from "react";

export type FormContextType = {
  loadTrainingPeriods: () => Promise<void>;
};

const defaultFormContext: FormContextType = {
  loadTrainingPeriods: async () => {},
};

export const FormContext = createContext<FormContextType>(defaultFormContext);
